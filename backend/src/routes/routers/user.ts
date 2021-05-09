import { Router } from 'express';
import {loginUser, userData, register} from '../../controllers/UserController'

const router = Router()

//routers for Jobs
router.post('/signup', register)
router.post('/login', loginUser)
router.post('/userData', userData)

export default router