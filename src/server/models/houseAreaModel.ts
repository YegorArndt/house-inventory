import { runQuery } from '../db'

export const getAllHouseAreas = async () => {
  return runQuery('SELECT * FROM houseAreas')
}

export const addHouseArea = async (areaName: string) => {
  return runQuery('INSERT INTO houseAreas (name) VALUES (?)', [areaName])
}

export const updateHouseArea = async (oldName: string, newName: string) => {
  return runQuery('UPDATE houseAreas SET name = ? WHERE name = ?', [
    newName,
    oldName,
  ])
}
