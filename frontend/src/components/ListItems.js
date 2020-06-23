import React, { useState } from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ui } from "../reducers/ui"
import { ItemsCard } from "./ItemsCard"
import { Button } from 'lib/Buttons';
import { Select } from '../lib/FormElements';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 30px;
`

const Pagination = styled.div`
  width: 100%;  
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: wrap;
  margin: 0 -10px;
  & a {
    text-decoration: none; 
  }
`

export const ListItems = () => {
  const [chart, setChart] = useState('')

  const dispatch = useDispatch();

  const items = useSelector(store => store.items.currentResult)
  const pagination = useSelector(store => store.items.currentPagination)

  const nextPage = () => {
    dispatch(ui.actions.setQueryPage(Math.min(pagination.page + 1, pagination.pages)))
    window.scrollTo(0, 0);
  }

  const prevPage = () => {
    dispatch(ui.actions.setQueryPage(Math.max(pagination.page - 1, 1)))
    window.scrollTo(0, 0);
  }

  const handleChangeChart = event => {
    setChart(event.target.value)
  };

  return (
    <ListWrapper>
      {items.length > 0 &&
        <>
          <Pagination>
            <FlexContainer>
              <Button
                type="button"
                onClick={prevPage}>
                Prev
            </Button>

              <Select onChange={handleChangeChart}>
                <option key="energy" value="">Energy Ratio</option>
                <option key="macro" value="macro">Macro</option>
                <option key="omega" value="omega">Omega Ratio</option>
              </Select>

              <Button
                type="button"
                onClick={nextPage}>
                Next
            </Button>
            </FlexContainer>

            <FlexContainer>
              <p>{pagination.total} items</p>
              <p>Page {pagination.page} of {pagination.pages}</p>
            </FlexContainer>
          </Pagination>

          <CardWrapper>
            {items.map(item => (
              <ItemsCard {...item} chart={chart} />
            ))}
          </CardWrapper>

          <Pagination>
            <FlexContainer>
              <p>{pagination.total} items</p>
              <p><small>Page {pagination.page} of {pagination.pages}</small></p>
            </FlexContainer>
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
            </FlexContainer>
          </Pagination>

        </>
      }
    </ListWrapper >
  )
}
