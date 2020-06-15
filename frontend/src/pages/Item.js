import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { PieChart } from "../components/PieChart"
import { LoadingIndicator } from '../lib/LoadingIndicator';

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

const NutrientTable = styled.table`
  margin: 100px;
`

const TableRow = styled.tr`
  &:nth-child(even) {
  background-color: #eee;
}
`

const TableHead = styled.th`
  text-align: left;
  &:nth-child(even) {
  text-align: right;
}
`

const TableCell = styled.td`
  width: 130px;
  padding: 5px 0;
  &:nth-child(even) {
  text-align: right;
}
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

  const valueAndName = (Arr => {

  })

  let macroValues = []
  let macroNames = []
  let gramValues = []
  let gramNames = []
  let fatValues = []
  let fatNames = []
  let omegaValues = []
  let omegaNames = []
  let ratioValues = []
  let ratioNames = []

  if (item) {
    const { Fett, Prot, Kolh, Mono_disack } = item.nutrients //macro
    macroValues = [Fett.Varde * 2.25, Prot.Varde, (Kolh.Varde - Mono_disack.Varde), Mono_disack.Varde]
    macroNames = [Fett.Namn, Prot.Namn, Kolh.Namn, Mono_disack.Namn]

    const { Aska, Vatt, Alko, Fibe } = item.nutrients // gram
    const { Avfa } = item.nutrients // gram
    gramValues = [Fett.Varde, Prot.Varde, Kolh.Varde, Fibe.Varde, Alko.Varde, Vatt.Varde, Aska.Varde]
    gramNames = [Fett.Namn, Prot.Namn, Kolh.Namn, Fibe.Namn, Alko.Namn, Vatt.Namn, Aska.Namn]
    ratioValues = [Avfa.Varde, 100]
    ratioNames = [Avfa.Namn, "Total"]

    const { Mfet, Mone, Pole, Kole } = item.nutrients // fat
    fatValues = [Mfet.Varde, Mone.Varde, Pole.Varde]
    fatNames = [Mfet.Namn, Mone.Namn, Pole.Namn]

    const { C4_0_C10_0, C12_0, C14_0, C16_0, C18_0, C20_0 } = item.nutrients // omega 3
    const { C16_1 } = item.nutrients // omega 7
    const { C18_1 } = item.nutrients // omega 9
    const { C18_2, C20_4 } = item.nutrients // omega 6
    const { C18_3, C20_5, C22_5, C22_6 } = item.nutrients // omega 3

    omegaValues = [C18_3.Varde, C20_5.Varde + C22_5.Varde + C22_6.Varde, C18_2.Varde + C20_4.Varde]
    omegaNames = ["Omega-3 kort", "Omega-3 lång", "Omega-6"]
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
        <h2>Singel item</h2>
        <h3>{item.number} {item.name}</h3>
        <p>{item.group}</p>
        <button type="button" onClick={() => saveCurrent()}>
          Save
        </button>
        <Wrapper>
          <PieChart valuesArr={gramValues} textArr={gramNames} />
          <PieChart valuesArr={macroValues} textArr={macroNames} />
          <PieChart valuesArr={fatValues} textArr={fatNames} />
          <PieChart valuesArr={omegaValues} textArr={omegaNames} />
          <PieChart valuesArr={ratioValues} textArr={ratioNames} />
        </Wrapper>
        <NutrientTable>
          <tbody>
            <TableRow>
              <TableHead>Nutrients</TableHead>
              <TableHead>Per 100g</TableHead>
            </TableRow>
            {
              Object.values(item.nutrients).map(nutrient => (
                <TableRow key={nutrient.Namn}>
                  <TableCell>{nutrient.Namn}</TableCell>
                  <TableCell>{nutrient.Varde}{nutrient.Enhet}</TableCell>
                </TableRow>
              )
              )
            }
          </tbody>
        </NutrientTable>
      </ItemWrapper >}
    </div>
  )
}
