import React from 'react'

import { BrowserRouter, Switch, Route } from "react-router-dom"

import { Login } from "./pages/Login"
import { ListItems } from "./pages/ListItems"
import { Item } from "./components/Item"
import { About } from "./pages/About"
import { Nav } from "./components/Nav"
import { ScrollToTop } from "./components/ScrollToTop"

import { Provider } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"

import { user } from "./reducers/user"
import { ui } from "./reducers/ui"
import { items } from "./reducers/items"


const reducer = combineReducers({
  user: user.reducer,
  ui: ui.reducer,
  items: items.reducer,
})

const store = configureStore({ reducer })

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />

        <Nav />
        <Switch>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/items" exact>
            <ListItems />
          </Route>
          <Route path="/items/:itemNumber">
            <Item />
          </Route>
          {/* <Route path="/nutrients" exact>
            <ListNutrients />
          </Route>
          <Route path="/nutrients/:nutrientShort">
            <Nutrient />
          </Route> */}
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}
