import mongoose from "mongoose";

const Item = mongoose.model("Item", {
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  group: {
    type: String,
  },
  nutrients: {
    Mfet: {
      name: {
        type: String,
        default: "Mfet"
      },
      short: String,
      value: Number,
      unit: String,
    },
    Jod: {
      Namn: {
        type: String,
        default: "Jod"
      },
      Forkortning: String,
      Varde: {
        type: String,
        default: "0"
      },
      Enhet: String,
    },
  },
})

/*
const Nutrient = mongoose.model("Nutrient", {
  name: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: null,
  },
})
*/

export default Item