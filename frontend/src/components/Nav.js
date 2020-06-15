import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navigation = styled.nav`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: grey;
  color: white;
  padding: 0 50px;
`

const NavLinks = styled.ul`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
`

const StyledLink = styled(Link)`
  color: white;
  &:hover {
    color: black;
  }
`

export const Nav = () => {
  const name = useSelector((store) => store.user.userData.name);

  return (
    <Navigation>
      <h1>Title</h1>
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

