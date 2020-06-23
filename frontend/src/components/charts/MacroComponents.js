import React from 'react'
import { PieChart } from "../../lib/PieChart"


export const MacroComponents = ({ Fett, Prot, Kolh, Alko, Fibe, Vatt, Aska, small }) => {

  const values = [
    Fett.Varde,
    Prot.Varde,
    Kolh.Varde,
    Alko.Varde,
    Fibe.Varde,
    Vatt.Varde,
    Aska.Varde
  ]

  const texts = [
    Fett.Namn,
    Prot.Namn,
    Kolh.Namn,
    Alko.Namn,
    Fibe.Namn,
    Vatt.Namn,
    Aska.Namn
  ]

  const title = "Macro Composition"

  return (
    <div>
      <PieChart
        title={title}
        valuesArr={values}
        textArr={texts}
        unit={Fett.Enhet}
        small={small}
      />
    </div>
  )
}

