import { IUser } from "src/models/interfaces/IUser"

declare global {
  namespace Express {
    interface Request {
      user: IUser | null
    }
  }
}
