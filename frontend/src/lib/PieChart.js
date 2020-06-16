import React from 'react'
import { Categories } from "./Categories"
import styled from 'styled-components';



//conic-gradient not widly supported, ie firefox, yet
//alt using polyfill or calc / clip-path

const PieChartStyle = styled.div`
  position: relative;
  color: blue;
  background: red;
  background: conic-gradient(${props => props.perc});
  border-radius: 50%;
  width: ${props => props.size};
  height: ${props => props.size};
  margin: 50px 20px;
  box-shadow: 
  10px 10px 20px rgba(0,0,0,0.2),
  -10px -10px 20px rgba(255,255,255,0.8);
  /* box-shadow: inset 0px 0px 80px 0px rgba(0,0,0,0.2); */
  transition: .2s;
  &::before {
    content: "";
    z-index: -1;
    background: conic-gradient(${props => props.perc});
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(calc(-50%), calc(-50%));
    width: calc(${props => props.size} * 1.05);
    height: calc(${props => props.size} * 1.05);
    filter: blur(10px);
    opacity: 0;
  }
  &::after {
    content: "";
    z-index: 1;
    background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(0,0,0,0.2));
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(${props => props.size});
    height: calc(${props => props.size});
    opacity: 1;
    /* mix-blend-mode: overlay; */
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 
  11px 11px 23px rgba(0,0,0,0.22),
  -15px -15px 20px rgba(255,255,255,0.8);
  }
`;


//Change to object with, value, color, text instead o arrays?
export const PieChart = ({ valuesArr = [], colorsArr = [], textArr = [], origValues = null, unit, hue = 260, sat = 80, size = "200px", test = 0 }) => {

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

  return (
    <div>
      <PieChartStyle size={size} perc={getChartValues()} />
      <Categories colorsArr={colorsArr} percetages={percetageArray} texts={textArr} values={origValues || valuesArr} unit={unit} />
    </div>
  )
}

