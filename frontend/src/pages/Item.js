import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { LoadingIndicator } from '../lib/LoadingIndicator';
import { EnergyRatio } from "../components/charts/EnergyRatio"
import { MacroComponents } from "../components/charts/MacroComponents"
import { FatProfile } from "../components/charts/FatProfile"
import { OmegaRatio } from "../components/charts/OmegaRatio"
import { LipidProfile } from "../components/charts/LipidProfile"
import { Waste } from "../components/charts/Waste"
import { Vitamines } from "../components/charts/Vitamines"
import { Minerals } from "../components/charts/Minerals"

import { BarChart } from "../lib/BarChart"

import { items as itemsReducer } from "../reducers/items"
import { user } from "../reducers/user"
import { ui } from "../reducers/ui"
import { saveItem } from '../reducers/user';


const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  
`



export const Item = ({ itemProps }) => {
  const [item, setItem] = useState()
  const [statusCode, setStatusCode] = useState(200);
  const { itemNumber } = useParams();
  const history = useHistory();

  const itemsArray = useSelector(store => store.items.itemsArray)
  const savedItems = useSelector(store => store.user.savedItems)

  console.log("itemsArray from store")
  console.log(itemsArray)
  console.log(itemsArray.length)

  const dispatch = useDispatch();

  const saveCurrent = () => {
    // dispatch(user.actions.saveItem(item))
    //Thunk to save to database
    dispatch(saveItem(itemNumber))
  }

  if (itemsArray.length > 0 && !item) {
    let findItem = itemsArray.find(({ number }) => number === +itemNumber)
    // let findItem = itemsArray.find((item) => item.number === +itemNumber)
    console.log("find in redux")
    console.log(findItem)
    findItem && setItem(findItem)
  } else if (savedItems.length > 0 && !item) {
    let findItem = savedItems.find(({ item }) => item.number === +itemNumber).item
    console.log("find in Saved items redux")
    console.log(findItem)
    findItem && setItem(findItem)
  }


  // if (itemsArray.length > 0) {
  //   setItem(itemsArray.find(({ number }) => number === +itemNumber))
  //   console.log("find")
  //   console.log(item)
  // } else console.log("no items in array")


  const url = `http://localhost:8090/items/${itemNumber}`;
  console.log(itemNumber)

  console.log("item before useEffect ", item)
  useEffect(() => {
    // setLoading(true); //change to dispach
    console.log("useEffect")
    console.log(itemsArray.length)
    if (!item) {
      console.log("fetching")
      dispatch(ui.actions.setLoading(true))
      fetch(url)
        .then((res) => {
          console.log("Res: ", res)
          setStatusCode(res.status) //dispach?
          return res.json();
        })
        .then(data => {
          console.log("Data: ", data)
          setItem(data)
          console.log("Item after set: ", item)
          // setTimeout(() => { // timeout to always show loader
          // setItems(data.items);
          // setPages({ pages: data.pages, total: data.results })
          // setLoading(false)
          // }, 50)
          dispatch(ui.actions.setLoading(false))
        })
        .catch(error => {
          console.log("Error: ", error);
          dispatch(ui.actions.setLoading(false))
        });
    } else console.log("Item already in store")
  }, []);

  if (statusCode !== 200) {
    console.log("status not 200")
    history.push("/items")
  }

  // Show if part of saved items
  // Show what list
  // Show price
  // Show name
  // Add name and price to save
  return (
    <div>
      <LoadingIndicator />
      Item {itemNumber}

      {console.log("loading component")}
      {console.log("Item in return: ", item)}

      {item && <ItemWrapper>
        {console.log("loading item in return")}
        {console.log(item.nutrients)}
        <h2>Singel item</h2>
        <h3>{item.number} {item.name}</h3>
        <p>{item.group}</p>

        <button type="button" onClick={() => saveCurrent()}>
          Save
        </button>

        <Wrapper>
          {/* <BarChart /> */}
          <EnergyRatio {...item.nutrients} />
          <MacroComponents {...item.nutrients} />
          <FatProfile {...item.nutrients} />
          <OmegaRatio {...item.nutrients} />
          <LipidProfile {...item.nutrients} />
          <Waste {...item.nutrients} />
        </Wrapper>
        <Vitamines {...item.nutrients} />
        <Minerals {...item.nutrients} />

        {/*
          <Stapeldiagram>
          <Etikett (tabell)>
          <Tabell macro>?
          <Tabell vita>?
          <Tabell mine>?
          

*/}
      </ItemWrapper>}
    </div >
  )
}
