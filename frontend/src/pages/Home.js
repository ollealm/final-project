import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ListItems } from "../components/ListItems"
import { LoadingIndicator } from '../lib/LoadingIndicator';
import { SearchInput, Select } from '../lib/FormElements';
import { Button } from '../lib/Buttons';
import { PageWrapper } from '../lib/PageWrapper';
import { ItemsCard } from "../components/ItemsCard"

import { searchItems } from '../reducers/items';
import { ui } from "../reducers/ui"

import { BASE_URL } from '../App';

const HomeWrapper = styled(PageWrapper)`
  flex-flow: row wrap;
`

const SearchWrapper = styled.form`
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    height: 200px;
  }
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


export const Home = () => {
  const dispatch = useDispatch();

  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [statusCode, setStatusCode] = useState(200);

  const searchName = useSelector(store => store.ui.queryName)
  const searchGroup = useSelector(store => store.ui.queryGroup)
  const sort = useSelector(store => store.ui.querySort)
  const currentPage = useSelector(store => store.ui.queryPage)
  const limit = useSelector(store => store.ui.queryLimit)

  const currentQuery = useSelector(store => store.ui.currentQuery)

  const errorMessage = useSelector(store => store.ui.errorMessage)
  const notFound = useSelector(store => store.ui.notFound)

  const url = `${BASE_URL}/items?name=${searchName}&group=${searchGroup}&sort=${sort}&page=${currentPage}` //&limit=${limit}`;  

  let randomItems = 5
  const charts = ["macro", "omega", ""]

  const getChart = () => charts[Math.floor(Math.random() * charts.length)]


  const handleChangeName = event => {
    dispatch(ui.actions.setQueryName(event.target.value))
  };

  const handleChangeGroup = event => {
    dispatch(ui.actions.setQueryGroup(event.target.value))
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
    console.log("fetching")
    dispatch(ui.actions.setLoading(true))
    //create a random backend endpoint instead 
    const number = Math.floor(Math.random() * 2160)
    const itemUrl = `${BASE_URL}/items/${number}`;

    fetch(itemUrl)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw 'Item not found'
      })
      .then(data => {
        setItems(items => [...items, data])
        if (items.length < randomItems) setCount(count + 1)
        console.log(count)
        console.log(items.length)
      })
      .catch(error => {
        console.log("Error: ", error);
        setCount(count + 1)
      });

    dispatch(ui.actions.setLoading(false))

  }, [count]);

  console.log("items", items)

  return (
    <HomeWrapper>
      <LoadingIndicator />
      <CardWrapper>
        {items.map((item, index) => (
          <ItemsCard {...item} chart={getChart()} />
        ))}
      </CardWrapper>
    </HomeWrapper >
  )
}
