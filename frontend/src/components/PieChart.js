import React from 'react'
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
  10px 10px 20px rgba(150,150,150,0.8),
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
    background: linear-gradient(145deg, rgba(255,255,255,0), rgba(0,0,0,0.3));
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(${props => props.size});
    height: calc(${props => props.size});
    opacity: 1;
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 
  11px 11px 23px rgba(140,140,140,0.8),
  -15px -15px 20px rgba(255,255,255,0.8);
  }
`;

const Square = styled.div`
  margin: 5px 0 0 65px;
  width: 150px;
  &::before {
    content: "";
    background-color: ${props => props.color};
    position: absolute;
    width: 20px;
    height: 20px;
    margin-left: -25px;
  }
`

// move to parent
// multipliers ie fat
// sub-values ie sugar  



//Change to object with, value, color, text instead o arrays?
export const PieChart = ({ valuesArr = [], colorsArr = [], textArr = [], hue = 260, sat = 80, size = "200px", test = 0 }) => {
  console.log(valuesArr)
  //For testing purpose 
  // textArr = ["Fett", "Protein", "Socker"]
  for (let index = 0; index < test; index++) {
    valuesArr.push(index + 10)
  }

  if (colorsArr.length === 0) {
    // valuesArr.forEach((value, index) => {
    //   colorsArr.push(`hsl(${index * (360 / valuesArr.length)}, ${sat}%, 50%)`)
    // })
    valuesArr.forEach((value, index) => {
      colorsArr.push(`hsl(${hue - (index * 50)}, ${sat}%, ${(((index + 0.5) * (100 / valuesArr.length)))}%)`)
    })
  }

  const getPercentage = () => {
    const total = valuesArr.reduce((acc, cur) => acc + cur, 0)
    let percentageAcc = 0
    const percentageArr = valuesArr.map((value, index) => {
      percentageAcc = Math.round((value / total) * 100) + percentageAcc
      return `${colorsArr[index]} 0deg ${percentageAcc}%`
    });
    return `${[...percentageArr]}`
  }

  return (
    <div>
      <PieChartStyle size={size} perc={getPercentage()} />
      {textArr.map((value, index) => (
        <Square color={colorsArr[index]}>{value}</Square>
      ))}
    </div>
  )
}

