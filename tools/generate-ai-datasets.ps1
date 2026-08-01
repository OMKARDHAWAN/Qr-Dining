param(
    [string]$OutputDirectory = (Join-Path $PSScriptRoot "..\backend\TrainingData")
)

# Deterministic synthetic operational data for Azure AutoML demos.  It contains no real customer information.
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null
$random = [System.Random]::new(20260801)

function Pick([object[]]$items) { return $items[$random.Next($items.Count)] }
function Write-CsvFile([string]$name, [object[]]$rows) {
    $rows | Export-Csv -Path (Join-Path $OutputDirectory $name) -NoTypeInformation -Encoding utf8
}

$cuisines = @("North Indian", "South Indian", "Italian", "Chinese", "Continental")
$vegItems = @("Paneer Butter Masala", "Veg Biryani", "Masala Dosa", "Margherita Pizza", "Hakka Noodles", "Gulab Jamun")
$nonVegItems = @("Chicken Biryani", "Butter Chicken", "Chicken Pizza", "Fish Curry", "Hakka Noodles", "Gulab Jamun")
$recommendations = for ($i = 1; $i -le 1200; $i++) {
    $veg = if ($random.NextDouble() -lt 0.63) { "Veg" } else { "NonVeg" }
    $cuisine = Pick $cuisines
    $orders = $random.Next(1, 45)
    $bill = [math]::Round(180 + $random.NextDouble() * 1200, 2)
    $items = if ($veg -eq "Veg") { $vegItems } else { $nonVegItems }
    $weighted = if ($cuisine -eq "North Indian") { @($items[0], $items[0], $items[1]) } elseif ($cuisine -eq "Italian") { @($items[3], $items[3], $items[4]) } else { $items }
    [pscustomobject]@{
        CustomerId = $random.Next(1, 501); Age = $random.Next(18, 71); VegOrNonVeg = $veg
        PreviousOrders = $orders; FavouriteCuisine = $cuisine; AverageBill = $bill; OrderedItem = Pick $weighted
    }
}
Write-CsvFile "food-recommendations.csv" $recommendations

$dishes = @("Pizza", "Paneer Butter Masala", "Chicken Biryani", "Masala Dosa", "Hakka Noodles", "Butter Chicken", "Veg Biryani", "Cold Coffee")
$demand = for ($i = 0; $i -lt 1600; $i++) {
    $date = [datetime]::Today.AddDays(-$i)
    $dish = Pick $dishes
    $weekend = if ($date.DayOfWeek -in @([DayOfWeek]::Saturday, [DayOfWeek]::Sunday)) { 18 } else { 0 }
    $weather = Pick @("Clear", "Cloudy", "Rainy", "Hot")
    $festival = if ($date.Month -in @(10,11) -and $random.NextDouble() -lt 0.22) { "Festival" } else { "None" }
    $orders = 24 + $random.Next(0, 35) + $weekend + $(if ($festival -eq "Festival") { 20 } else { 0 }) + $(if ($weather -eq "Rainy" -and $dish -eq "Cold Coffee") { -8 } else { 0 })
    [pscustomobject]@{ Date = $date.ToString("yyyy-MM-dd"); Day = $date.DayOfWeek.ToString(); Month = $date.Month; Weather = $weather; Festival = $festival; Dish = $dish; Orders = $orders }
}
Write-CsvFile "demand-prediction.csv" $demand

$offers = for ($i = 1; $i -le 1200; $i++) {
    $type = Pick @("New", "Regular", "Loyal", "Premium")
    $bill = [math]::Round(150 + $random.NextDouble() * 1600, 2)
    $festival = if ($random.NextDouble() -lt 0.18) { "Festival" } else { "None" }
    $discount = if ($festival -eq "Festival") { Pick @("15%", "20%", "25%") } elseif ($type -eq "New") { "15%" } elseif ($type -in @("Loyal", "Premium")) { "10%" } else { Pick @("5%", "10%") }
    [pscustomobject]@{ CustomerType = $type; AverageBill = $bill; Festival = $festival; DiscountUsed = $discount }
}
Write-CsvFile "offer-prediction.csv" $offers

$ingredients = @("Paneer", "Chicken", "Flour", "Tomato", "Cheese", "Rice", "Cooking Oil", "Coffee Beans")
$inventory = for ($i = 1; $i -le 1400; $i++) {
    $ingredient = Pick $ingredients
    $dailyUsage = [math]::Round(2 + $random.NextDouble() * 14, 1)
    $stock = [math]::Round(3 + $random.NextDouble() * 120, 1)
    $festival = if ($random.NextDouble() -lt 0.16) { "Festival" } else { "None" }
    $daysLeft = [math]::Max(0.2, [math]::Round(($stock / ($dailyUsage * $(if ($festival -eq "Festival") { 1.2 } else { 1 }))) + (($random.NextDouble() - .5) * .8), 1))
    [pscustomobject]@{ Ingredient = $ingredient; CurrentStock = $stock; DailyUsage = $dailyUsage; Weekday = Pick @("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"); Festival = $festival; DaysLeft = $daysLeft }
}
Write-CsvFile "inventory-prediction.csv" $inventory

Get-ChildItem -Path $OutputDirectory -Filter "*.csv" | Select-Object Name, Length
