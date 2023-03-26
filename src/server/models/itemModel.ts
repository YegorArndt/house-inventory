import { runQuery } from '../db'

export const getAllItems = async () => {
  return runQuery('SELECT * FROM items')
}

export const addItem = async (
  itemName: string,
  quantity: number,
  daysToUseUp: number,
  price: number,
  tableName: string
) => {
  return runQuery(
    'INSERT INTO items (name, quantity, daysToUseUp, price, tableName) VALUES (?, ?, ?, ?, ?)',
    [itemName, quantity, daysToUseUp, price, tableName]
  )
}

export const updateItem = async (
  oldItemName: string,
  newItemName: string,
  newQuantity: number,
  newDaysToUseUp: number,
  newPrice: number,
  newTableName: string
) => {
  return runQuery(
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
}
