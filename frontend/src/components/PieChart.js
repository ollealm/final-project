import React from 'react'
import styled from 'styled-components';


//conic-gradient not widly supported, ie firefox, yet
//alt using polyfill or calc / clip-path

const PieChartStyle = styled.div`
  color: blue;
  background: red;
  background: conic-gradient(${props => props.prec});
  border-radius: 50%;
  width: ${props => props.size};
  height: ${props => props.size};
`;

const Square = styled.div`
  margin: 5px 0 0 35px;
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
export const PieChart = ({ valuesArr = [], colorsArr = [], textArr = [], hue = 0, size = "200px", test = 0 }) => {

  //For testing purpose 
  textArr = ["Fett", "Protein", "Socker"]
  for (let index = 0; index < test; index++) {
    valuesArr.push(index + 10)
  }

  if (colorsArr.length === 0) {
    // valuesArr.forEach((value, index) => {
    //   colorsArr.push(`hsl(${index * (360 / valuesArr.length)}, 100%, 50%)`)
    // })
    valuesArr.forEach((value, index) => {
      colorsArr.push(`hsl(${hue}, 100%, ${((index) * (100 / valuesArr.length))}%)`)
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
      <PieChartStyle size={size} prec={getPercentage()} />
      {textArr.map((value, index) => (
        <Square color={colorsArr[index]}>{value}</Square>
      ))}
    </div>
  )
}

