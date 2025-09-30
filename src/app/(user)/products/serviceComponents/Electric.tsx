import React from "react";
import ElectricMain from "./ElectricMain";


const Electric = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid h-40 mt-10 text-white place-items-center bg-gradient-to-r from-blue-700 via-blue-900 to-blue-950">
        <h1 className="text-3xl font-semibold tracking-tight text-center ">
          POWER PANEL & CABLE
        </h1>
      </div>
      <ElectricMain />
    </div>
  );
};

export default Electric;
