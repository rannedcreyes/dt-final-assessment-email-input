import React from "react";

export default function EmailInput() {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-200 m-0 p-0 overflow-x-hidden">
      <input
        type="email"
        placeholder="Enter recipients..."
        className="w-[400px] h-[50px] px-4 border border-gray-300 rounded-md shadow text-sm outline-none bg-white text-black"
      />
    </div>
  );
}
