import React from 'react'
import { EnergyRatio } from "./charts/EnergyRatio"

export const ItemsCard = ({ name, group, nutrients }) => {

  return (
    <div>
      <h3>{name}</h3>
      <p>{group}</p>
      <EnergyRatio {...nutrients} />
    </div>
  )
}



/*
Items
ListItems
ItemsCard
  SpecificChartComponent - handles data
    PieChart or other cartcomponent


Item
  SpecificChartComponent - handles data
    PieChart or other cartcomponent
  Table component
*/




