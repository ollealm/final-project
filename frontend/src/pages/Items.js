import React from 'react'
import { useParams, Link } from "react-router-dom";

import { ListItems } from "./ListItems"
//import { Loading } from '../components/Loading';

export const Items = () => {
  return (
    <div>
      <h1>Items</h1>
      {/*loading ? <Loading /> :*/}
      <ListItems />
    </div>
  )
}
