import { Request, Response } from 'express'
import { runQuery } from '../db'

export const addItem = async (req: Request, res: Response) => {
  const { itemName, quantity, daysToUseUp, price, tableName } = req.body

  try {
    await runQuery(
      'INSERT INTO items (name, quantity, daysToUseUp, price, tableName) VALUES (?, ?, ?, ?, ?)',
      [itemName, quantity, daysToUseUp, price, tableName]
    )
    res.json({ message: `Item '${itemName}' inserted successfully` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateItem = async (req: Request, res: Response) => {
  const { oldItemName } = req.params
  const { newItemName, newQuantity, newDaysToUseUp, newPrice, newTableName } =
    req.body

  try {
    await runQuery(
      'UPDATE items SET name = ?, quantity = ?, daysToUseUp = ?, price = ?, tableName = ? WHERE name = ?',
      [
        newItemName,
        newQuantity,
        newDaysToUseUp,
        newPrice,
        newTableName,
        oldItemName,
      ]
    )
    res.json({ message: `Item '${oldItemName}' updated successfully` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
