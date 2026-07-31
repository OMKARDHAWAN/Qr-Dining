import { apiRequest } from "./api";

/**
 * Fetch personalized dish recommendations for a specific user predicted by AI model
 * @param {number} userId 
 * @param {number} count 
 */
export async function getPersonalizedRecommendations(userId = 1, count = 5) {
  try {
    return await apiRequest(`/api/recommendations/user/${userId}?count=${count}`);
  } catch (error) {
    console.error("Error fetching personalized recommendations:", error);
    return [];
  }
}

/**
 * Fetch top predicted popular / most-liked dishes across all users
 * @param {number} count 
 */
export async function getPopularDishes(count = 5) {
  try {
    return await apiRequest(`/api/recommendations/popular?count=${count}`);
  } catch (error) {
    console.error("Error fetching popular dishes prediction:", error);
    return [];
  }
}

/**
 * Trigger backend AI model training on latest user interaction data
 */
export async function trainAiModel() {
  return await apiRequest("/api/recommendations/train", {
    method: "POST",
  });
}

/**
 * Record a user interaction or rating (feeds future AI model training)
 * @param {number} userId 
 * @param {number} inventoryId 
 * @param {number} rating 
 * @param {string} interactionType 
 */
export async function recordUserInteraction(userId, inventoryId, rating = 5.0, interactionType = "Order") {
  return await apiRequest("/api/recommendations/interaction", {
    method: "POST",
    body: JSON.stringify({
      userId,
      inventoryId,
      rating,
      interactionType,
    }),
  });
}
