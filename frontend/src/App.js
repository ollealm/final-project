import React from 'react'
import { LoginForm } from "./components/LoginForm"
import { ListItems } from "./components/ListItems"
import { user } from "./reducers/user"
import { ui } from "./reducers/ui"
import { items } from "./reducers/items"

import { Provider } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"

const reducer = combineReducers({
  user: user.reducer,
  ui: ui.reducer,
  items: items.reducer,
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <LoginForm />
      <ListItems />
    </Provider>
  )
}
