import React from 'react'
import { PieChart } from "../../lib/PieChart"


export const LipidProfile = ({ C4_0_C10_0, C12_0, C14_0, C16_0, C18_0, C20_0, C16_1, C18_1, C18_2, C20_4, C18_3, C20_5, C22_5, C22_6 }) => {


  const values = []
  const texts = []

  const nutrients = [C4_0_C10_0, C12_0, C14_0, C16_0, C18_0, C20_0, C16_1, C18_1, C18_2, C20_4, C18_3, C20_5, C22_5, C22_6]

  nutrients.forEach(element => {
    values.push(element.Varde)
    texts.push(element.Namn)
  })


  // const { C4_0_C10_0 } = props // MCT
  // const { C12_0, C14_0, C16_0, C18_0, C20_0 } = props // Mfet
  // const { C16_1 } = props // omega 7
  // const { C18_1 } = props // omega 9
  // const { C18_2, C20_4 } = props // omega 6
  // const { C18_3, C20_5, C22_5, C22_6 } = props // omega 3


  return (
    <div>
      <PieChart valuesArr={values} textArr={texts} unit={C18_2.Enhet} />
    </div>
  )
}

