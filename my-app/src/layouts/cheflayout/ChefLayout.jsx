import { Outlet } from "react-router-dom";
import ChefSidebar from "../../dashboard/chef/components/ChefSidebar";

export default function ChefLayout() {
  return (
    <div style={{ display: "flex" }}>
      <ChefSidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}