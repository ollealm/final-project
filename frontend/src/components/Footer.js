import React from 'react'
import styled from 'styled-components';

const FooterContainer = styled.footer`
  height: 50px;
  width: 80%;
  margin: auto;
  margin-top: 100px;
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
      <p>Nutrients</p>
      <p>2020</p>
      <p>&copy; Olle Alm</p>
    </FooterContainer>
  )
}
