import React from 'react'

export const Item = ({ item }) => {
  return (
    <div>
      {item && <div>
        <h2>Singel item</h2>
        <h3>{item.number} {item.name}</h3>
        <p>{item.group}</p>
        {
          Object.values(item.nutrients).map(nutrient => (
            <p key={nutrient.Namn}>
              {nutrient.Namn} {nutrient.Varde} {nutrient.Enhet}
            </p>
          )
          )
        }
      </div>}
    </div>
  )
}
