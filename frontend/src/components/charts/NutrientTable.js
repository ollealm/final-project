import React from 'react'
import styled from 'styled-components';

const Table = styled.table`
  margin: 100px;
`

const TableRow = styled.tr`
  &:nth-child(even) {
  background-color: #eee;
}
`

const TableHead = styled.th`
  text-align: left;
  &:nth-child(even) {
  text-align: right;
}
`

const TableCell = styled.td`
  width: 130px;
  padding: 5px 0;
  &:nth-child(even) {
  text-align: right;
}
`

export const NutrientTable = ({ nutrients }) => {
  return (
    <Table>
      <tbody>
        <TableRow>
          <TableHead>Nutrients</TableHead>
          <TableHead>Per 100g</TableHead>
        </TableRow>
        {
          Object.values(nutrients).map(nutrient => (
            <TableRow TableRow TableRow key={nutrient.Namn} >
              <TableCell>{nutrient.Namn}</TableCell>
              <TableCell>{nutrient.Varde}{nutrient.Enhet}</TableCell>
            </TableRow>
          ))
        }
      </tbody>
    </Table>
  )
}
