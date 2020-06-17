import React from 'react'
import styled from 'styled-components';

const Table = styled.table`
  margin: 100px;
`

const TableRow = styled.tr`
  /* color: ${props => `hsl(${props.color} 100% 50%)`}; */
  /* color: ${props => `hsl(${props.color} 50% 20%)`}; */
  color: ${props => props.color};
  font-weight: bold;
  &:nth-child(even) {
  /* background-color: #eee */
}
`

const TableHead = styled.th`
  width: 10px;
  text-align: right;
  &:nth-child(1) {
  text-align: left;
}
`

const TableCell = styled.td`
  width: fit-content;
  /* min-width: 50px; */
  padding: 5px 0 5px 25px;
  text-align: right;
  &:nth-child(1) {
  padding: 5px 25px 5px 0;
  text-align: left;
}
`

const pickColor = (value, colors) => {
  if (value > 80) return colors[4]
  if (value > 40) return colors[3]
  if (value > 20) return colors[2]
  if (value > 10) return colors[1]
  return colors[0]
}

export const NutrientTable = ({ nutrients, RDI = [], colorsArr = [] }) => {
  // colorArr = ["black", "NAVY", "DARKBLUE", "MEDIUMBLUE", "BLUE"]
  // colorArr = [0, 20, 40, 60, 80]
  colorsArr = [
    `hsl(260, 80%, 0%)`,
    `hsl(260, 80%, 20%)`,
    `hsl(210, 80%, 30%)`,
    `hsl(160, 80%, 40%)`,
    `hsl(110, 80%, 50%)`,
  ]

  return (
    <Table>
      <tbody>
        <TableRow>
          <TableHead>Nutrient</TableHead>
          <TableHead>100g</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>RDI</TableHead>
          <TableHead>%</TableHead>
        </TableRow>
        {
          Object.values(nutrients).map((nutrient, index) => {
            const PercRDI = Math.round((nutrient.Varde / RDI[index]) * 1000) / 10
            return (
              <TableRow key={nutrient.Namn} color={pickColor(PercRDI, colorsArr)} >
                <TableCell>{nutrient.Namn}</TableCell>
                <TableCell>{nutrient.Varde}</TableCell>
                <TableCell>{nutrient.Enhet}</TableCell>
                <TableCell>{RDI[index]}</TableCell>
                <TableCell>{PercRDI}&nbsp;%</TableCell>
              </TableRow>
            )
          })
        }
      </tbody>
    </Table >
  )
}
