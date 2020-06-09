import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { items as itemsReducer } from "../reducers/items"
import { user } from "../reducers/user"
import { PieChart } from "./PieChart"



export const Item = ({ itemProps }) => {
  const [item, setItem] = useState()
  const { itemNumber } = useParams();

  const itemsArray = useSelector(store => store.items.itemsArray)
  console.log("itemsArray from store")
  console.log(itemsArray)
  console.log(itemsArray.length)

  const dispatch = useDispatch();
  const saveCurrent = () => {
    dispatch(user.actions.saveItem(item))
    //Thunk to save to database
  }

  if (itemsArray.length > 0 && !item) {
    let singleItem = itemsArray.find(({ number }) => number === +itemNumber)
    console.log("find")
    console.log(singleItem)
    setItem(singleItem)
  }


  // if (itemsArray.length > 0) {
  //   setItem(itemsArray.find(({ number }) => number === +itemNumber))
  //   console.log("find")
  //   console.log(item)
  // } else console.log("no items in array")


  const url = `http://localhost:8090/items/${itemNumber}`;
  console.log(itemNumber)

  useEffect(() => {
    // setLoading(true); //change to dispach
    console.log("useEffect")
    console.log(itemsArray.length)
    if (itemsArray.length === 0) {
      console.log("fetching")
      fetch(url)
        .then((res) => {
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
        });
    } else console.log("Item already in store")
  }, []);

  return (
    <div>
      Item {itemNumber}
      {console.log("loading component")}
      {console.log("Item: ", item)}
      {item && <div>
        {console.log("loading item")}
        <h2>Singel item</h2>
        <h3>{item.number} {item.name}</h3>
        <p>{item.group}</p>
        <button type="button" onClick={() => saveCurrent()}>
          Save
        </button>
        <PieChart test={item.number} />
        {
          Object.values(item.nutrients).map(nutrient => (
            <p key={nutrient.Namn}>
              {nutrient.Namn} {nutrient.Varde} {nutrient.Enhet}
            </p>
          )
          )
        }
      </div>}
    </div>
  )
}
