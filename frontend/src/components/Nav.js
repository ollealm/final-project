import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BurgerMenu } from 'lib/BurgerMenu';

const Navigation = styled.nav`
  position: relative;

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
    position: relative;
    display: none;
    flex-direction: column;
    align-items: flex-end;
    height: 100px;
    margin-top: 50px;
    padding-top: 30px;
    width: auto;
    z-index: 20;
    &:hover {
      display: flex;
    }
    &::before {
    content: "";
    background: hsla(552,70%,70%,1);
    background: white;
    position: absolute;
    top: 10px;
    left: 10px;
    width: 100%;
    height: 100%;
    filter: blur(15px);
    padding: 10px;
    border-radius: 30%;
  }
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
      <StyledLink to="/">
        <h1>Nutrients</h1>
      </StyledLink>
      <BurgerMenu />
      <NavLinks>
        <StyledLink to="/about">
          <li>About</li>
        </StyledLink>
        <StyledLink to="/items">
          <li>Search</li>
        </StyledLink>
        <StyledLink to="/user">
          <li>{name ? name : "Login"}</li>
        </StyledLink>
      </NavLinks>
    </Navigation>
  )
}

