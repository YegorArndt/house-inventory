import { Request, Response } from 'express'
import { runQuery } from '../db'

export const getAllHouseAreas = async (req: Request, res: Response) => {
  try {
    const houseAreas = await runQuery('SELECT * FROM houseAreas')
    res.json(houseAreas)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const addHouseArea = async (req: Request, res: Response) => {
  const { areaName } = req.body

  try {
    await runQuery('INSERT INTO houseAreas (name) VALUES (?)', [areaName])
    res.json({ message: `House area '${areaName}' inserted successfully` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateHouseArea = async (req: Request, res: Response) => {
  const { oldName } = req.params
  const { newName } = req.body

  try {
    await runQuery('UPDATE houseAreas SET name = ? WHERE name = ?', [
      newName,
      oldName,
    ])
    res.json({
      message: `House area '${oldName}' updated to '${newName}' successfully`,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
