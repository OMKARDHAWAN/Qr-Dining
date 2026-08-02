import React from "react";

function FloatingButton() {
  const handleClick = () => {
    alert("Create New Special");
  };

  return (
    <button
      onClick={handleClick}
      className="
        fixed
        bottom-8
        right-8
        w-16
        h-16
        rounded-full
        bg-gradient-to-br
        from-orange-600
        to-orange-500
        text-white
        shadow-2xl
        flex
        items-center
        justify-center
        hover:scale-110
        active:scale-95
        transition-all
        duration-300
        z-50
      "
    >
      <span className="material-symbols-outlined text-3xl">
        add
      </span>
    </button>
  );
}

export default FloatingButton;