import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { Item } from "./Item"
import { LoadingIndicator } from '../lib/LoadingIndicator';
import { items as itemsReducer } from "../reducers/items"
import { ui } from "../reducers/ui"
import { PieChart } from "../components/PieChart"

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 100px;
`



export const ListItems = () => {
  // const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true)
  const items = useSelector(store => store.items.currentResult)
  const pagination = useSelector(store => store.items.currentPagination)
  console.log(pagination)
  const [itemIndex, setItemIndex] = useState(0);
  // const [pagination, setPagination] = useState({});

  const dispatch = useDispatch();

  const [searchName, setSearchName] = useState("")
  const [searchGroup, setSearchGroup] = useState("")
  const [sort, setSort] = useState("")
  // const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState("")

  const currentPage = useSelector(store => store.ui.queryPage)

  const nextPage = () => {
    // setCurrentPage((currentPage) => Math.min(currentPage + 1, pagination.pages))
    dispatch(ui.actions.setQueryPage(Math.min(pagination.page + 1, pagination.pages)))
  }

  const prevPage = () => {
    // setCurrentPage((currentPage) => Math.max(currentPage - 1, 1))
    dispatch(ui.actions.setQueryPage(Math.max(pagination.page - 1, 1)))
  }

  return (
    <ItemsWrapper>

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
      {
        items && <div>
          <h2>List</h2>
          <p>Page: {pagination.page}</p>
          <p>Pages: {pagination.pages}</p>
          <p>Total results: {pagination.total}</p>
        </div>
      }
      {
        items.map(item => {
          // items card
          // creat <energy ratio component> put in item card. conditional prop for categories
          // chart and catagories inside energy ratio.
          const { Fett, Prot, Kolh, Mono_disack } = item.nutrients //macro
          const values = [Fett.Varde * 2.25, Prot.Varde, (Kolh.Varde - Mono_disack.Varde), Mono_disack.Varde]
          const names = [Fett.Namn, Prot.Namn, `${Kolh.Namn} (excl.\u{00A0}socker)`, Mono_disack.Namn]
          const colors = []
          return (
            <div div key={item._id} >
              <Link to={`/items/${item.number}`}>
                <h3>{item.number} {item.name}</h3>
                <p>{item.group}</p>
                <PieChart valuesArr={values} textArr={names} />
                {/* Catagories props = orig.values, precentages, unit, names*/}
              </Link>
            </div>
          )
        }
        )
      }
    </ItemsWrapper >
  )
}
