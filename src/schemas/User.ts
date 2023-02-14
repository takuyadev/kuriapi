import { model, Schema } from "mongoose"
import { IUser, IUserModel } from "../models/interfaces/IUser"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    index: true,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
  },
  roles: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
})

// Encrypt password before saving: pre hook
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next()
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(10)
  const encrypt = await bcrypt.hash(this.password, salt)

  // If encrypt does not return undefined, save encrypted password
  if (encrypt) {
    this.password = encrypt
  }

  next()
})

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default model<IUser, IUserModel>("User", UserSchema)
