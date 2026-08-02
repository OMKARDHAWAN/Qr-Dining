import { apiRequest } from "./api";

export const offerService = {
  getAll(params = {}) {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.isActive) query.set("isActive", "true");

    const queryString = query.toString();
    return apiRequest(`/api/Offer${queryString ? `?${queryString}` : ""}`);
  },

  getById(id) {
    return apiRequest(`/api/Offer/${id}`);
  },

  getActive() {
    return apiRequest("/api/Offer/active");
  },

  getByCouponCode(code) {
    return apiRequest(`/api/Offer/coupon/${encodeURIComponent(code)}`);
  },

  create(data) {
    return apiRequest("/api/Offer", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id, data) {
    return apiRequest(`/api/Offer/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete(id) {
    return apiRequest(`/api/Offer/${id}`, {
      method: "DELETE",
    });
  },
};
