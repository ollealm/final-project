import React from 'react'
import styled from 'styled-components';

const FooterContainer = styled.footer`
  height: 50px;
  width: 80%;
  margin: auto;
  margin-top: 50px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  & p {
    margin: 0;
    font-weight: bold;
  }
`

export const Footer = () => {
  return (
    <FooterContainer>
      <p>Nutrient Search</p>
      <p>2020</p>
      <p>Olle Alm</p>
    </FooterContainer>
  )
}
