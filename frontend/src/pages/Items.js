import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ListItems } from "./ListItems"
import { LoadingIndicator } from '../lib/LoadingIndicator';

import { items as itemsReducer } from "../reducers/items"
import { ui } from "../reducers/ui"

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 100px;
`

export const Items = () => {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true)

  // const [searchName, setSearchName] = useState("") OLD
  // const [searchGroup, setSearchGroup] = useState("") OLD
  // const [sort, setSort] = useState("") OLD

  // const [currentPage, setCurrentPage] = useState(1) OLD
  // const [limit, setLimit] = useState("") OLD

  const handleChangeName = event => {
    // setSearchName(e.target.value)
    dispatch(ui.actions.setQueryName(event.target.value))
    dispatch(ui.actions.setQueryPage(1)) //reset page
  };

  const handleChangeGroup = event => {
    // setSearchGroup(e.target.value)
    dispatch(ui.actions.setQueryGroup(event.target.value))
    dispatch(ui.actions.setQueryPage(1)) //reset page
  };

  const handleChangeSort = event => {
    dispatch(ui.actions.setQuerySort(event.target.value))
    dispatch(ui.actions.setQueryPage(1)) //reset page
  };


  /* 
  i smatiliga
  hämta nuvarande query
  uppdatera query om nått ändras
  sicka iväg den ny queryn 
  använd query
  */

  /* 
  i smatiliga
  uppdatera store med queries om nått ändras
  hämta den nya queryn 
  använd query
  */

  /* 
  i smatiliga
  uppdatera store med query om nått ändras
  hämta den nya queryn 
  använd query
  */



  const dispatch = useDispatch();
  const { itemNumber } = useParams();

  const searchName = useSelector(store => store.ui.queryName)
  const searchGroup = useSelector(store => store.ui.queryGroup)
  const sort = useSelector(store => store.ui.querySort)
  const currentPage = useSelector(store => store.ui.queryPage)
  const limit = useSelector(store => store.ui.queryLimit)

  const currentQuery = useSelector(store => store.ui.currentQuery)
  const url = `http://localhost:8090/items?name=${searchName}&group=${searchGroup}&sort=${sort}&page=${currentPage}` //&limit=${limit}`;  

  const urlQuery = `
  &name=${searchName}
  &group=${searchGroup}
  &sort=${sort}
  &page=${currentPage}
  &limit=${limit}`

  // Move to Thunk
  useEffect(() => {
    setLoading(true); //change to dispach
    console.log("useEffect")
    console.log(url)
    console.log(currentQuery)
    // if ui new query else show current results
    if (url !== currentQuery) {
      console.log("fetching")
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then(data => {
          setItems(data.items);
          //dispach data.items to Store
          dispatch(itemsReducer.actions.saveItem(data.items)) // OLD adding all results
          dispatch(itemsReducer.actions.setCurrentResult(data.items)) // saving results
          dispatch(ui.actions.setCurrentQuery(url)) //saving search query
          console.log("payload:", data.items)

          console.log("dispatching items")
          // console.log(data.items)
          // setPagination({ page: data.page, pages: data.pages, total: data.results })
          dispatch(itemsReducer.actions.setCurrentPagination({ page: data.page, pages: data.pages, total: data.results }))
          // setTimeout(() => { // timeout to always show loader
          // }, 50)
        })
        .catch((err) => {
          setItems(null);
        })
    }
    setLoading(false)
  }, [url]);

  return (
    <ItemsWrapper>
      <input
        type="text"
        placeholder="Search"
        value={searchName}
        onChange={handleChangeName}
      />
      <input
        type="text"
        placeholder="Group"
        value={searchGroup}
        onChange={handleChangeGroup}
      />
      <label>
        <select
          onChange={handleChangeSort}
        >

          <option key="number" value="">number</option>
          <option key="name" value="name">name</option>
          <option key="group" value="group">group</option>

        </select>
      </label>
      {loading ? "Loading..." : ""}
      <ListItems />

    </ItemsWrapper >
  )
}
