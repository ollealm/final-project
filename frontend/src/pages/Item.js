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
import { ButtonBracket } from '../lib/Buttons';

import { items as itemsReducer } from "../reducers/items"
import { user } from "../reducers/user"
import { ui } from "../reducers/ui"
import { saveItem } from '../reducers/user';


const ItemWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin: auto;
  width: 80%;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  width: 50%;
`
const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  box-sizing: border-box;
  padding: 1em;
  background: hsla(${props => props.color}, 60%, 95%, 1);
  min-height: 150px;
  margin-bottom: 20px;
  & h2 {
    margin: 0;
  }
  & p {
    font-size: 12px;
    margin: 0;
  }
  & span {
    margin-right: 5px;
  }
`

const ChartWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 50%;
  min-width: 500px;
  box-sizing: border-box;
  padding: 1em;
  background: hsla(${props => props.color}, 60%, 95%, 1);
  margin-bottom: 20px;
`

const TableWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 1em;
  background: hsla(${props => props.color}, 60%, 95%, 1);
  margin-bottom: 20px;
  width: 350px;
`

const CardButton = styled(ButtonBracket)`
  position: relative;
  z-index: 10;
  margin: 10px 10px 15px 0;
`


export const Item = () => {
  const [item, setItem] = useState()
  const [itemSaved, setItemSaved] = useState(false)
  const [statusCode, setStatusCode] = useState(200);
  const { itemNumber } = useParams();
  const history = useHistory();

  const itemsArray = useSelector(store => store.items.itemsArray)
  const savedItems = useSelector(store => store.user.savedItems)
  const user = useSelector(store => store.user.userData.name)

  const dispatch = useDispatch();
  const hashCode = s => s.split('').reduce((a, b) => (a + b.charCodeAt(0)), 0)

  const saveCurrent = () => {
    dispatch(saveItem(itemNumber))
    setItemSaved(true)
  }

  if (itemsArray.length > 0 && !item) {
    let foundItem = itemsArray.find(({ number }) => number === +itemNumber)
    console.log("found in redux")
    foundItem && setItem(foundItem)
  } else if (savedItems.length > 0 && !item) {
    let foundItem = savedItems.find(({ item }) => item.number === +itemNumber)
    console.log("found in Saved items redux")
    foundItem && setItem(foundItem.item)
    console.log(item)
    foundItem && setItemSaved(true)
  }

  const url = `http://localhost:8090/items/${itemNumber}`;
  console.log(itemNumber)
  console.log(user)

  useEffect(() => {
    if (!item) {
      console.log("fetching")
      dispatch(ui.actions.setLoading(true))
      fetch(url)
        .then((res) => {
          setStatusCode(res.status) //dispach?
          return res.json();
        })
        .then(data => {
          setItem(data)
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

  return (
    <div>
      <LoadingIndicator />

      {item && <ItemWrapper>

        <InfoWrapper>
          <ItemText color={hashCode(item.group)}>
            <div>
              <h2>{item.name}</h2>
              {(!itemSaved && user) &&
                <CardButton type="button" onClick={() => saveCurrent()}>
                  Save Item
                </CardButton>}
            </div>
            <p>{item.group}</p>
          </ItemText>
          <TableWrapper color={hashCode(item.group)}>
            <Vitamines {...item.nutrients} color={hashCode(item.group)} />
          </TableWrapper>
          <TableWrapper color={hashCode(item.group)}>
            <Minerals {...item.nutrients} color={hashCode(item.group)} />
          </TableWrapper>
        </InfoWrapper>

        <ChartWrapper color={hashCode(item.group)}>
          <EnergyRatio {...item.nutrients} />
          <MacroComponents {...item.nutrients} />
        </ChartWrapper>
        <ChartWrapper color={hashCode(item.group)}>
          <FatProfile {...item.nutrients} />
          <OmegaRatio {...item.nutrients} />
        </ChartWrapper>
        {/* <LipidProfile {...item.nutrients} />
          <Waste {...item.nutrients} /> */}

      </ItemWrapper>}
    </div >
  )
}
