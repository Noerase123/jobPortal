// import {IUser, IUserPayload} from '../../interfaces/Interface'

declare module Express {
  export interface Request {
    userData?: string
  }
}