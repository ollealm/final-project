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
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: rgba(245, 245, 245, 0.5);
  animation: wait 1s linear infinite ;
  animation-delay: 0.1s;
  opacity: 0;
  @keyframes wait {
    0% {opacity: 1;}
    100% {opacity: 1;}
  }
  &::after {
    content: " ";
    position: absolute;
    top: 5px;
    left: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #ddd;
    border-color: #eee transparent #eee transparent;
    animation: rotate 1s linear infinite ;
    @keyframes rotate {
      0% { transform: rotate(0deg);}
      100% { transform: rotate(360deg);}
    }
  }
`