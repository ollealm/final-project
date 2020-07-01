import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import { ItemsCard } from "./ItemsCard"
import { Select } from '../lib/FormElements';
import { ButtonBracket } from '../lib/Buttons';

import { useDispatch, useSelector } from 'react-redux';
import { getSavedItems, logout } from '../reducers/user';

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

export const Profile = () => {
  const [chart, setChart] = useState('')
  const dispatch = useDispatch()

  const [sort, setSort] = useState("")

  const userData = useSelector((store) => store.user.userData);
  const savedItems = useSelector((store) => store.user.savedItems);
  console.log(savedItems)
  useEffect(() => {
    dispatch(getSavedItems())
  }, [])

  const handleChangeChart = event => {
    setChart(event.target.value)
  };

  const handleChangeSort = event => {
    setSort(event.target.value)
    console.log("sort", sort)
  };

  // sort on any key path
  const compareValues = (key, reverse) => {
    console.log("compare", key)
    let sortOrder = reverse ? -1 : 1
    let path = key.split(".")

    return (a, b) => {
      let x = a
      let y = b
      path.forEach(key => {
        x = x[key]
        y = y[key]
      })
      return sortOrder * ((x < y) ? -1 : ((x > y) ? 1 : 0))
    }
  }


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
            onChange={handleChangeSort}
          >
            <option key="order" value="">Order</option>
            <option key="number" value="itemNumber">Number</option>
            <option key="name" value="item.name">Name</option>
            <option key="group" value="item.group">Group</option>
            <option key="price" value="price">Price</option>
          </Select>

          <Select onChange={handleChangeChart}>
            <option key="energy" value="">Energy</option>
            <option key="macro" value="macro">Macro</option>
            <option key="omega" value="omega">Omega</option>
          </Select>
        </FlexContainer>
      </ProfileSettings>
      <CardWrapper>
        {savedItems.slice().sort(compareValues(sort)).map((item, index) => (
          <ItemsCard
            {...item.item}
            id={item._id}
            index={index}
            chart={chart}
            price={item.price}
            profile
          />
        ))}
      </CardWrapper>

    </ProfileWrapper>
  )
}
