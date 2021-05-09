import { Router } from 'express';
import { getAll, getOne, addItem, updateItem, deleteItem } from '../../controllers/JobController'
import checkAuth from '../../middleware/check-auth'

const router = Router()

//routers for Jobs
router.get('/list', checkAuth, getAll)
router.get('/list/:id', checkAuth,  getOne)
router.post('/add', checkAuth,  addItem)
router.put('/update/:id', checkAuth, updateItem)
router.put('/delete/:id', checkAuth, deleteItem)

export default router