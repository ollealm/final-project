import React, { useState } from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ui } from "../reducers/ui"
import { PieChart } from "../lib/PieChart"
import { ItemsCard } from "./ItemsCard"
import { Button, ButtonBracket } from 'lib/Buttons';
import { Select } from '../lib/FormElements';

const Pagination = styled.div`
  display: ;
  
  `
const FlexContainer = styled.div`
  display: flex;
  font-size: 12px;
`


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
  const [chart, setChart] = useState('')

  const dispatch = useDispatch();

  const items = useSelector(store => store.items.currentResult)
  const pagination = useSelector(store => store.items.currentPagination)

  const nextPage = () => {
    dispatch(ui.actions.setQueryPage(Math.min(pagination.page + 1, pagination.pages)))
  }

  const prevPage = () => {
    dispatch(ui.actions.setQueryPage(Math.max(pagination.page - 1, 1)))
  }

  const handleChangeChart = event => {
    setChart(event.target.value)
  };

  return (
    <ItemsWrapper>
      {items.length > 0 && <>
        <Pagination>
          <p>Found {pagination.total} items</p>
          <FlexContainer>
            <Button
              type="button"
              onClick={prevPage}>
              Prev
          </Button>
            <Button
              type="button"
              onClick={nextPage}>
              Next
            </Button>
            <Select onChange={handleChangeChart}>

              <option key="energy" value="">Energy</option>
              <option key="macro" value="macro">Macro</option>
              <option key="omega" value="omega">Omega</option>

            </Select>
          </FlexContainer>
          <p><small>Page {pagination.page} of {pagination.pages}</small></p>
        </Pagination>
        <CardWrapper>
          {items.map(item => {
            // items card
            // creat <energy ratio component> put in item card. conditional prop for categories
            // chart and catagories inside energy ratio.
            return (
              <CardLink key={item._id} to={`/items/${item.number}`}>
                <ItemsCard {...item} chart={chart} />
              </CardLink>
            )
          })}
        </CardWrapper>
      </>}
    </ItemsWrapper >
  )
}
