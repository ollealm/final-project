import React from 'react'
import { Categories } from "./Categories"
import styled from 'styled-components';

//Change to object with, value, color, text instead o arrays?
export const BarChart = ({ valuesArr = [], colorsArr = [], textArr = [], origValues = null, unit, hue = 260, sat = 80, size = "200px", test = 5 }) => {

  let percetageArray = []

  //For testing purpose 
  for (let index = 0; index < test; index++) {
    valuesArr.push(index + 10)
  }


  if (colorsArr.length === 0) {
    valuesArr.forEach((value, index) => {
      colorsArr.push(`hsl(${hue - (index * 50)}, ${sat}%, ${(((index + 0.5) * (100 / valuesArr.length)))}%)`)
    })
  }

  /*
  const getChartValues = () => {
    const total = valuesArr.reduce((acc, cur) => acc + cur, 0)
    let percentageAcc = 0
    const chartValues = valuesArr.map((value, index) => {
      const percentage = Math.round((value / total) * 1000) / 10
      percentageAcc += percentage
      percetageArray.push(percentage)
      return `${colorsArr[index]} 0deg ${percentageAcc}%`
    });
    return `${[...chartValues]}`
  }
  */

  return (
    <div>
      {valuesArr.map(value => (
        <div>{value}</div>
      ))}
      {/* <Categories colorsArr={colorsArr} percetages={percetageArray} texts={textArr} values={origValues || valuesArr} unit={unit} /> */}
    </div>
  )
}

