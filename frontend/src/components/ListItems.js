import React, { useState, useEffect } from 'react'
import { Item } from "./Item"

export const ListItems = () => {
  const [items, setItems] = useState([]);
  const [itemIndex, setItemIndex] = useState(0);
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(true)
  const url = "http://localhost:8090/items";

  useEffect(() => {
    setLoading(true);
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
      <h2>List</h2>
      <p>Pages: {pages.pages}</p>
      <p>Total results: {pages.total}</p>
      {
        items.map(item => (
          <div key={item._id}>
            <h3>{item.number} {item.name}</h3>
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
