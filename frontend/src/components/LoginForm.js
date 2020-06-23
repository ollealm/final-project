import React, { useState } from 'react'
import styled from 'styled-components';

import { Button } from 'lib/Buttons';
import { SearchInput } from '../lib/FormElements';

import { useDispatch, useSelector } from 'react-redux';
import { user, login } from '../reducers/user';

import { BASE_URL } from '../App';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  width: 100%;
`

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 50px;
`

const Label = styled.label`
  margin-bottom: 20px;
`

export const LoginForm = () => {
  const dispatch = useDispatch();

  const [showSignup, setShowSignup] = useState(false)

  const errorMessage = useSelector((store) => store.user.login.errorMessage);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(name, password));
  };

  // move to thunk
  const handleSignup = (event) => {
    event.preventDefault();

    fetch(`${BASE_URL}/users`, {
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
      .then((json) => dispatch(login(name, password))) //setLoggedInUser(json)) -> run dispatch
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }));
      });
  };

  return (
    <LoginWrapper>
      <h1>Login or sign up</h1>
      {!showSignup &&
        <Form onSubmit={handleLogin}>
          <Label>
            <SearchInput
              required
              value={name}
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />
          </Label>
          <Label>
            <SearchInput
              required
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Label>
          <FlexContainer>

            <Button type="submit">
              Login
        </Button>
            <Button type="submit" onClick={() => setShowSignup(!showSignup)}>
              Signup
        </Button>
          </FlexContainer>
        </Form>
      }

      {showSignup &&
        // {/* <SignupForm {...{ handleSignup, name, setName, password, setPassword, email, setEmail }} /> */ }
        <Form onSubmit={handleSignup}>
          <Label>
            <SearchInput
              required
              value={name}
              placeholder="Name"
              onChange={(event) => setName(event.target.value)}
            />
          </Label>
          <Label>
            <SearchInput
              required
              type="email"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Label>
          <Label>
            <SearchInput
              required
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Label>
          <FlexContainer>

            <Button type="submit">
              Sign up
          </Button>
            <Button type="submit" onClick={() => setShowSignup(!showSignup)}>
              Login
        </Button>
          </FlexContainer>
        </Form>
      }

      <p>{errorMessage}</p>
    </LoginWrapper >
  );
}
