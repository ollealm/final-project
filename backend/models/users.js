import mongoose from "mongoose";
import crypto from "crypto"

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

export default User