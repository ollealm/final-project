import React from 'react'
import { LoginForm } from "../components/LoginForm"
import { Profile } from '../components/Profile'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: auto;
  width: 80%;
`

const BASE_URL = "http://localhost:8090"
const USERS_URL = `${BASE_URL}/users`;

export const User = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);

  return (
    <ItemsWrapper>
      {accessToken ? <Profile URL={USERS_URL} /> : <LoginForm />}
    </ItemsWrapper>
  )
}
