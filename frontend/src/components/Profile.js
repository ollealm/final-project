import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';

import { ItemsCard } from "./ItemsCard"
import { Select } from '../lib/FormElements';
import { ButtonBracket } from '../lib/Buttons';

import { useDispatch, useSelector } from 'react-redux';
import { getSavedItems, modifyItem, logout } from '../reducers/user';


const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: wrap;
  margin: 0 -10px;
  & a {
    text-decoration: none; 
  }
`
// const CardLink = styled(Link)`
//   margin: 10px 10px;
// `

export const Profile = ({ URL }) => {
  const [chart, setChart] = useState('')
  const dispatch = useDispatch()

  const userData = useSelector((store) => store.user.userData);
  const savedItems = useSelector((store) => store.user.savedItems);

  useEffect(() => {
    dispatch(getSavedItems(URL))
  }, [])

  const handleChangeChart = event => {
    setChart(event.target.value)
  };

  //selector that dispatch different lists?
  //or just conditional rendering
  // {errorMessage && <h4>Error Message : {`${errorMessage}`}</h4>}
  // {userData &&
  return (
    <ProfileWrapper>
      <div><p>User: {`${userData.name} ${userData.email}`}</p>
        <Select onChange={handleChangeChart}>

          <option key="energy" value="">Energy</option>
          <option key="macro" value="macro">Macro</option>
          <option key="omega" value="omega">Omega</option>

        </Select>
        <CardWrapper>
          {savedItems.map((item, index) => (
            // <CardLink key={item._id} to={`/items/${item.item.number}`}>
            <ItemsCard {...item.item} id={item._id} index={index} chart={chart} price={item.price} profile />
            // </CardLink>
          ))}
        </CardWrapper>

      </div>

      <input
        type="submit"
        onClick={(e) => dispatch(logout())}
        value="Logout"
      />

    </ProfileWrapper>
  )
}
