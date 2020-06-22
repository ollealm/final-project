import React from 'react'
import { NutrientTable } from "../../lib/NutrientTable"


export const Vitamines = ({ b_Kar, Reti, VitA, Tiam, Ribo, Niac, Niek, VitB6, Folat, VitB12, VitC, VitD, VitE,
  color }) => {

  const nutrients = [b_Kar, Reti, VitA, Tiam, Ribo, Niac, Niek, VitB6, Folat, VitB12, VitC, VitD, VitE]
  const RDI = [9600, 800, 800, 1.1, 1.4, 16, 16, 1.4, 200, 2.5, 80, 5, 12]

  const title = "Vitamines"

  return (
    <div>
      <NutrientTable title={title} nutrients={nutrients} RDI={RDI} color={color} />
    </div>
  )
}

/*
b_Kar, Reti, VitA, Tiam, Ribo, Niac, Niek, Ribo, VitB6, Folat, VitB12, VitC, VitD, VitE

Ca, Fe, I, K, Mg, Na, P, Se, Zn
*/
