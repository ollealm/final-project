import { createSlice } from "@reduxjs/toolkit"
import { ui } from './ui'

const initialState = {
  login: {
    accessToken: null,
    userId: 0,
    userData: null,
    errorMessage: null,
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
      const { userData } = action.payload
      state.login.userData = userData
    },
    setErrorMessage: (state, action) => {
      const { errorMessage } = action.payload
      state.login.errorMessage = errorMessage
    },
    saveItem: (state, action) => {
      state.savedItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.savedItems.splice(action.payload, 1)
    },
  }
})


// Thunks

export const login = (name, password, URL) => {
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


// useEffect(() => {
//   fetch(`${URL}/${userId}`, {
//     method: "GET",
//     headers: { Authorization: accessToken },
//   })
//     .then((res) => res.json())
//     .then((json) => setUserInfo(json))
//     .catch((err) => console.log("error:", err));
// }, [accessToken]);




/// User Data
export const getUserData = (URL) => {
  return (dispatch, getState) => {

    const accessToken = getState().user.login.accessToken;
    const userId = getState().user.login.userId;

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
        dispatch(
          user.actions.setUserData({ userData: json })
        )
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