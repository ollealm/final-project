import React, { useState } from "react";
import styled from "styled-components";

const Burger = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 20px;
  right: 0px;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
  div {
    width: 100%;
    height: 15%;
    background-color: black;
    border-radius: 1px;
    transition: all 0.2s;
  }
  &:hover {  
    cursor: pointer;
    div {
      background-color: hsla(552,70%,70%,1);
      &:first-child {
        transform: translateY(-20%);
      }
      &:last-child {
        transform: translateY(20%);
      }
    }
  }
  &:hover + ul {
    display: flex;
  }

`;


export const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Burger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </Burger>
    </>
  );
}
