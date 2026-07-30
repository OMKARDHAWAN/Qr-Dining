import { Route, Routes } from "react-router-dom";
import ChefLayout from "../../layouts/cheflayout/ChefLayout";
import ChefHomePage from "../../dashboard/chef/pages/ChefHomePage";

export default function ChefRoutes() {
  return (
    <>
      <Routes>
          <Route element={<ChefLayout/>} >
          <Route path="/" element={<ChefHomePage/>} />
           </Route>
      </Routes>
    </>
  );
}
