import React from 'react'
import styled from 'styled-components';

const CatergoriesWrapper = styled.div`
  position: ${props => props.small ? "absolute" : "static"};
  margin-top: ${props => props.small ? "0" : "30px"};
  right: calc(-10% - 70px);
  @media (max-width: 1019px) {
    right: 140px;
  }
  top: 40%;
  z-index: 2;
  transform: ${props => props.small ? "translate(0, -50%)" : ""};
  &::before {
    content: "";
    display: ${props => props.small ? "block" : "none"};
    background: white;
    position: absolute;
    top: -50px;
    left: -50px;
    width: 100%;
    height: 100%;
    filter: blur(15px);
    padding: 50px;
    border-radius: 30%;
  }
`

const Catergory = styled.div`
  position: relative;
  z-index: 2;
  width: 120px;
  color: ${props => props.textColor};
  font-size: ${props => props.small ? "12px" : "15px"};
  margin-left: 30px;
  &::before {
    content: "";
    background-color: ${props => props.color};
    position: absolute;
    border-radius: 50%;
    width: ${props => props.small ? "10px" : "15px"};
    height: ${props => props.small ? "10px" : "15px"};
    margin-left:${props => props.small ? "-15px" : "-25px"};
    margin-top: 2px;
  }
  & p {
    margin:${props => props.small ? "3px 0" : "5px 0"};
  }
`

export const Categories = ({ colorsArr, percetages, texts, values, unit, small }) => {

  return (
    <CatergoriesWrapper small={small}>
      {values.map((value, index) => {
        const textColor = (value > 0) ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, .2)"
        if (value > 0) return (
          <Catergory
            key={index}
            color={colorsArr[index]}
            textColor={textColor}
            small={small}
          >
            <p>{texts[index]} <small>(<em>{value}&nbsp;{unit}</em>)&ensp;</small><strong>{percetages[index]}&nbsp;%</strong></p>
          </Catergory>
        )
      })}
    </CatergoriesWrapper>
  )
}
