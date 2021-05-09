import jwt from 'jsonwebtoken'
import StatusCodes from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'
const { UNAUTHORIZED } = StatusCodes
import { config } from '../config'

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const jwt_key = config.secret
  try {

    const token = req.headers.authorization?.split(" ")[1] || ""
    await jwt.verify(token, jwt_key)
    
    next()

  } catch (error) {
    return res.status(UNAUTHORIZED).json({
      message: 'Auth failed'
    })
  }
}

export default checkAuth