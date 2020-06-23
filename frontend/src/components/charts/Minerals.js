import React from 'react'
import { NutrientTable } from "../../lib/NutrientTable"


export const Minerals = ({ Ener, Ca, Fe, I, K, Mg, Na, P, Se, Zn, color }) => {

  const nutrients = [Ca, Fe, I, K, Mg, Na, P, Se, Zn]
  const kcal = Ener.Varde
  const RDI = [800, 14, 150, 2000, 375, "-", 700, 55, 10]

  const title = "Minerals"


  return (
    <div>
      <NutrientTable title={title} kcal={kcal} nutrients={nutrients} RDI={RDI} color={color} />
    </div>
  )
}

/*
b_Kar, Reti, VitA, Tiam, Ribo, Niac, Niek, Ribo, VitB6, Folat, VitB12, VitC, VitD, VitE

Ca, Fe, I, K, Mg, Na, P, Se, Zn
*/
