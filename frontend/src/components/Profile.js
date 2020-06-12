import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { user, getUserData, saveItem, logout } from '../reducers/user';
import './profile.css'

export const Profile = ({ URL }) => {
  const dispatch = useDispatch()

  const userId = useSelector((store) => store.user.login.userId);
  const accessToken = useSelector((store) => store.user.login.accessToken);
  const userData = useSelector((store) => store.user.userData);
  const errorMessage = useSelector((store) => store.user.login.errorMessage);


  // const [userInfo, setUserInfo] = useState({})


  // useEffect(() => {
  //   fetch(`${URL}/${userId}`, {
  //     method: "GET",
  //     headers: { Authorization: accessToken },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => setUserInfo(json))
  //     .catch((err) => console.log("error:", err));
  // }, [accessToken]);

  console.log(userData)
  return (
    <div className="profilepage">
      {/* <h2>User are logged in with token</h2>
      Token:
      <p>{accessToken}</p>
      <p>{userId}</p> */}

      {/* <h2>Profile page fetched</h2>
      <p>{userInfo.name}</p>
      <p>{userInfo.userId}</p> */}

      {errorMessage && <h4>Error Message : {`${errorMessage}`}</h4>}
      {userData &&
        <div><p>User: {`${userData.name} ${userData.email}`}</p>
          {userData.savedItems.map(item => (
            <div div key={item._id} >
              <Link to={`/items/${item.itemNumber}`}>
                <h3>{item.itemNumber} {item.item.name} {item.price}</h3>
              </Link>
            </div>
          ))}
        </div>}
      <input
        type="submit"
        onClick={(e) => dispatch(getUserData(URL))}
        value="View saved Items"
      />

      <input
        type="submit"
        onClick={(e) => dispatch(saveItem(URL))}
        value="Save Item Test"
      />

      <input
        type="submit"
        onClick={(e) => dispatch(logout())}
        value="Logout"
      />

    </div>
  )
}
