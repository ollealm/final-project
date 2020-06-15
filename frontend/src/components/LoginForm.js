import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { user, login } from '../reducers/user';
import './loginform.css'

const BASE_URL = "http://localhost:8090"
const USERS_URL = `${BASE_URL}/users`;
const SESSION_URL = `${BASE_URL}/sessions`;

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [showSignup, setShowSignup] = useState(false)

  const errorMessage = useSelector((store) => store.user.login.errorMessage);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(name, password, SESSION_URL));
  };

  const handleSignup = (event) => {
    event.preventDefault();

    fetch(USERS_URL, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw 'Could not create account. Try a different username.';
        }
        return res.json();
      })
      .then((json) => dispatch(login(name, password, SESSION_URL))) //setLoggedInUser(json)) -> run dispatch
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };

  //  if (!accessToken) {
  return (
    <div>
      <h1>Login or sign up</h1>
      {!showSignup &&
        <form onSubmit={handleLogin}>
          <label>
            Name&nbsp;
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            Password&nbsp;
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="submit">
            Login
        </button>
          <button type="submit" onClick={() => setShowSignup(!showSignup)}>
            Signup
        </button>
        </form>
      }

      {showSignup &&
        // {/* <SignupForm {...{ handleSignup, name, setName, password, setPassword, email, setEmail }} /> */ }
        < form onSubmit={handleSignup}>
          <label>
            Name&nbsp;
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label>
            email&nbsp;
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password&nbsp;
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button type="submit">
            Sign up
          </button>
          <button type="submit" onClick={() => setShowSignup(!showSignup)}>
            Login
        </button>
        </form>
      }

      <p>{errorMessage}</p>
    </div >
  );
  //  } else return <></>
}
