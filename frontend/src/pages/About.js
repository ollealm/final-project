import React from 'react'
import styled from 'styled-components';
import { PageWrapper } from '../lib/PageWrapper';

const AboutWrapper = styled(PageWrapper)`
`

export const About = () => {
  return (
    <AboutWrapper>
      <p>All data from <a href="https://www.livsmedelsverket.se/livsmedel-och-innehall/naringsamne/livsmedelsdatabasen">Livsmedelsdatabasen</a> version 2020. </p>
    </AboutWrapper>
  )
}
