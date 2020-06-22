import { createSlice } from '@reduxjs/toolkit'
import { ui } from './ui'

export const items = createSlice({
  name: 'items',
  initialState: {
    currentItem: null,
    itemsArray: [],
    currentResult: [],
    currentPagination: { page: null, pages: null, total: null },
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


export const searchItems = (url) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    fetch(url)
      .then((res) => {
        //setStatusCode(res.status) //dispach        
        // return res.json();
        if (res.ok) {
          return res.json()
        }
        throw 'No items found'
      })
      .then(data => {
        dispatch(items.actions.saveItem(data.items)) // OLD adding all results
        dispatch(items.actions.setCurrentResult(data.items)) // saving results
        dispatch(ui.actions.setCurrentQuery(url)) //saving search query
        // console.log("payload:", data.items)
        // console.log("dispatching items")
        dispatch(items.actions.setCurrentPagination({ page: data.page, pages: data.pages, total: data.results }))
        dispatch(ui.actions.setLoading(false))
        dispatch(ui.actions.setNotFound(false))
      })
      .catch((err) => {
        // dispatch error message. no results
        dispatch(ui.actions.setErrorMessage(err))
        dispatch(ui.actions.setLoading(false))
        dispatch(ui.actions.setNotFound(true))
      })
  }
}

