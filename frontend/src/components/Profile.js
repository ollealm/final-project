import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { user, logout } from '../reducers/user';
import './profile.css'

export const Profile = ({ URL }) => {
  const dispatch = useDispatch()

  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken); //Redux

  const [userInfo, setUserInfo] = useState({})


  useEffect(() => {
    fetch(`${URL}/${userId}`, {
      method: "GET",
      headers: { Authorization: accessToken },
    })
      .then((res) => res.json())
      .then((json) => setUserInfo(json))
      .catch((err) => console.log("error:", err));
  }, [accessToken]);


  return (
    <div className="profilepage">
      <h2>User are logged in with token</h2>
      Token:
      <p>{accessToken}</p>
      <p>{userId}</p>

      <h2>Profile page fetched</h2>
      <p>{userInfo.name}</p>
      <p>{userInfo.userId}</p>

      <input
        type="submit"
        onClick={(e) => dispatch(logout())}
        value="Logout"
      />

    </div>
  )
}
