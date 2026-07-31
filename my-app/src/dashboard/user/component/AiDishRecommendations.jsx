import React, { useState, useEffect } from "react";
import {
  getPersonalizedRecommendations,
  getPopularDishes,
  trainAiModel,
  recordUserInteraction,
} from "../../../services/recommendationService";

export default function AiDishRecommendations({ currentUserId = 1 }) {
  const [activeTab, setActiveTab] = useState("personalized"); // 'personalized' | 'popular'
  const [recommendations, setRecommendations] = useState([]);
  const [popularDishes, setPopularDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [training, setTraining] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadData();
  }, [currentUserId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [userRecs, popDishes] = await Promise.all([
        getPersonalizedRecommendations(currentUserId, 6),
        getPopularDishes(6),
      ]);
      setRecommendations(userRecs);
      setPopularDishes(popDishes);
    } catch (err) {
      console.error("Failed to load AI recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 4000);
  };

  const handleTrainModel = async () => {
    setTraining(true);
    try {
      const result = await trainAiModel();
      if (result?.isSuccess) {
        showToast(`🤖 AI Model Retrained! Processed ${result.trainingRecordCount} data points.`);
        await loadData();
      } else {
        showToast(`⚠️ Training note: ${result?.message || "Training completed"}`);
      }
    } catch (err) {
      showToast("❌ Model training failed. Check console log.");
    } finally {
      setTraining(false);
    }
  };

  const handleDishAction = async (inventoryId, dishName, actionType) => {
    try {
      const rating = actionType === "Like" ? 5.0 : 4.5;
      await recordUserInteraction(currentUserId, inventoryId, rating, actionType);
      showToast(` Recorded ${actionType} for "${dishName}". AI model queued to adapt!`);
    } catch (err) {
      console.error("Interaction record failed:", err);
    }
  };

  const displayedDishes = activeTab === "personalized" ? recommendations : popularDishes;

  return (
    <div style={styles.container}>
      {toastMessage && <div style={styles.toast}>{toastMessage}</div>}

      {/* Header section */}
      <div style={styles.header}>
        <div>
          <div style={styles.badge}>
            <span style={styles.badgePulse}></span> AI Recommendation Engine
          </div>
          <h2 style={styles.title}>
            {activeTab === "personalized"
              ? "Dishes Picked Just For You"
              : "Predicted Most Liked Dishes"}
          </h2>
          <p style={styles.subtitle}>
            Trained directly on customer order patterns & taste preferences
          </p>
        </div>

        {/* AI Training Trigger Button */}
        <button
          onClick={handleTrainModel}
          disabled={training}
          style={{
            ...styles.trainButton,
            opacity: training ? 0.7 : 1,
            cursor: training ? "not-allowed" : "pointer",
          }}
        >
          {training ? "⚡ Training Model..." : "🤖 Retrain AI Model"}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div style={styles.tabContainer}>
        <button
          onClick={() => setActiveTab("personalized")}
          style={{
            ...styles.tab,
            ...(activeTab === "personalized" ? styles.activeTab : {}),
          }}
        >
          ✨ Recommended for User #{currentUserId}
        </button>
        <button
          onClick={() => setActiveTab("popular")}
          style={{
            ...styles.tab,
            ...(activeTab === "popular" ? styles.activeTab : {}),
          }}
        >
          🔥 Top Liked & Trending
        </button>
      </div>

      {/* Content Grid */}
      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={{ marginTop: "1rem", color: "#64748b" }}>
            Querying AI Matrix Factorization Model...
          </p>
        </div>
      ) : displayedDishes.length === 0 ? (
        <div style={styles.emptyContainer}>
          <p style={{ color: "#64748b" }}>No AI recommendations available yet.</p>
          <button onClick={handleTrainModel} style={styles.secondaryButton}>
            Train AI Model Now
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {displayedDishes.map((dish) => (
            <div key={dish.inventoryId} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.categoryTag}>{dish.category}</span>
                <span style={styles.matchBadge}>
                  {dish.matchPercentage}% Match
                </span>
              </div>

              <h3 style={styles.dishName}>{dish.inventoryName}</h3>
              <p style={styles.reasonText}>{dish.recommendationReason}</p>

              <div style={styles.cardFooter}>
                <span style={styles.price}>₹{dish.price}</span>
                <div style={styles.actionButtons}>
                  <button
                    onClick={() =>
                      handleDishAction(dish.inventoryId, dish.inventoryName, "Like")
                    }
                    title="Like Dish"
                    style={styles.iconButton}
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() =>
                      handleDishAction(dish.inventoryId, dish.inventoryName, "Order")
                    }
                    style={styles.orderButton}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  toast: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    padding: "12px 20px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    zIndex: 9999,
    fontSize: "0.95rem",
    borderLeft: "4px solid #6366f1",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#e0e7ff",
    color: "#4338ca",
    fontWeight: "600",
    fontSize: "0.85rem",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: "0.5rem",
  },
  badgePulse: {
    width: "8px",
    height: "8px",
    backgroundColor: "#4338ca",
    borderRadius: "50%",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  subtitle: {
    color: "#64748b",
    fontSize: "0.95rem",
    marginTop: "4px",
  },
  trainButton: {
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "0.9rem",
    boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
    transition: "all 0.2s ease",
  },
  tabContainer: {
    display: "flex",
    gap: "12px",
    borderBottom: "2px solid #e2e8f0",
    marginBottom: "1.5rem",
  },
  tab: {
    padding: "10px 16px",
    border: "none",
    background: "none",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#64748b",
    cursor: "pointer",
    borderBottom: "3px solid transparent",
    marginBottom: "-2px",
    transition: "all 0.2s ease",
  },
  activeTab: {
    color: "#4f46e5",
    borderBottomColor: "#4f46e5",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "1.25rem",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
  },
  categoryTag: {
    fontSize: "0.75rem",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  matchBadge: {
    fontSize: "0.8rem",
    fontWeight: "700",
    color: "#16a34a",
    backgroundColor: "#dcfce7",
    padding: "4px 10px",
    borderRadius: "12px",
  },
  dishName: {
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 0.5rem 0",
  },
  reasonText: {
    fontSize: "0.85rem",
    color: "#64748b",
    marginBottom: "1rem",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: "0.75rem",
    borderTop: "1px solid #f1f5f9",
  },
  price: {
    fontSize: "1.2rem",
    fontWeight: "800",
    color: "#0f172a",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
  },
  iconButton: {
    backgroundColor: "#f8fafc",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
  },
  orderButton: {
    backgroundColor: "#0f172a",
    color: "#ffffff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.85rem",
    cursor: "pointer",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "3rem",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #4f46e5",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  },
  emptyContainer: {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
  },
  secondaryButton: {
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    marginTop: "1rem",
    cursor: "pointer",
  },
};
