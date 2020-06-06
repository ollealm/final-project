import { createSlice } from '@reduxjs/toolkit'

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
      state.itemsArray.push(action.payload)
    },
    removeProduct: (state, action) => {
      state.itemsArray.splice(action.payload, 1)
    },
  }
})