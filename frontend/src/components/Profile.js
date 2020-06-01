import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
// import { user } from '../reducers/user'; //for redux
import './profile.css'

export const Profile = ({ loggedInUser, URL }) => {

  const [userId, setUserId] = useState(0);
  // const [accessToken, setAccessToken] = useState(""); //OLD useState
  const accessToken = useSelector((store) => store.user.login.accessToken); //Redux

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    console.log(loggedInUser);

    setUserId(loggedInUser._id);
    // setAccessToken(loggedInUser.accessToken); //OLD useState

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
      Token from useState:
      <p>{loggedInUser.accessToken}</p>
      Token from Redux:
      <p>{accessToken}</p>

      <h2>Profile page fetched</h2>
      <p>{userInfo.name}</p>
      <p>{userInfo.userId}</p>
    </div>
  )
}
