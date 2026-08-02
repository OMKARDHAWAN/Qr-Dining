# Restaurant AI modules: Azure AutoML runbook

This implementation deliberately does **not** train or host a model inside .NET. Each concern is a separate Azure Machine Learning AutoML job and a separate managed online endpoint. The ASP.NET Core API is an authenticated orchestration layer; the React app calls that API, never Azure ML directly.

## Project layout

| Location | Responsibility |
|---|---|
| `backend/TrainingData/*.csv` | Synthetic, deterministic training data. These files contain no real customer data. |
| `tools/generate-ai-datasets.ps1` | Regenerates all datasets; it uses PowerShell only, not Python model code. |
| `backend/AI/` | Endpoint configuration, common HTTP scoring client, and response normalization. |
| `backend/Services/RestaurantAiServices.cs` | Feature assembly and per-module response rules. |
| `backend/Controllers/` | The four public backend API routes. |
| `my-app/src/services/` | React API clients. |

Generate the CSV files again with:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tools\generate-ai-datasets.ps1
```

## Datasets and AutoML job configuration

Each dataset has more than 1,000 realistic but synthetic rows. Do not use synthetic data for production decisions: export real, consented order/inventory history to the same schema and retrain on a schedule.

| Module | CSV | Feature columns | Target | AutoML task | Primary selection metric |
|---|---|---|---|---|---|
| Food recommendation | `food-recommendations.csv` | `CustomerId, Age, VegOrNonVeg, PreviousOrders, FavouriteCuisine, AverageBill` | `OrderedItem` | Multiclass classification | `weighted F1` |
| Demand prediction | `demand-prediction.csv` | `Date, Day, Month, Weather, Festival, Dish` | `Orders` | Regression | `normalized_root_mean_squared_error` (then compare MAE/RMSE) |
| Offer prediction | `offer-prediction.csv` | `CustomerType, AverageBill, Festival` | `DiscountUsed` | Multiclass classification | `weighted F1` |
| Inventory prediction | `inventory-prediction.csv` | `Ingredient, CurrentStock, DailyUsage, Weekday, Festival` | `DaysLeft` | Regression | `normalized_root_mean_squared_error` (then compare MAE/RMSE) |

Keep the spelling, data type, and categorical values identical at training and scoring time. `CustomerId` is a feature in the requested schema; for a real deployment, exclude it if it is only an arbitrary identifier rather than a meaningful behavioural feature, to avoid memorisation.

### Food recommendation (classification)

`OrderedItem` is the label. The endpoint receives the customer profile and returns class probabilities; the backend sorts the three largest probabilities and returns them as the Top 3 dishes. Review the per-class precision/recall and the confusion matrix: high overall accuracy can still hide a poor model for a less frequently ordered dish. Weighted F1 balances precision and recall while respecting class volume.

### Demand prediction (regression)

`Orders` is the label. Run a regression job as requested. In a production forecast, add a historical lag feature (for example `OrdersLastWeek`) and use a time-aware split; do not randomize future rows into training. MAE is the typical absolute number of dish orders missed. RMSE penalises large misses more heavily, so use both when choosing a model and setting kitchen safety stock.

### Offer prediction (classification)

`DiscountUsed` is the label (for example `5%`, `10%`, `15%`). Check class distribution before training. The response confidence is the selected class probability, not a guarantee that a customer will redeem it. Apply commercial guardrails outside the model: maximum discount, expiry, and one-coupon-per-order rules.

### Inventory prediction (regression)

`DaysLeft` is the label. The API derives `LowStockAlert` when predicted days are `<= 3` and suggests enough quantity for seven days of expected use. Adjust these business thresholds per ingredient and account for lead time and supplier pack size in production.

## Azure AI Foundry / Azure Machine Learning: no-code setup

1. In Azure AI Foundry, create or open a project backed by an Azure Machine Learning workspace (or open that workspace in Azure Machine Learning studio). Give the workspace managed identity access to its storage and container registry.
2. Open **Data** and create one versioned data asset per CSV. Select **From local files**, upload the corresponding file, select `mltable`/tabular data, and confirm that columns have the types shown above. Version assets as `food-recommendations:1`, `demand-prediction:1`, `offer-prediction:1`, and `inventory-prediction:1`.
3. Select **Automated ML** > **New job**, choose the correct data asset and compute (serverless is suitable for this initial dataset). Set the task and target exactly as in the table. Exclude only the target from features.
4. Use a stratified validation split for the two classification jobs. For the regression jobs, use an 80/20 holdout now; replace it with chronological validation when real dated demand data is available.
5. Set the primary metric in the table, set a sensible experiment time limit (for example 30 minutes), enable model explanations, submit the run, and record the job ID, data-asset version, and metric results in your release record.
6. In the completed job, compare the best child run with the baseline. Do not promote a model merely because it completed; check the metrics, error charts, class balance, and bad predictions. AutoML provides classification charts such as confusion matrix/ROC/precision-recall and regression charts such as residuals and predicted-vs-true.

Create four jobs and use separate names, such as `restaurant-food-recommendation-v1`, `restaurant-demand-v1`, `restaurant-offer-v1`, and `restaurant-inventory-v1`. This keeps training, approval, rollback, scaling, and monitoring independent.

## Deploy four managed REST endpoints

For each approved AutoML model:

1. Open the AutoML job, choose **Models + child jobs**, select the approved model, then select **Deploy > Real-time endpoint**.
2. Create a unique managed endpoint: `restaurant-recommendation`, `restaurant-demand`, `restaurant-offer`, or `restaurant-inventory`. Use key authentication for the current .NET client, enable Application Insights, set a minimum instance count appropriate to the restaurant’s opening hours, and deploy.
3. Route 100% of traffic to the initial deployment only after the endpoint's test request succeeds. Use a blue/green deployment and traffic split for later model versions.
4. Copy the endpoint **scoring URI** and one key. The Studio-generated AutoML deployment supplies a scoring environment; no Python scoring code is required.
5. Use the endpoint's **Test** page or generated sample request to confirm the accepted JSON payload and response. The client uses the common tabular AutoML payload below. If the generated endpoint supplies a different request schema, update only `AzureMlScoringClient.cs`, then retain the same domain services/controllers.

The client sends:

```json
{
  "input_data": {
    "columns": ["CustomerType", "AverageBill", "Festival"],
    "data": [["Loyal", 850, "None"]]
  }
}
```

For the Food Recommendation endpoint, configure/expose class probabilities in the deployment response. `AzureMlResponseReader` accepts a `probabilities` object, or a probability array accompanied by `classes`/`class_labels`. The top three are calculated server-side so the browser does not need model credentials.

## Secure backend configuration

`appsettings.json` intentionally contains blank values and only enables a development fallback. Store real values in Key Vault, App Service configuration, or .NET User Secrets; never commit an endpoint key. Local example:

```powershell
dotnet user-secrets set "AzureAi:UseLocalDevelopmentFallback" "false"
dotnet user-secrets set "AzureAi:Recommendation:ScoringUri" "https://<endpoint>.<region>.inference.ml.azure.com/score"
dotnet user-secrets set "AzureAi:Recommendation:ApiKey" "<key>"
dotnet user-secrets set "AzureAi:Demand:ScoringUri" "https://<endpoint>.<region>.inference.ml.azure.com/score"
dotnet user-secrets set "AzureAi:Demand:ApiKey" "<key>"
dotnet user-secrets set "AzureAi:Offer:ScoringUri" "https://<endpoint>.<region>.inference.ml.azure.com/score"
dotnet user-secrets set "AzureAi:Offer:ApiKey" "<key>"
dotnet user-secrets set "AzureAi:Inventory:ScoringUri" "https://<endpoint>.<region>.inference.ml.azure.com/score"
dotnet user-secrets set "AzureAi:Inventory:ApiKey" "<key>"
```

In production, set `AzureAi__UseLocalDevelopmentFallback=false`, keep secrets in Key Vault, rotate keys, add retry/circuit-breaker telemetry around the named HTTP client, and restrict inbound access to the managed endpoint. The development fallback is a deterministic UI preview only; `modelSource` makes this visible in every response.

## Backend API and examples

All endpoints are backend routes and should be protected by your existing role/customer authorization before public release.

### 1. Recommendations

`GET /api/recommendations/42`

```json
{
  "customerId": 42,
  "modelSource": "AzureML",
  "recommendations": [
    { "item": "Paneer Butter Masala", "confidenceScore": 0.81, "reason": "Azure AutoML match for North Indian preferences." },
    { "item": "Veg Biryani", "confidenceScore": 0.12, "reason": "Azure AutoML match for North Indian preferences." },
    { "item": "Masala Dosa", "confidenceScore": 0.04, "reason": "Azure AutoML match for North Indian preferences." }
  ]
}
```

### 2. Demand

`GET /api/prediction/demand?dish=Pizza`

```json
{ "dish": "Pizza", "forecastDate": "2026-08-02", "predictedOrders": 58, "modelSource": "AzureML" }
```

### 3. Offers

`GET /api/offers/predict/42`

```json
{ "customerId": 42, "recommendedDiscount": "15%", "couponCode": "SMART150042", "confidenceScore": 0.78, "modelSource": "AzureML" }
```

### 4. Inventory

`GET /api/inventory/predict/Paneer`

```json
{ "ingredient": "Paneer", "daysRemaining": 2.3, "lowStockAlert": true, "suggestedReorderQuantity": 19, "modelSource": "AzureML" }
```

## React integration

`src/services/recommendationService.js` calls the Top 3 endpoint and `src/dashboard/user/component/AiDishRecommendations.jsx` displays the returned item, reason, and confidence. The other calls are in `src/services/restaurantAiService.js`:

```jsx
import { useEffect, useState } from "react";
import { restaurantAiService } from "../services/restaurantAiService";

function KitchenDemand() {
  const [forecast, setForecast] = useState(null);
  useEffect(() => { restaurantAiService.demand("Pizza").then(setForecast); }, []);
  return forecast && <p>Tomorrow: {forecast.predictedOrders} Pizza orders.</p>;
}
```

Use `restaurantAiService.offer(customerId)` in the customer offer panel and `restaurantAiService.inventory(ingredient)` in the chef inventory dashboard. Show `modelSource` in internal dashboards so staff can distinguish Azure results from development preview values.

## Release and monitoring checklist

1. Keep raw operational data in a governed Azure storage location; remove direct identifiers where possible.
2. Version each data asset, job, registered model, endpoint deployment, and API configuration change.
3. Monitor endpoint latency, 4xx/5xx status, CPU/memory, and prediction distributions through Application Insights/Azure Monitor.
4. Log feature schema version and model deployment name with each backend request, but do not log endpoint keys or unneeded personal data.
5. Re-evaluate and retrain separately when data drift, menu changes, festivals, or supplier patterns change; promote only if the candidate improves the agreed metric and business guardrails.
6. Keep the previous deployment live at zero traffic for immediate rollback.
