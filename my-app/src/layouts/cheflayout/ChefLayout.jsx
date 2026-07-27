// import { Outlet } from "react-router-dom";
// import ChefSidebar from "../../dashboard/chef/components/ChefSidebar";

// export default function ChefLayout() {
//   return (
//     <div style={{ display: "flex" }}>
//       <ChefSidebar />
//       <div style={{ flex: 1, padding: "20px" }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// }


// import { Outlet } from "react-router-dom";
// import ChefSidebar from "../../dashboard/chef/components/ChefSidebar";

// export default function ChefLayout() {
//   return (
//     <div style={{ display: "flex" }}>
//       <ChefSidebar />

//       <main
//         style={{
//           marginLeft: "280px",   // same width as sidebar
//           width: "calc(100% - 280px)",
//           padding: "30px",
//           minHeight: "100vh",
//           background: "#f8f9fa",
//         }}
//       >
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// import { Outlet } from "react-router-dom";
// import ChefSidebar from "../../dashboard/chef/components/ChefSidebar";

// export default function ChefLayout() {
//   return (

//     <div style={{ display: "flex" }}>
//       <ChefSidebar />
//       <div style={{ flex: 1, padding: "20px" }}>

//     <div className="bg-gray-100 min-h-screen">
//       <ChefSidebar />

//       <div className="ml-72 min-h-screen p-6">

//         <Outlet />
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import ChefSidebar from "../../dashboard/chef/components/ChefSidebar";

export default function ChefLayout() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <ChefSidebar />

      <div className="flex-1 ml-72 p-6">
        <Outlet />
      </div>
    </div>
  );
}