import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "@reduxjs/toolkit"
import thunk from 'redux-thunk'
import { applyMiddleware, compose } from '@reduxjs/toolkit'

import { User } from "./pages/User"
import { Items } from "./pages/Items"
import { About } from "./pages/About"
import { Item } from "./pages/Item"

import { Nav } from "./components/Nav"
import { Footer } from "./components/Footer"
import { ScrollToTop } from "./lib/ScrollToTop"

import { user } from "./reducers/user"
import { ui } from "./reducers/ui"
import { items } from "./reducers/items"

// export const BASE_URL = 'http://localhost:8090'
export const BASE_URL = 'https://nutrient-search.herokuapp.com'

const reducer = combineReducers({
  user: user.reducer,
  ui: ui.reducer,
  items: items.reducer,
})

// Persisted state
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Retrieve localstorage as initial state
const persistedStateJSON = localStorage.getItem('nutrientsReduxState')
let persistedState = {}

if (persistedStateJSON) {
  persistedState = JSON.parse(persistedStateJSON)
}

// Create store with initial state
// only user reducer
const store = createStore(
  reducer,
  { user: persistedState },
  composeEnhancer(applyMiddleware(thunk))
)

// Store the state in localstorage on Redux state change
store.subscribe(() => {
  // saveing user reducer in local storage
  const state = store.getState();
  localStorage.setItem('nutrientsReduxState', JSON.stringify(state.user))
})

//clear local storage
//localStorage.removeItem('nutrientsReduxState');


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
            <Items />
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
          <Route path="/user" exact>
            <User />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}
