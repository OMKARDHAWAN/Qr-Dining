import React from "react";
import AiDishRecommendations from "./AiDishRecommendations";

export default function UserHome() {
    return (
        <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "1rem 0" }}>
            <AiDishRecommendations currentUserId={1} />
        </div>
    );
}