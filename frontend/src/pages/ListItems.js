import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import { Item } from "../components/Item"
import { LoadingIndicator } from '../lib/LoadingIndicator';
//import { Loading } from '../components/Loading';

export const ListItems = () => {
  const [items, setItems] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(true)
  const url = "http://localhost:8090/items";

  const { itemNumber } = useParams();


  useEffect(() => {
    setLoading(true); //change to dispach
    console.log("getting data")
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then(data => {
        setTimeout(() => { // timeout to always show loader
          setItems(data.items);
          setPages({ pages: data.pages, total: data.results })
          setLoading(false)
        }, 50)
      });
  }, []);

  return (
    <div>
      {loading ? "Loading..." : ""}
      {/* <LoadingIndicator /> */}
      <h2>List</h2>
      <p>Pages: {pages.pages}</p>
      <p>Total results: {pages.total}</p>
      {
        items.map(item => (
          <div key={item._id}>
            <Link to={`/items/${item.number}`}>
              <h3>{item.number} {item.name}</h3>
            </Link>
            <p>{item.group}</p>
          </div>
          // <Item
          //   key={item._id}
          //   id={item.number}
          //   name={item.name}
          // />
        )
        )
      }
      {/* <Loading loading={loading} /> -> ui*/}
      <Item item={items[itemIndex]} />
    </div>
  )
}
