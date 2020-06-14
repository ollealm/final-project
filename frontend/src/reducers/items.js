import { createSlice } from '@reduxjs/toolkit'
import { user, logout } from './user'

export const items = createSlice({
  name: 'items',
  initialState: {
    currentItem: null,
    itemsArray: [],
    currentResult: [],
    currentPagination: { page: 1, pages: 99, total: null },
    // nutrient: null,
    // ratio: null,
    // queries: null,
  },
  reducers: {
    setItem: (state, action) => {
      state.item = action.payload
    },
    saveItem: (state, action) => {
      // state.itemsArray.push(...action.payload)
      // Only save new items to store
      action.payload.forEach(item => {
        const exists = state.itemsArray.some(element => element.number === item.number)
        if (!exists) {
          state.itemsArray.push(item)
        }
      });
    },
    setCurrentPagination: (state, action) => {
      state.currentPagination = action.payload
    },
    setCurrentResult: (state, action) => {
      state.currentResult = action.payload
    },
  }
})


// Thunks
// itemSearch, query, group, nutrient
// getItem

/*
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
*/