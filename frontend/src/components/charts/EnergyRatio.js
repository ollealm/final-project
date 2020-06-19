import React from 'react'
import { PieChart } from "../../lib/PieChart"


export const EnergyRatio = ({ Fett, Prot, Alko, Kolh, Mono_disack, small, notext }) => {
  console.log("small ratio", small)

  // const { Fett, Prot, Kolh, Mono_disack } = item.nutrients //macro
  const origValues = [Fett.Varde, Prot.Varde, Alko.Varde, Math.round((Kolh.Varde - Mono_disack.Varde) * 10) / 10, Mono_disack.Varde]
  const values = [Fett.Varde * 2.25, Prot.Varde, Alko.Varde * 1.75, (Kolh.Varde - Mono_disack.Varde), Mono_disack.Varde]
  const texts = [Fett.Namn, Prot.Namn, Alko.Namn, `${Kolh.Namn} (exkl.\u{00A0}socker)`, "Socker"]
  // const colors = []

  return (
    <div>
      <PieChart valuesArr={values} textArr={texts} origValues={origValues} unit={Fett.Enhet} small={small} notext={notext} />
    </div>
  )
}

