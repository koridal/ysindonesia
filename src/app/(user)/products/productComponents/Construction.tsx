import React from "react";
import ConstructionEquip from "./ConstructionEquip";
import MachineEquip from "./MachineEquip";
import ElectricEquip from "./ElectricEquip";

const Construction = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <ConstructionEquip />
      <MachineEquip />
      <ElectricEquip />
    </div>
  );
};

export default Construction;
