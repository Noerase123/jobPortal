export interface IUser {
  uuid: string
  firstName: string
  lastName: string
  location: string
  email: string
  phone_number: string
  username: string
  password: string
  is_deleted: number
  user_id: number
}

export interface UserPayload {
  user: IUser
}

export interface IJob {
  title: string
  description: string
  payment_amount: string
  city: string
  state: string
  email: string
  phone_number: string
  address: string
  poster_name: string
  is_deleted: number
}