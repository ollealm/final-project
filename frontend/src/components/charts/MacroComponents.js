import React from 'react'
import { PieChart } from "../../lib/PieChart"


export const MacroComponents = ({ Fett, Prot, Kolh, Alko, Fibe, Vatt, Aska }) => {

  // const { Fett, Prot, Kolh, Mono_disack } = item.nutrients //macro

  // const nutrients = [Fett, Prot, Kolh, Fibe, Alko, Vatt, Aska]
  const values = [Fett.Varde, Prot.Varde, Kolh.Varde, Alko.Varde, Fibe.Varde, Vatt.Varde, Aska.Varde]
  const texts = [Fett.Namn, Prot.Namn, Kolh.Namn, Alko.Namn, Fibe.Namn, Vatt.Namn, Aska.Namn]
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
      <PieChart valuesArr={values} textArr={texts} unit={Fett.Enhet} />
    </div>
  )
}

