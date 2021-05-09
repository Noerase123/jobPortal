import { Router } from 'express';
import jobRouter from './routers/job'
import userRouter from './routers/user'

const baseRouter = Router()

baseRouter.use('/job', jobRouter)
baseRouter.use('/user', userRouter)
export default baseRouter