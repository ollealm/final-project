import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const LoadingIndicator = () => {
  const isLoading = useSelector((store) => store.ui.isLoading);
  return (
    <>
      {isLoading && <Loading />}
    </>
  )
}

const Loading = styled.div`
  z-index: 99;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  animation: wait 1s linear infinite ; 
  animation-delay: 0.1s; /* waits 0.1s before displaying, to not flicker */
  opacity: 0;
  @keyframes wait {
    0% {opacity: 1;}
    100% {opacity: 1;}
  }
  &::after {
    content: " ";
    position: absolute;
    top: 10px;
    left: 10px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 5px solid #000;
    border-color: #000 transparent #000 transparent;
    opacity: .5;
    animation: rotate 1s linear infinite ;
    @keyframes rotate {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
  }
`