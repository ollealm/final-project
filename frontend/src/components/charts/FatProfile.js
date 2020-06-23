import React from 'react'
import { PieChart } from "../../lib/PieChart"

export const FatProfile = ({ Mfet, Mone, Pole }) => {

  const values = [Mfet.Varde, Mone.Varde, Pole.Varde]
  const texts = [Mfet.Namn, Mone.Namn, Pole.Namn]
  const title = "Fat Profile"

  return (
    <div>
      <PieChart
        title={title}
        valuesArr={values}
        textArr={texts}
        unit={Mfet.Enhet}
      />
    </div>
  )
}

