import React from 'react'
import { EnergyRatio } from "./charts/EnergyRatio"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import styled from 'styled-components';
import { MacroComponents } from './charts/MacroComponents';
import { OmegaRatio } from './charts/OmegaRatio';
import { ButtonBracket } from '../lib/Buttons';

import { getSavedItems, modifyItem, logout } from '../reducers/user';


const CardWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  border-radius: 0px;
  background: hsla(${props => props.color}, 60%, 95%, 1);
  transition: 0.2s;
  color: black;  
  max-width: 450px;
  min-width: 350px;
  border-radius: 5px;
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
      opacity: 0;
      border-radius: 30%;
      filter: blur(15px);
      transition: 0.5s ease all 0.1s;
    }
  &:hover {
    & h2 {
      text-decoration: underline;
      text-decoration-color: hsla(${props => props.color}, 70%, 70%, 1);
    }
    &::before {
      opacity: 1;
      transition: 0.3s ease all;
    }  
  }
  @media (max-width: 768px) {
    width: 300px;
  }
`

const CardLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  margin: 1em;
  & h2 {
    margin: 0;
  }
  & p {
    font-size: 12px;
    margin: 0;
  }
  & span {
    margin-right: 5px;
  }
`

const CardCharts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px;
    /* width: 40%; */
    /* margin-right: -50px; */
  `

const CardButton = styled(ButtonBracket)`
  position: relative;
  z-index: 1;
  margin: 10px 10px 15px 0;
`

export const ItemsCard = ({ id, number, name, group, nutrients, index, chart, price = null, profile }) => {

  const dispatch = useDispatch();

  // generate unique number from string
  // const hashCode = s => s.split('').reduce((a, b) => (((a << 1) - a) + b.charCodeAt(0)) | 0, 0)
  const hashCode = s => s.split('').reduce((a, b) => (a + b.charCodeAt(0)), 0)

  return (
    <CardWrapper color={hashCode(group)}>

      <CardText>
        <div>
          <h2>{name}</h2>
          {price && <span>{price} kr/kg</span>}
          {profile &&
            <CardButton type="button" onClick={() => dispatch(modifyItem(id, index, "PUT", prompt("Add a price per kg")))}>
              {price ? "+" : "Add price"}
            </CardButton>
          }
        </div>
        <p>{group}</p>
      </CardText>
      <CardCharts>
        {chart === "macro" && <MacroComponents {...nutrients} small notext />}
        {chart === "omega" && <OmegaRatio {...nutrients} small notext />}
        {chart === "" && <EnergyRatio {...nutrients} small />}
        {/* <EnergyRatio {...nutrients} small notext /> */}
      </CardCharts>

      {profile &&
        <CardButton type="button" onClick={() => dispatch(modifyItem(id, index, "DELETE"))}>
          –
        </CardButton>
      }

      <CardLink key={id} to={`/items/${number}`}>
      </CardLink>

    </CardWrapper>
  )
}
/*        <ButtonBracket type="button" onClick={() => dispatch(modifyItem(item._id, index, "DELETE"))}>
          –
            </ButtonBracket>
        <p>{price}</p>
        <ButtonBracket type="button" onClick={() => dispatch(modifyItem(item._id, index, "PUT", 10))}>
          {item.price ? "+" : "Add price"}
        </ButtonBracket> */


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




