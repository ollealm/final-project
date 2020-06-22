import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ListItems } from "../components/ListItems"
import { LoadingIndicator } from '../lib/LoadingIndicator';
import { SearchInput, Select } from '../lib/FormElements';
import { Button } from '../lib/Buttons';

import { items as itemsReducer } from "../reducers/items"
import { searchItems } from '../reducers/items';
import { ui } from "../reducers/ui"

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: auto;
  width: 80%;
`

const SearchWrapper = styled.form`
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ErrorMessage = styled.p`
  color: red;
`


export const Items = () => {
  const dispatch = useDispatch();

  const searchName = useSelector(store => store.ui.queryName)
  const searchGroup = useSelector(store => store.ui.queryGroup)
  const sort = useSelector(store => store.ui.querySort)
  const currentPage = useSelector(store => store.ui.queryPage)
  const limit = useSelector(store => store.ui.queryLimit)

  const currentQuery = useSelector(store => store.ui.currentQuery)

  const errorMessage = useSelector(store => store.ui.errorMessage)
  const notFound = useSelector(store => store.ui.notFound)

  const url = `http://localhost:8090/items?name=${searchName}&group=${searchGroup}&sort=${sort}&page=${currentPage}` //&limit=${limit}`;  

  // const urlQuery = `
  // &name=${searchName}
  // &group=${searchGroup}
  // &sort=${sort}
  // &page=${currentPage}
  // &limit=${limit}`

  const handleChangeName = event => {
    dispatch(ui.actions.setQueryName(event.target.value))
    // dispatch(ui.actions.setQueryPage(1)) //reset page
  };

  const handleChangeGroup = event => {
    dispatch(ui.actions.setQueryGroup(event.target.value))
    // dispatch(ui.actions.setQueryPage(1)) //reset page
  };

  const handleSearch = event => {
    event.preventDefault()
    dispatch(searchItems(url))
    dispatch(ui.actions.setQueryPage(1)) //reset page
  };

  const handleChangeSort = event => {
    dispatch(ui.actions.setQuerySort(event.target.value))
    dispatch(ui.actions.setQueryPage(1)) //reset page
  };


  useEffect(() => {
    console.log("useEffect")
    if (url !== currentQuery && !notFound) { // ony fetch if query has changed
      console.log("fetching")
      dispatch(searchItems(url))
    }
  }, [sort, currentPage]);


  return (
    <ItemsWrapper>
      <SearchWrapper onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="Search"
          // value="{searchName}"
          onChange={handleChangeName}
        />
        <SearchInput
          type="text"
          placeholder="Group"
          // value="{searchGroup}"
          onChange={handleChangeGroup}
        />
        <label>
          <Select onChange={handleChangeSort}>

            <option key="number" value="">Order</option>
            <option key="name" value="name">Name</option>
            <option key="group" value="group">Group</option>

          </Select>
        </label>
        <Button type="submit">Search</Button>
      </SearchWrapper>
      {notFound && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <LoadingIndicator />
      <ListItems />

    </ItemsWrapper >
  )
}
