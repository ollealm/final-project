import React from 'react'
import styled from 'styled-components';

const Catergory = styled.div`
  margin: 5px 0 0 65px;
  width: 150px;
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

export const Categories = ({ colorsArr, percetages, texts, origValues, unit }) => {

  return (
    <div>
      {texts.map((value, index) => (
        <Catergory key={index} color={colorsArr[index]}>{value} ({origValues[index]} {unit}) {percetages[index]} % </Catergory>
      ))}
    </div>
  )
}
