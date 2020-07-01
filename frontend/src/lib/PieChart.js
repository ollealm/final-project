import React from 'react'
import { Categories } from "./Categories"
import styled from 'styled-components';

//conic-gradient not widly supported, ie firefox, yet
//alt using polyfill or calc / clip-path

const PieChartWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.small ? "column-reverse" : "column"};
`

const ChartWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.small ? "row" : "column"};
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1em 20px;
  @media (max-width: 768px) {
    margin: 1em 15px;
  }
`

const ChartTitle = styled.h3`
  text-align: center;
  font-size: ${props => props.small ? "13px" : "17px"};
`

// The acctuall chart
const PieChartStyle = styled.div`
  position: relative;
  z-index: 10;
  color: blue;
  background: rgba(255,255,255,.5);
  border-radius: 50%;

  background: conic-gradient(${props => props.perc});

  width: ${props => props.small ? "100px" : "180px"};
  height: ${props => props.small ? "100px" : "180px"};
  transition: .2s;

  box-shadow: 
  10px 10px 15px rgba(0,0,0,.2),
  -10px -10px 15px rgba(255,255,255,.8);

  &::after {
    content: "";
    background: linear-gradient(145deg, rgba(255,255,255,0.2), rgba(0,0,0,0.2));
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: ${props => props.small ? "100px" : "180px"};
    height: ${props => props.small ? "100px" : "180px"};
    opacity: 1;
    mix-blend-mode: hard-light;
  }
  
  &+div {
    transition: .3s;
    visibility: ${props => props.small ? "hidden" : "visible"};
    opacity: ${props => props.small ? "0" : "1"};
    @media (max-width: 567px) {
      display: none;
    }
  }

  &:hover {
    &+div {
      visibility: visible;
      opacity: 1;
    }
    transform: scale(1.02); 
    box-shadow: 
    11px 11px 18px rgba(0,0,0,0.2),
    -13px -13px 18px rgba(255,255,255,0.8);
  }
`

//Change to object with, value, color, text instead o arrays?
export const PieChart = ({
  title, valuesArr = [], colorsArr = [], textArr = [], origValues = null, unit,
  hue = 260, sat = 80, test = 0, small, notext }) => {

  let percetageArray = []

  //For testing purpose 
  for (let index = 0; index < test; index++) {
    valuesArr.push(index + 10)
  }


  // CHART COLORS
  //generatin a color for each value
  if (colorsArr.length === 0) {
    valuesArr.forEach((value, index) => {
      colorsArr.push(
        `hsl(${hue - (index * 50)}, ${sat}%, ${(((index + 0.5) * (100 / valuesArr.length)))}%)`
      )
    })
  }

  // CHART VALUES
  //gererating percentage values and conic-gradient value 
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
    <PieChartWrapper small={small}>
      <ChartTitle small={small}>
        {title}
      </ChartTitle>
      <ChartWrapper small={small}>
        <PieChartStyle
          perc={getChartValues()}
          small={small}
        />
        {!notext &&
          <Categories
            colorsArr={colorsArr}
            percetages={percetageArray}
            texts={textArr}
            values={origValues || valuesArr}
            unit={unit}
            small={small} />}
      </ChartWrapper>
    </PieChartWrapper>
  )
}

