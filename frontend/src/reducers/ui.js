import { createSlice } from '@reduxjs/toolkit'

export const ui = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    currentQuery: "",
    queryName: "",
    queryGroup: "",
    querySort: "",
    queryPage: "",
    queryLimit: "",
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
    setQueryName: (state, action) => {
      state.queryName = action.payload
    },
    setQueryGroup: (state, action) => {
      state.queryGroup = action.payload
    },
    setQuerySort: (state, action) => {
      state.querySort = action.payload
    },
    setQueryPage: (state, action) => {
      state.queryPage = action.payload
    },
    setQueryLimit: (state, action) => {
      state.queryLimit = action.payload
    },
    setNotFound: (state, action) => {
      state.isNotFound = action.payload
    },
  }
})