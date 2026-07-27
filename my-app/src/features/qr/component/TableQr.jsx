<<<<<<< HEAD
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // Imported hooks

export default function TableQr() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 1. Read tableId dynamically from current URL (e.g. ?tableId=5), default to "1"
  const rawTableId = searchParams.get("tableId") || "1";
  const formattedTableId = rawTableId.startsWith("#") ? rawTableId : `#${rawTableId}`;

  // 2. Redirect to /user, passing the identified table number to be picked up by the context
  const handleGo = () => {
    const cleanId = rawTableId.replace("#", "").trim();
    navigate(`/user?tableId=${cleanId}`);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#F6F6F6]">
      <div className="w-max p-5 bg-white rounded-2xl shadow-2xl">
        <div className="flex flex-col">
          <h1 className="text-center mt-5 font-sans font-semibold text-gray-700">
            Table No
          </h1>
          
          <input
            type="text"
            className="border border-gray-300 my-2 py-2 px-4 text-gray-500 text-center rounded-lg bg-gray-50 font-sans font-bold"
            value={formattedTableId}
            disabled
          />
          
          <button 
            onClick={handleGo}
            className="border-2 border-green-500 my-2 rounded-2xl p-2 cursor-pointer hover:bg-green-500 hover:text-white transition duration-300 font-sans font-semibold text-green-600"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
=======
export default function TableQr(){
    console.log("Hello")
    return(
        <>
 <div className="border border-red-500 ">
    <h1>Hello</h1>
 </div>
        </>
    )
>>>>>>> devlop
}