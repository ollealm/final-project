import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { EnergyRatio } from "../components/charts/EnergyRatio"
import { MacroComponents } from "../components/charts/MacroComponents"
import { FatProfile } from "../components/charts/FatProfile"
import { OmegaRatio } from "../components/charts/OmegaRatio"
// import { LipidProfile } from "../components/charts/LipidProfile"
// import { Waste } from "../components/charts/Waste"
import { Vitamines } from "../components/charts/Vitamines"
import { Minerals } from "../components/charts/Minerals"

import { LoadingIndicator } from '../lib/LoadingIndicator';
import { ButtonBracket } from '../lib/Buttons';
import { PageWrapper } from '../lib/PageWrapper';

import { ui } from "../reducers/ui"
import { saveItem } from '../reducers/user';

import { BASE_URL } from '../App';

const ItemWrapper = styled(PageWrapper)`
  flex-flow: row wrap;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  /* width: 50%; */
  margin-right: 1em;
  flex-grow: 1;
  @media (max-width: 768px) {
    margin-right: 0em;
  }
`
const ItemText = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 1;
  /* width: 350px; */
  box-sizing: border-box;
  padding: 1em;
  background: hsla(${props => props.color}, 60%, 95%, 1);
  min-height: 150px;
  margin-bottom: 20px;
  border-radius: 5px;
  width: 100%;
  & h2 {
    margin: 0;
  }
  & p {
    font-size: 12px;
    margin-bottom: 0;
  }
  & span {
    margin-right: 5px;
  }
  `
const Energy = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
  & p {
    margin: 0 0 5px 0;
    font-size: 14px;
  }
`

const Text = styled.div`
  width: 200px;
`

const ChartWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 50%;
  /* min-width: 500px; */
  flex-grow: 1;
`

const ChartGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 1em;
  background: hsla(${props => props.color}, 60%, 95%, 1);
  margin-bottom: 20px;
  border-radius: 5px;
`

const TableWrapper = styled.div`
`

const TableContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  padding: 1em;
  background: hsla(${props => props.color}, 60%, 95%, 1);
  margin-bottom: 20px;
  width: 100%;
  border-radius: 5px;
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

  // setts item 2 times, if both in Array and Saved
  if (itemsArray.length > 0 && !item) {
    let foundItem = itemsArray.find(({ number }) => number === +itemNumber)
    console.log("found in redux")
    foundItem && setItem(foundItem)
  }
  // else 
  if (savedItems.length > 0 && !item) {
    let foundItem = savedItems.find(({ item }) => item.number === +itemNumber)
    console.log("found in Saved items redux")
    foundItem && setItem(foundItem.item)
    console.log(item)
    foundItem && setItemSaved(true)
  }

  const url = `${BASE_URL}/items/${itemNumber}`;

  useEffect(() => {
    if (!item) {
      console.log("fetching")
      dispatch(ui.actions.setLoading(true))
      fetch(url)
        .then((res) => {
          setStatusCode(res.status)
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
            <Energy>
              <p>100 g gives <strong>{item.nutrients.Ener.Varde} kcal</strong></p>
              <p>100 kcal takes <strong>{Math.round((100 / item.nutrients.Ener.Varde) * 100)} g</strong></p>
            </Energy>
            <Text>
              <h2>{item.name}</h2>
              {(!itemSaved && user) &&
                <CardButton type="button" onClick={() => saveCurrent()}>
                  Save Item
                </CardButton>}
            </Text>
            <p>{item.group}</p>
          </ItemText>
          <TableContainer color={hashCode(item.group)}>
            <Vitamines {...item.nutrients} color={hashCode(item.group)} />
          </TableContainer>
          <TableContainer color={hashCode(item.group)}>
            <Minerals {...item.nutrients} color={hashCode(item.group)} />
          </TableContainer>
        </InfoWrapper>

        <ChartWrapper>

          <ChartGroup color={hashCode(item.group)}>
            <EnergyRatio {...item.nutrients} />
            <MacroComponents {...item.nutrients} />
          </ChartGroup>

          <ChartGroup color={hashCode(item.group)}>
            <FatProfile {...item.nutrients} />
            <OmegaRatio {...item.nutrients} />
          </ChartGroup>

          {/* <ChartGroup color={hashCode(item.group)}>
            <LipidProfile {...item.nutrients} />
            <Waste {...item.nutrients} />
          </ChartGroup> */}

        </ChartWrapper>
      </ItemWrapper>}
    </div >
  )
}
