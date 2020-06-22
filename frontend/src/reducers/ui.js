import { createSlice } from '@reduxjs/toolkit'

export const ui = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    notFound: false,
    // LoginFailed: ,
    errorMessage: "",
    currentQuery: "",
    queryName: "",
    queryGroup: "",
    querySort: "",
    queryPage: "",
    queryLimit: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setNotFound: (state, action) => {
      state.notFound = action.payload
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
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
  }
})