import express from 'express'
import * as inventoryTableController from '../controllers/inventoryTableController'

const router = express.Router()

// router.get('/', inventoryTableController.getAllInventoryTables)
router.post('/', inventoryTableController.addInventoryTable)
router.put('/:oldTableName', inventoryTableController.updateInventoryTable)

export default router
