import { Jwt } from "jsonwebtoken"
import { Document, Model } from "mongoose"

export interface IUser {
  _id?: any
  email: string
  password: string
  roles: "admin"
}

export interface IUserMethod extends IUser {
  matchPassword(enteredPassword: string): string
  getSignedJwtToken(): Jwt
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends IUserMethod, Model<IUser> {}
