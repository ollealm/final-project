import React, { useEffect } from 'react'
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { getSavedItems, modifyItem, logout } from '../reducers/user';
import './profile.css'

export const Profile = ({ URL }) => {
  const dispatch = useDispatch()

  const userData = useSelector((store) => store.user.userData);
  const savedItems = useSelector((store) => store.user.savedItems);

  useEffect(() => {
    dispatch(getSavedItems(URL))
  }, [])

  //selector that dispatch different lists?
  //or just conditional rendering
  // {errorMessage && <h4>Error Message : {`${errorMessage}`}</h4>}
  // {userData &&
  return (
    <div className="profilepage">

      <div><p>User: {`${userData.name} ${userData.email}`}</p>
        {savedItems.map((item, index) => (
          <div div key={item._id} >
            <Link to={`/items/${item.itemNumber}`}>
              <h3>{item.itemNumber} {item.item.name} Price: {item.price}</h3>
            </Link>
            <button type="button" onClick={() => dispatch(modifyItem(item._id, index, "DELETE"))}>
              Remove
            </button>
            <button type="button" onClick={() => dispatch(modifyItem(item._id, index, "PUT", 10))}>
              Add price to item
            </button>
          </div>
        ))}
      </div>

      <input
        type="submit"
        onClick={(e) => dispatch(logout())}
        value="Logout"
      />

    </div>
  )
}
