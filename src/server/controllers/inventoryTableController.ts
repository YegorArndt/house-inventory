import { Request, Response } from 'express'
import { runQuery } from '../db'

export const addInventoryTable = async (req: Request, res: Response) => {
  const { tableName, houseAreaName } = req.body

  try {
    await runQuery(
      'INSERT INTO inventoryTables (name, houseAreaName) VALUES (?, ?)',
      [tableName, houseAreaName]
    )
    res.json({
      message: `Inventory table '${tableName}' inserted successfully`,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateInventoryTable = async (req: Request, res: Response) => {
  const { oldTableName } = req.params
  const { newTableName, newHouseAreaName } = req.body

  try {
    await runQuery(
      'UPDATE inventoryTables SET name = ?, houseAreaName = ? WHERE name = ?',
      [newTableName, newHouseAreaName, oldTableName]
    )
    res.json({
      message: `Inventory table '${oldTableName}' updated successfully`,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
