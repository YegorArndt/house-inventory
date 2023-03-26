import db from '../db'

export const getAllInventoryTables = async () => {
  return db.query('SELECT * FROM inventoryTables')
}

export const addInventoryTable = async (
  tableName: string,
  houseAreaName: string
) => {
  return db.query(
    'INSERT INTO inventoryTables (name, houseAreaName) VALUES (?, ?)',
    [tableName, houseAreaName]
  )
}

export const updateInventoryTable = async (
  oldTableName: string,
  newTableName: string,
  newHouseAreaName: string
) => {
  return db.query(
    'UPDATE inventoryTables SET name = ?, houseAreaName = ? WHERE name = ?',
    [newTableName, newHouseAreaName, oldTableName]
  )
}
