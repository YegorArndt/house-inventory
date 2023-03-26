import express from 'express'
import * as itemController from '../controllers/itemController'

const router = express.Router()

// router.get('/', itemController.getAllItems)
router.post('/', itemController.addItem)
router.put('/:oldItemName', itemController.updateItem)

export default router
