import React from 'react'
import { PieChart } from "../../lib/PieChart"


export const EnergyRatio = ({ Fett, Prot, Kolh, Mono_disack }) => {

  // const { Fett, Prot, Kolh, Mono_disack } = item.nutrients //macro
  const origValues = [Fett.Varde, Prot.Varde, Math.round((Kolh.Varde - Mono_disack.Varde) * 10) / 10, Mono_disack.Varde]
  const values = [Fett.Varde * 2.25, Prot.Varde, (Kolh.Varde - Mono_disack.Varde), Mono_disack.Varde]
  const texts = [Fett.Namn, Prot.Namn, `${Kolh.Namn} (exkl.\u{00A0}socker)`, "Socker"]
  // const colors = []

  return (
    <div>
      <PieChart valuesArr={values} textArr={texts} origValues={origValues} unit="g" />
    </div>
  )
}

