import db from '../db'

export const getAllHouseAreas = async () => {
  return db.query('SELECT * FROM houseAreas')
}

export const addHouseArea = async (areaName: string) => {
  return db.query('INSERT INTO houseAreas (name) VALUES (?)', [areaName])
}

export const updateHouseArea = async (oldName: string, newName: string) => {
  return db.query('UPDATE houseAreas SET name = ? WHERE name = ?', [
    newName,
    oldName,
  ])
}
