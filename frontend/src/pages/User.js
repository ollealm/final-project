import React from 'react'
import { LoginForm } from "../components/LoginForm"
import { Profile } from '../components/Profile'
import { useSelector } from 'react-redux';

const BASE_URL = "http://localhost:8090"
const USERS_URL = `${BASE_URL}/users`;

export const User = () => {
  const accessToken = useSelector((store) => store.user.login.accessToken);
  return (
    <div>
      <h1>User</h1>
      {accessToken ? <Profile URL={USERS_URL} /> : <LoginForm />}
    </div>
  )
}
