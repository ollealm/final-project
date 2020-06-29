import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navigation = styled.nav`
  height: 50px;
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;  
  color: black;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`

const NavLinks = styled.ul`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  @media (max-width: 768px) {
    /* display: none; */
    flex-direction: column;
    align-items: flex-end;
    height: 100px;
    width: auto;
  }
`

const StyledLink = styled(Link)`
  position: relative;
  padding: 0px;
  color: black;
  text-decoration: none;
  font-weight: bold;

  &::after {
    content: "";
    position: absolute;
    top: 90%;
    height: 2px;
    width: 0%;
    left: 5%;
    background-color: hsla(552,70%,70%,1);
    transition: 0.5s ease all;
  }

  &:hover {
    text-decoration: none;
    &::after {
      width: 90%;
      transition: 0.3s ease all;
    }
  }
`

export const Nav = () => {
  const name = useSelector((store) => store.user.userData.name);

  return (
    <Navigation>
      <h1>Nutrients</h1>
      <NavLinks>
        <StyledLink to="/about">
          <li>About</li>
        </StyledLink>
        <StyledLink to="/items">
          <li>Items</li>
        </StyledLink>
        <StyledLink to="/user">
          <li>{name ? name : "Login"}</li>
        </StyledLink>
      </NavLinks>
    </Navigation>
  )
}

