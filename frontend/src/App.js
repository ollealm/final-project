import React from 'react'
import { LoginForm } from "./components/LoginForm"
import { user } from "./reducers/user";

import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({ user: user.reducer });
const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <LoginForm />
    </Provider>
  )
}
