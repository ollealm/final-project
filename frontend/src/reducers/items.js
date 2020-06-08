import { createSlice } from '@reduxjs/toolkit'
import { user, logout } from './user'

export const items = createSlice({
  name: 'items',
  initialState: {
    currentItem: null,
    itemsArray: [],
    // nutrient: null,
    // ratio: null,
    // queries: null,
  },
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload;
    },
    saveItem: (state, action) => {
      state.itemsArray.push(...action.payload)
    },
    removeProduct: (state, action) => {
      state.itemsArray.splice(action.payload, 1)
    },
  }
})


// Thunks

export const getItem = (name, password, URL) => {
  return (dispatch) => {
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw 'Login failed. Check username and password'
      })
      .then((json) => {
        dispatch(
          user.actions.setAccessToken({ accessToken: json.accessToken })
        )
        dispatch(user.actions.setUserId({ userId: json.userId }))
      })
      .catch((err) => {
        dispatch(logout());
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}