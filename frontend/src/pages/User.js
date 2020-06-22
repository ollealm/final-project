import React from 'react'
import { LoginForm } from "../components/LoginForm"
import { Profile } from '../components/Profile'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { PageWrapper } from '../lib/PageWrapper';

const UserWrapper = styled(PageWrapper)`
`

const BASE_URL = "http://localhost:8090"
const USERS_URL = `${BASE_URL}/users`;

export const User = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);

  return (
    <UserWrapper>
      {accessToken ? <Profile URL={USERS_URL} /> : <LoginForm />}
    </UserWrapper>
  )
}
