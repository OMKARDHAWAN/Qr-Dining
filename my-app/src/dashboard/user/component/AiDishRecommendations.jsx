import { useEffect, useState } from "react";
import { getPersonalizedRecommendations } from "../../../services/recommendationService";

/** Customer-facing view of the Food Recommendation Azure AutoML API. */
export default function AiDishRecommendations({ currentUserId = 1 }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    getPersonalizedRecommendations(currentUserId)
      .then((items) => active && setRecommendations(items))
      .catch((err) => active && setError(err.message || "Recommendations are unavailable."))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [currentUserId]);

  if (loading) return <p>Finding your top dishes…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section aria-label="AI dish recommendations">
      <h2>Picked for you</h2>
      <p>Three dishes selected by the Food Recommendation model.</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {recommendations.map((dish) => (
          <article key={dish.item} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-sm font-semibold text-emerald-700">
              {Math.round(dish.confidenceScore * 100)}% match
            </span>
            <h3 className="mt-3 text-lg font-bold">{dish.item}</h3>
            <p className="text-sm text-slate-600">{dish.reason}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
