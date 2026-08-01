import { apiRequest } from "./api";

/**
 * Fetch the top three dishes scored by the Food Recommendation Azure AutoML endpoint.
 */
export async function getPersonalizedRecommendations(userId = 1) {
  try {
    const response = await apiRequest(`/api/recommendations/${userId}`);
    return response.recommendations ?? [];
  } catch (error) {
    console.error("Error fetching personalized recommendations:", error);
    return [];
  }
}
