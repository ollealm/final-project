import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import styled from 'styled-components';

import { Item } from "../components/Item"
import { LoadingIndicator } from '../lib/LoadingIndicator';
//import { Loading } from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { items as itemsReducer } from "../reducers/items"
import { PieChart } from "../components/PieChart"

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 100px;
`

export const ListItems = () => {
  const [items, setItems] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch();

  const url = "http://localhost:8090/items?page=50";

  const { itemNumber } = useParams();

  // Move to Thunk
  useEffect(() => {
    setLoading(true); //change to dispach
    console.log("getting data")
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then(data => {
        setItems(data.items);
        //dispach data.items to Store
        dispatch(itemsReducer.actions.saveItem(data.items))
        console.log("dispatching items")
        // console.log(data.items)
        setPages({ pages: data.pages, total: data.results })
        setLoading(false)
        // setTimeout(() => { // timeout to always show loader
        // }, 50)
      });
  }, []);

  return (
    <ItemsWrapper>
      {loading ? "Loading..." : ""}
      {/* <LoadingIndicator /> */}
      <h2>List</h2>
      <p>Pages: {pages.pages}</p>
      <p>Total results: {pages.total}</p>
      {
        items.map(item => {
          const { Fett, Prot, Kolh, Mono_disack } = item.nutrients //macro
          const values = [Fett.Varde * 2.25, Prot.Varde, (Kolh.Varde - Mono_disack.Varde), Mono_disack.Varde]
          const names = [Fett.Namn, Prot.Namn, Kolh.Namn, Mono_disack.Namn]
          const colors = []
          return (
            <div div key={item._id} >
              <Link to={`/items/${item.number}`}>
                <h3>{item.number} {item.name}</h3>
                <p>{item.group}</p>
                <PieChart valuesArr={values} textArr={names} />
              </Link>
            </div>
          )
          // <Item
          //   key={item._id}
          //   id={item.number}
          //   name={item.name}
          // />
        }
        )
      }
      {/* <Loading loading={loading} /> -> ui*/}
      {/* <Item item={items[itemIndex]} /> */}
    </ItemsWrapper >
  )
}
