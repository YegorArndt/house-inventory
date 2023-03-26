import { Router } from 'express'
import houseAreaRoutes from './houseAreaRoutes'
import inventoryTableRoutes from './inventoryTableRoutes'
import itemRoutes from './itemRoutes'

const router = Router()

router.use('/housearea', houseAreaRoutes)
router.use('/table', inventoryTableRoutes)
router.use('/item', itemRoutes)

export default router
