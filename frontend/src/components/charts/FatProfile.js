import React from 'react'
import { PieChart } from "../../lib/PieChart"


export const FatProfile = ({ Mfet, Mone, Pole }) => {

  // const { Fett, Prot, Kolh, Mono_disack } = item.nutrients //macro

  // const nutrients = [Fett, Prot, Kolh, Fibe, Alko, Vatt, Aska]
  const values = [Mfet.Varde, Mone.Varde, Pole.Varde]
  const texts = [Mfet.Namn, Mone.Namn, Pole.Namn]
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
  const title = "Fat Profile"

  return (
    <div>
      <PieChart title={title} valuesArr={values} textArr={texts} unit={Mfet.Enhet} />
    </div>
  )
}

