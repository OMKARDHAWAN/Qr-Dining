export default function TableQr() {
  console.log("Hello");
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-[#F6F6F6]">
        <div className=" w-max p-5 bg-white rounded-2xl shadow-2xl">
          <div className="flex flex-col">
            <h1 className="text-center mt-5 ">Table No</h1>
            <input
              type="input"
              className="border border-black my-2 text-gray-500 text-center rounded-[5px]"
              value="#1"
              disabled
            />
            <button className="border border-2 border-green-500 my-2 rounded-2xl p-2 cursor-pointer hover:bg-green-500  hover:text-white transition duration-300">Go</button>
          </div>
        </div>
      </div>
    </>
  );
}
