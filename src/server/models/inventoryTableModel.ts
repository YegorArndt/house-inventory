import { runQuery } from '../db'

export const getAllInventoryTables = async () => {
  return runQuery('SELECT * FROM inventoryTables')
}

export const addInventoryTable = async (
  tableName: string,
  houseAreaName: string
) => {
  return runQuery(
    'INSERT INTO inventoryTables (name, houseAreaName) VALUES (?, ?)',
    [tableName, houseAreaName]
  )
}

export const updateInventoryTable = async (
  oldTableName: string,
  newTableName: string,
  newHouseAreaName: string
) => {
  return runQuery(
    'UPDATE inventoryTables SET name = ?, houseAreaName = ? WHERE name = ?',
    [newTableName, newHouseAreaName, oldTableName]
  )
}
