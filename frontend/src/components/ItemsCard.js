import React from 'react'
import { EnergyRatio } from "./charts/EnergyRatio"

import styled from 'styled-components';

const CardWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  margin: 10px;
  border-radius: 0px;
  background: hsla(${props => props.color}, 60%, 95%, 1);
  transition: 0.2s;
  color: black;  
  border-radius: 5px;
  max-width: 450px;
  /* border: 1px Solid transparent; */
  
  &:hover {
    & h2 {
      text-decoration: underline;
      text-decoration-color: hsla(${props => props.color}, 70%, 70%, 1);
    }
    &::before {
      content: "";
      z-index: -1;
      background: hsla(${props => props.color}, 70%, 70%, 1);
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.98, 0.93);
      width: 100%;
      height: 100%;
      opacity: 1;
      border-radius: 30%;
      filter: blur(15px);
    }
      
  }
`
const CardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 40%;

  margin: 1em;
  & h2 {
    margin-top: 0;
  }
  & p {
    font-size: 12px;
  }
`
const CardCharts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
  max-width: 40%;
  /* margin-right: -50px; */
`

export const ItemsCard = ({ name, group, nutrients }) => {

  // generate unique number from string
  // const hashCode = s => s.split('').reduce((a, b) => (((a << 1) - a) + b.charCodeAt(0)) | 0, 0)
  const hashCode = s => s.split('').reduce((a, b) => (a + b.charCodeAt(0)), 0)
  // const hashCode = s => s.charCodeAt(0)
  console.log("Hash", hashCode(group))


  return (
    <CardWrapper color={hashCode(group)}>
      <CardText>
        <h2>{name}</h2>
        <p>{group}</p>
      </CardText>
      <CardCharts>
        {/* Conditional render with dropdown */}
        <EnergyRatio {...nutrients} small notext />
      </CardCharts>
    </CardWrapper>
  )
}



/*
Items
ListItems
ItemsCard
  SpecificChartComponent - handles data
    PieChart or other cartcomponent


Item
  SpecificChartComponent - handles data
    PieChart or other cartcomponent
  Table component
*/




