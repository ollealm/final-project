import React from 'react'
import { Categories } from "./Categories"
import styled from 'styled-components';



//conic-gradient not widly supported, ie firefox, yet
//alt using polyfill or calc / clip-path

/*
background: ${props => props.small ? 'darkred' : 'limegreen'}

  background: ${props => props.small ? "200px" : "100px"};
  color: ${props => props.small ? "white" : "palevioletred"};

  */

const ChartWrapper = styled.div`
 display: flex;
 flex-direction: ${props => props.small ? "row" : "column"};
 justify-content: flex-start;
 align-items: flex-start;
 margin: 1em 20px;
 &:hover {
  /* & div {
    opacity: 0.5;
  } */
 }
`




const PieChartStyle = styled.div`
  position: relative;
  z-index: 10;
  color: blue;
  background: red;
  border-radius: 50%;
  background: conic-gradient(${props => props.perc});
  width: ${props => props.small ? "100px" : "200px"};
  height: ${props => props.small ? "100px" : "200px"};
  transition: .2s;

  box-shadow: 
  10px 10px 15px rgba(0,0,0,.2),
  -10px -10px 15px rgba(255,255,255,.8);
  /*
  &::before {
    content: "";
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(calc(-50%), calc(-50%));
    width: ${props => props.small ? "100px" : "200px"};
    height: ${props => props.small ? "100px" : "200px"};
    opacity: 1;

    mix-blend-mode: overlay;
    box-shadow: 
    10px 10px 15px rgba(0,0,0,.1),
    -10px -10px 15px rgba(255,255,255,.1);

    &:hover {
      box-shadow: 
      11px 11px 18px rgba(0,0,0,1),
      -13px -13px 18px rgba(255,255,255,1);
  }
  */
  }

  
  &::after {
    content: "";
    background: linear-gradient(145deg, rgba(255,255,255,0.2), rgba(0,0,0,0.2));
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.small ? "100px" : "200px"};
    height: ${props => props.small ? "100px" : "200px"};
    opacity: 1;
    mix-blend-mode: hard-light;
  }
  
  
  &+div {
    transition: 0.2s;
    opacity: 0;
  }
  &:hover {
    &+div {
      opacity: 1;
    }
    
    transform: scale(1.02); 

    box-shadow: 
    11px 11px 18px rgba(0,0,0,0.2),
    -13px -13px 18px rgba(255,255,255,0.8);
  }
  
`;


//Change to object with, value, color, text instead o arrays?
export const PieChart = ({ valuesArr = [], colorsArr = [], textArr = [], origValues = null, unit, hue = 260, sat = 80, size = "200px", test = 0, small, notext }) => {
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
    <ChartWrapper small={small}>
      <PieChartStyle size={size} perc={getChartValues()} small={small} />
      {!notext && <Categories colorsArr={colorsArr} percetages={percetageArray} texts={textArr} values={origValues || valuesArr} unit={unit} small={small} />}
    </ChartWrapper>
  )
}

