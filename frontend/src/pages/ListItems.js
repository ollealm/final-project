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
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const handleChange = e => {
    setSearchTerm(e.target.value)
  };
  const nextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, pagination.pages))
  }
  const prevPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
  }


  const dispatch = useDispatch();
  const { itemNumber } = useParams();

  const url = `http://localhost:8090/items?name=${searchTerm}&page=${currentPage}`;


  // Move to Thunk
  useEffect(() => {
    setLoading(true); //change to dispach
    console.log("getting data")
    // if ui new query 
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then(data => {
        setItems(data.items);
        //dispach data.items to Store
        dispatch(itemsReducer.actions.saveItem(data.items))
        console.log("payload:", data.items)

        console.log("dispatching items")
        // console.log(data.items)
        setPagination({ page: data.page, pages: data.pages, total: data.results })
        setLoading(false)
        // setTimeout(() => { // timeout to always show loader
        // }, 50)
      })
      .catch((err) => {
        setItems(null);
      })
  }, [searchTerm, currentPage]);

  return (
    <ItemsWrapper>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={nextPage}>
        Next
      </button>
      <button
        type="button"
        onClick={prevPage}>
        Prev
      </button>
      {loading ? "Loading..." : ""}
      {/* <LoadingIndicator /> */}
      {
        items && <div>
          <h2>List</h2>
          <p>Page: {pagination.page}</p>
          <p>Pages: {pagination.pages}</p>
          <p>Total results: {pagination.total}</p>
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
        </div>
      }
      {/* <Loading loading={loading} /> -> ui*/}
      {/* <Item item={items[itemIndex]} /> */}
    </ItemsWrapper >
  )
}
