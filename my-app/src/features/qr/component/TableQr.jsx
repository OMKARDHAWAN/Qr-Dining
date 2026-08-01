import { useNavigate } from "react-router-dom";

export default function TableQr() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F6F6] p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#B41B00]">QR Dining</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-800">Table #1</h1>
        <p className="mt-3 text-slate-600">Browse the menu, add dishes to your cart, and get AI recommendations.</p>
        <button
          type="button"
          onClick={() => navigate("/user")}
          className="mt-6 w-full rounded-xl bg-[#B41B00] px-4 py-3 font-semibold text-white transition hover:bg-[#8f1600]"
        >
          View menu
        </button>
      </div>
    </div>
  );
}
