import React from 'react'
import { NutrientTable } from "../../lib/NutrientTable"


export const Minerals = ({ Ca, Fe, I, K, Mg, Na, P, Se, Zn, color }) => {

  const nutrients = [Ca, Fe, I, K, Mg, Na, P, Se, Zn]
  const RDI = [800, 14, 150, 2000, 375, "-", 700, 55, 10]

  const title = "Minerals"


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
