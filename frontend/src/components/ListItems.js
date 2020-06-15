import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ui } from "../reducers/ui"
import { PieChart } from "../lib/PieChart"

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 100px;
`

export const ListItems = () => {
  const dispatch = useDispatch();

  const items = useSelector(store => store.items.currentResult)
  const pagination = useSelector(store => store.items.currentPagination)

  const nextPage = () => {
    dispatch(ui.actions.setQueryPage(Math.min(pagination.page + 1, pagination.pages)))
  }

  const prevPage = () => {
    dispatch(ui.actions.setQueryPage(Math.max(pagination.page - 1, 1)))
  }

  return (
    <ItemsWrapper>

      <h2>List</h2>

      {items.length > 0 && <>
        <div>
          <p>Page: {pagination.page}</p>
          <p>Pages: {pagination.pages}</p>
          <p>Total results: {pagination.total}</p>
        </div>
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

        {items.map(item => {
          // items card
          // creat <energy ratio component> put in item card. conditional prop for categories
          // chart and catagories inside energy ratio.
          const { Fett, Prot, Kolh, Mono_disack } = item.nutrients //macro
          const values = [Fett.Varde * 2.25, Prot.Varde, (Kolh.Varde - Mono_disack.Varde), Mono_disack.Varde]
          const names = [Fett.Namn, Prot.Namn, `${Kolh.Namn} (excl.\u{00A0}socker)`, Mono_disack.Namn]
          // const colors = []
          return (
            <div key={item._id} >
              <Link to={`/items/${item.number}`}>
                <h3>{item.number} {item.name}</h3>
                <p>{item.group}</p>
                <PieChart valuesArr={values} textArr={names} />
                {/* Catagories props = orig.values, precentages, unit, names*/}
              </Link>
            </div>
          )
        })}
      </>}
    </ItemsWrapper >
  )
}
