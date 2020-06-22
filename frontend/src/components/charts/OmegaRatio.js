import React from 'react'
import { PieChart } from "../../lib/PieChart"


export const OmegaRatio = ({ C18_2, C20_4, C18_3, C20_5, C22_5, C22_6, small }) => {

  // const { Fett, Prot, Kolh, Mono_disack } = item.nutrients //macro

  // const nutrients = [Fett, Prot, Kolh, Fibe, Alko, Vatt, Aska]
  const values = [C18_3.Varde, C20_5.Varde + C22_5.Varde + C22_6.Varde, C18_2.Varde, C20_4.Varde]
  const texts = ["Omega-3 kort", "Omega-3 lång", "Omega-6 kort", "Omega-6 lång"]
  // const values = []
  // const texts = []

  // nutrients.forEach(element => {
  //   if (element.Varde > 0) {
  //     values.push(element.Varde)
  //     texts.push(element.Namn)
  //   }
  // })

  // if value add to array
  // values.filter()
  // const colors = []

  return (
    <div>
      <PieChart valuesArr={values} textArr={texts} unit={C18_2.Enhet} small={small} />
    </div>
  )
}

