import {User} from '@entities/User'
import dbConnect from '../../databaseConnect'
import { uuid } from 'uuidv4'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {config} from '../../config'

/**
 * Sign up 
 * 
 */
export const signUp = (data: any) => {

  return dbConnect.then(async connect => {

    let hashPassword = bcrypt.hashSync(data.password, 10)

    // let date = new Date()
    let uniqID = uuid()
    let firstName = data.firstname
    let lastName = data.lastname
    let location = data.location
    let email = data.email
    let phone_number = data.phone_number
    let username = data.username
    let is_deleted = 0
    let password = hashPassword
    // let date_created = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    let date_created = new Date()
    let last_login = new Date()

    let user = new User(uniqID, firstName, lastName, location, email, phone_number, username, String(password), date_created, last_login, is_deleted)

    await connect.manager.save(user)

    return {
      message: 'SIGNUP SUCCESS'
    }

  }).catch(error => console.log(error))
}

/**
 * Login
 */
export const login = (data: any) => {
  
  return dbConnect.then(async connect => {
    
    let repo = connect.getRepository(User)
    let existUser = await repo.findOne({ username: data.username })
    if (!existUser) {
      return {
        message: 'user not exist'
      } 
    }
    let result = bcrypt.compareSync(data.password, existUser.password)

    if (result) {

      let date = new Date()
      let updateData = {
        last_login: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
      }

      await repo.update({ username: data.username }, updateData)

      const payload = {
        user: existUser
      }
      const token = jwt.sign(payload, config.secret)

      return {
        message: 'Auth Login',
        token: token
      }
    } else {
      return {
        message: 'Invalid Login'
      }
    }

  }).catch(error => console.log(error))
}

/**
 * Get Users's Data
 * 
 * @param user 
 */
export const getUser = (token: any) => {
  
  return jwt.verify(token,config.secret)
}