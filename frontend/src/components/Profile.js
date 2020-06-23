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

const ProfileSettings = styled.div`
  width: 100%;  
  text-align: right;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 20px;
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



export const Profile = () => {
  const [chart, setChart] = useState('')
  const dispatch = useDispatch()

  const userData = useSelector((store) => store.user.userData);
  const savedItems = useSelector((store) => store.user.savedItems);

  useEffect(() => {
    dispatch(getSavedItems())
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
      <ProfileSettings>

        <ButtonBracket
          type="button"
          onClick={(e) => dispatch(logout())}>
          Logout
      </ButtonBracket>

        <FlexContainer>
          <p>{userData.name}'s saved items</p>
          <p>{userData.email}</p>
        </FlexContainer>
        <FlexContainer>
          <Select
          // onChange={handleChangeSort}
          >

            <option key="number" value="">Order</option>
            <option key="name" value="name">Name</option>
            <option key="group" value="group">Group</option>

          </Select>

          <Select onChange={handleChangeChart}>

            <option key="energy" value="">Energy</option>
            <option key="macro" value="macro">Macro</option>
            <option key="omega" value="omega">Omega</option>

          </Select>
        </FlexContainer>
      </ProfileSettings>
      <CardWrapper>
        {savedItems.map((item, index) => (
          // <CardLink key={item._id} to={`/items/${item.item.number}`}>
          <ItemsCard {...item.item} id={item._id} index={index} chart={chart} price={item.price} profile />
          // </CardLink>
        ))}
      </CardWrapper>

    </ProfileWrapper>
  )
}
