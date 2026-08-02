import { apiRequest } from "./api";

export const restaurantAiService = {
  demand(dish) {
    return apiRequest(`/api/prediction/demand?dish=${encodeURIComponent(dish)}`);
  },
  offer(customerId) {
    return apiRequest(`/api/offers/predict/${customerId}`);
  },
  inventory(ingredient) {
    return apiRequest(`/api/inventory/predict/${encodeURIComponent(ingredient)}`);
  },
};
