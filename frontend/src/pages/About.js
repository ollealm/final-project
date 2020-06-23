import React from 'react'
import styled from 'styled-components';
import { PageWrapper } from '../lib/PageWrapper';

const AboutWrapper = styled(PageWrapper)`
`

export const About = () => {
  return (
    <AboutWrapper>
      <p>Search nutrients in over 2100 common food items.
      Customise tables and charts.
      All data from <a href="https://www.livsmedelsverket.se/livsmedel-och-innehall/naringsamne/livsmedelsdatabasen">Livsmedelsdatabasen</a> version 2020-01-01. Disclaimer.
      </p>
    </AboutWrapper>
  )
}
