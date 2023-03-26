import express from 'express'
import * as houseAreaController from '../controllers/houseAreaController'

const router = express.Router()

router.get('/', houseAreaController.getAllHouseAreas)
router.post('/', houseAreaController.addHouseArea)
router.put('/:oldName', houseAreaController.updateHouseArea)

export default router
