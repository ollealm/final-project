import foodData from './data/livsmedel.json'
// let foodData = "7,7, 11,5, 323,32"
foodData = foodData.replace(/(?<=\d),(?=\d)/gm, '.')

console.log(foodData)