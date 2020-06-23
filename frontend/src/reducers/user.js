import { createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from '../App';

const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    errorMessage: null,
  },
  userData: {
    name: null,
    email: null,
  },
  savedItems: [],
}

export const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload
      state.login.accessToken = accessToken
    },
    setUserId: (state, action) => {
      const { userId } = action.payload
      state.login.userId = userId
    },
    setUserData: (state, action) => {
      console.log("User data", action.payload)
      const { name, email } = action.payload
      state.userData.name = name
      state.userData.email = email
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      state.login.errorMessage = errorMessage
    },
    setSavedItems: (state, action) => {
      const { savedItems } = action.payload
      state.savedItems = savedItems;
    },
    saveItem: (state, action) => {
      state.savedItems.push(action.payload);
    },
    modifyItem: (state, action) => {
      state.savedItems = action.payload // change to only update one
    },
    removeItem: (state, action) => {
      state.savedItems.splice(action.payload, 1)
    },
  }
})




// Thunks

//Login
export const login = (name, password) => {
  return (dispatch) => {
    fetch(`${BASE_URL}/sessions`, {
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
        console.log("login", json)
        dispatch(user.actions.setAccessToken({ accessToken: json.accessToken }))
        dispatch(user.actions.setUserId({ userId: json.userId }))
        dispatch(user.actions.setUserData({ name: json.name, email: json.email }))
        dispatch(user.actions.setErrorMessage({})); // clears the error if previous attempt failed
      })
      .catch((err) => {
        dispatch(logout());
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      })
  }
}


/// Saved Items
export const getSavedItems = () => {
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;
    const URL = `${BASE_URL}/users`

    fetch(`${URL}/${userId}`, { //path to user data
      method: 'GET',
      headers: { Authorization: accessToken },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw 'Could not get information. Make sure you are logged in and try again.'
      })
      .then((json) => {
        console.log(json)
        dispatch(
          user.actions.setSavedItems({ savedItems: json.savedItems })
        )
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      }) //401
  }
}

//Add to list

export const saveItem = (itemNumber, price = null) => {
  const URL = `${BASE_URL}/users`
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;

    fetch(`${URL}/${userId}`, { //path to user data
      method: 'POST',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        itemNumber: itemNumber,
        price: price,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw 'Could not save item. Make sure you are logged in and try again.'
      })
      .then((json) => {
        dispatch(
          user.actions.saveItem(json.item)
        )
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      }) //401
  }
}

//Change and remove
// method "PUT" or "DELETE"
export const modifyItem = (itemId, index, method, price = null) => {
  const URL = `${BASE_URL}/users`
  console.log("Modify", itemId, index, method, price)
  return (dispatch, getState) => {
    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;

    fetch(`${URL}/${userId}/${itemId}`, { //path to user data
      method: method,
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price: price,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw 'Could not modify item. Make sure you are logged in and try again.'
      })
      .then((json) => {
        if (method === "DELETE") dispatch(user.actions.removeItem(index))
        if (method === "PUT") dispatch(user.actions.modifyItem(json.items))  // sends the whole new array, change to only new object
      })
      .catch((err) => {
        dispatch(user.actions.setErrorMessage({ errorMessage: err }))
      }) //401
  }
}


export const logout = () => {
  return (dispatch) => {
    dispatch(user.actions.setUserData({ userData: null }))
    dispatch(user.actions.setErrorMessage({ errorMessage: null }))
    dispatch(user.actions.setAccessToken({ accessToken: null }))
    dispatch(user.actions.setUserId({ userId: 0 }))
  }
}