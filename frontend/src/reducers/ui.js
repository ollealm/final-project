import { createSlice } from '@reduxjs/toolkit'

export const ui = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    currentQuery: "",
    // isNotFound: false,
    // isLoginFailed: false,
    // errorMessage: false,
    // page: 1,  
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setCurrentQuery: (state, action) => {
      state.currentQuery = action.payload
    },
    setNotFound: (state, action) => {
      state.isNotFound = action.payload
    },
  }
})