import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ui } from "../reducers/ui"
import { PieChart } from "../lib/PieChart"
import { ItemsCard } from "./ItemsCard"

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  & a {
    text-decoration: none; 
    /* &:hover{
      text-decoration: underline;
    } */
  }
`
const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

`
const CardLink = styled(Link)`
  width: 100%;
/* width: 45%;
  margin-left: 5%; */
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
        <CardWrapper>
          {items.map(item => {
            // items card
            // creat <energy ratio component> put in item card. conditional prop for categories
            // chart and catagories inside energy ratio.
            return (
              <CardLink key={item._id} to={`/items/${item.number}`}>
                <ItemsCard {...item} />
              </CardLink>
            )
          })}
        </CardWrapper>
      </>}
    </ItemsWrapper >
  )
}
