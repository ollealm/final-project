import React from 'react'
import styled from 'styled-components';

const CatergoriesWrapper = styled.div`
  /* width: 150px; */
`


const Catergory = styled.div`
  /* margin: 5px 0 0 65px; */
  width: 120px;
  opacity: ${props => props.opacity};
  color: ${props => props.textColor};
  font-size: ${props => props.small ? "12px" : "14px"};
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
    <CatergoriesWrapper>
      {values.map((value, index) => {
        const textColor = (value > 0) ? "black" : "grey"
        const opacity = (value > 0) ? "1" : "0.5"
        return (
          <Catergory
            key={index}
            color={colorsArr[index]}
            textColor={textColor}
            opacity={opacity}
            small={small}
          >
            <p>{texts[index]} <small>(&#8202;<em>{value} {unit}</em>&#8202;)&ensp;<strong>{percetages[index]}&thinsp;%</strong></small></p>
          </Catergory>
        )
      })}
    </CatergoriesWrapper>
  )
}
