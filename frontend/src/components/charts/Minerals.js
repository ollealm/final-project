import React from 'react'
import { NutrientTable } from "../../lib/NutrientTable"

export const Minerals = ({ Ener, Ca, Fe, I, K, Mg, Na, P, Se, Zn, color }) => {

  const nutrients = [Ca, Fe, I, K, Mg, Na, P, Se, Zn]
  const kcal = Ener.Varde
  const RDI = [800, 14, 150, 2000, 375, "-", 700, 55, 10]

  const title = "Minerals"

  return (
    <div>
      <NutrientTable
        title={title}
        kcal={kcal}
        nutrients={nutrients}
        RDI={RDI}
        color={color}
      />
    </div>
  )
}

