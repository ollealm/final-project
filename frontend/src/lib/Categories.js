import React from 'react'
import styled from 'styled-components';

const Catergory = styled.div`
  margin: 5px 0 0 65px;
  width: 150px;
  opacity: ${props => props.opacity};
  color: ${props => props.textColor};
  &::before {
    content: "";
    background-color: ${props => props.color};
    position: absolute;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin-left: -25px;
  }
`

export const Categories = ({ colorsArr, percetages, texts, values, unit }) => {

  return (
    <div>
      {values.map((value, index) => {
        const textColor = (value > 0) ? "black" : "grey"
        const opacity = (value > 0) ? "1" : "0.5"
        return (
          <Catergory
            key={index}
            color={colorsArr[index]}
            textColor={textColor}
            opacity={opacity}
          >
            <p>{texts[index]} ({value} {unit}) {percetages[index]}&nbsp;%</p>
          </Catergory>
        )
      })}
    </div>
  )
}
