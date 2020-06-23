import React from 'react'
import styled from 'styled-components';

const Table = styled.table`
  /* margin: 10px; */
  width: 100%;
  margin-bottom: 20px;
`
const TableTitle = styled.h3`
  text-align: center;
  font-size: 17px;
  margin-top: 0;
`

const TableRow = styled.tr`
  /* color: ${props => `hsl(${props.color} 100% 50%)`}; */
  /* color: ${props => `hsl(${props.color} 50% 20%)`}; */
  /* font-weight: ${props => props.weight}; */
  color: ${props => props.color};
  font-size: 14px;
  &:nth-child(even) {
  background-color: rgba(255, 255, 255, .6)
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
  padding: 7px 0 5px 7px;
  text-align: right;
  font-weight: ${props => props.weight};
  color: ${props => props.color};

  &:nth-child(1) {
  padding-left: 5px;
  padding-right: 5px;
  text-align: left;
}
`

const pickColor = (value, colors) => {
  if (value > 80) return colors[4]
  if (value > 40) return colors[3]
  if (value > 10) return colors[2]
  if (value > 0) return colors[1]
  return colors[0]
}

const pickWeight = (value) => {
  if (value > 10) return "bold"
  return "normal"
}

export const NutrientTable = ({ title, nutrients, RDI = [], color }) => {
  // colorArr = ["black", "NAVY", "DARKBLUE", "MEDIUMBLUE", "BLUE"]
  // colorArr = [0, 20, 40, 60, 80]
  const colorsArr = [
    `hsl(${color}, 0%, 60%)`,
    `hsl(${color}, 60%, 0%)`,
    `hsl(${color}, 70%, 30%)`,
    `hsl(${color}, 80%, 40%)`,
    `hsl(${color}, 90%, 50%)`,
  ]

  return (
    <>
      <TableTitle>{title}</TableTitle>
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
                  <TableCell color={pickColor(PercRDI, colorsArr)} weight={pickWeight(PercRDI)}>{nutrient.Namn}</TableCell>
                  <TableCell>{nutrient.Varde}</TableCell>
                  <TableCell>{nutrient.Enhet}</TableCell>
                  <TableCell>{RDI[index]}</TableCell>
                  {!isNaN(PercRDI) && <TableCell color={pickColor(PercRDI, colorsArr)} weight={pickWeight(PercRDI)}>{PercRDI}&nbsp;%</TableCell>}
                </TableRow>
              )
            })
          }
        </tbody>
      </Table >
    </>
  )
}
