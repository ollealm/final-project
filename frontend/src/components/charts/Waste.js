import React from 'react'
import { PieChart } from "../../lib/PieChart"

export const Waste = ({ Avfa }) => {

  const values = [Avfa.Varde, 100 - Avfa.Varde]
  const texts = [Avfa.Namn, "Total"]

  const title = "Waste"

  return (
    <div>
      <PieChart
        title={title}
        valuesArr={values}
        textArr={texts}
        unit={Avfa.Enhet}
      />
    </div>
  )
}

