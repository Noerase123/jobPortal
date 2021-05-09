import StatusCodes from 'http-status-codes'
import { Request, Response } from 'express'
import { paramMissingError } from '@shared/constants'
const { BAD_REQUEST, CREATED, OK } = StatusCodes
import {login, getUser, signUp} from '../services/users/userService'

/**
 * Login User
 * 
 * @param req
 * @param res
 * @returns
 */
export const loginUser = async (req: Request, res: Response) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  const data = await login(user)
  return res.status(OK).json(data)
}

/**
 * Get user's data
 * 
 * @param req 
 * @param res 
 */
export const userData = async (req: Request, res: Response) => {
  const data = await getUser(req.headers.authorization?.split(" ")[1] || "")
  return res.status(OK).json(data)
}

/**
 * signup/register
 * 
 * @param req 
 * @param res 
 */
export const register = async (req: Request, res: Response) => {
  const data = await signUp(req.body)
  return res.status(CREATED).json(data)
}