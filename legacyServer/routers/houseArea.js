const { app, tableNames, query } = require('../')

app.get('/getAll', async (_req, res) => {
  try {
    const tablesData = await fetchAllTables()
    res.json(formatTablesForClient(tablesData))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.post('/housearea', async (req, res) => {
  const { areaName } = req.body

  try {
    await query(`INSERT INTO ${tableNames.houseAreas} (name) VALUES (?)`, [
      areaName,
    ])
    res.json({ message: `House area '${areaName}' inserted successfully` })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const fetchAllTables = async () => {
  try {
    const houseAreas = await query(`SELECT * FROM ${tableNames.houseAreas}`)
    const inventoryTables = await query(
      `SELECT * FROM ${tableNames.inventoryTables}`
    )
    const items = await query(`SELECT * FROM ${tableNames.items}`)

    return { houseAreas, inventoryTables, items }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

const formatTablesForClient = ({ houseAreas, inventoryTables, items }) => {
  const combinedData = {}

  houseAreas.forEach((houseArea) => {
    combinedData[houseArea.name] = []
  })

  inventoryTables.forEach((inventoryTable) => {
    const tableData = {
      tableName: inventoryTable.name,
      items: [],
    }

    items.forEach((item) => {
      if (item.tableName === inventoryTable.name) {
        tableData.items.push({
          itemName: item.name,
          quantity: item.quantity,
          daysToUseUp: item.daysToUseUp,
          price: item.price,
        })
      }
    })

    combinedData[inventoryTable.houseAreaName].push(tableData)
  })

  return combinedData
}
