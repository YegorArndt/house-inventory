// const express = require('express')
// const db = require('./db')
// const { tableNames } = require('./constants.js')

// const queryDb = async (sql) => {
//   return new Promise((resolve, reject) => {
//     db.query(sql, (err, result) => {
//       if (err) {
//         reject(err)
//         return
//       }
//       resolve(result)
//     })
//   })
// }

// const fetchAndFormatAllDbTables = async () => {
//   try {
//     const houseAreas = await queryDb(`SELECT * FROM ${tableNames.houseAreas}`)
//     const inventoryTables = await queryDb(
//       `SELECT * FROM ${tableNames.inventoryTables}`
//     )
//     const items = await queryDb(`SELECT * FROM ${tableNames.items}`)

//     const combinedData = {}

//     houseAreas.forEach((houseArea) => {
//       combinedData[houseArea.name] = []
//     })

//     inventoryTables.forEach((inventoryTable) => {
//       const tableData = {
//         tableName: inventoryTable.name,
//         items: [],
//       }

//       items.forEach((item) => {
//         if (item.tableName === inventoryTable.name) {
//           tableData.items.push({
//             itemName: item.name,
//             quantity: item.quantity,
//             daysToUseUp: item.daysToUseUp,
//             price: item.price,
//           })
//         }
//       })

//       combinedData[inventoryTable.houseAreaName].push(tableData)
//     })

//     return combinedData
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     throw error
//   }
// }

// const app = express()

// // Add CORS headers
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//   next()
// })

// app.get('/getAll', async (req, res) => {
//   try {
//     const tablesData = await fetchAndFormatAllDbTables()
//     res.json(tablesData)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// // Add house area:
// app.post('/housearea', async (req, res) => {
//   const { areaName } = req.body

//   try {
//     const result = await queryDb(
//       `INSERT INTO ${tableNames.houseAreas} (name) VALUES (?)`,
//       [areaName]
//     )
//     res.json({ message: `House area '${areaName}' inserted successfully` })
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// // Update house area:
// app.put('/housearea/:oldName', async (req, res) => {
//   const { oldName } = req.params
//   // const { newName } = req.body

//   res.json({
//     oldName,
//     body: req.body,
//   })

//   // try {
//   //   await queryDb(
//   //     `UPDATE ${tableNames.houseAreas} SET name = ? WHERE name = ?`,
//   //     [newName, oldName]
//   //   )
//   //   res.json({
//   //     message: `House area '${oldName}' updated to '${newName}' successfully`,
//   //   })
//   // } catch (error) {
//   //   res.status(500).json({ message: error.message })
//   // }
// })

// // Add table to house area:
// app.post('/table', async (req, res) => {
//   const { tableName, houseAreaName } = req.body

//   try {
//     const result = await queryDb(
//       `INSERT INTO ${tableNames.inventoryTables} (name, houseAreaName) VALUES (?, ?)`,
//       [tableName, houseAreaName]
//     )
//     res.json({
//       message: `Inventory table '${tableName}' inserted successfully`,
//     })
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// //Update an existing table in a house area:
// app.put('/table/:oldTableName', async (req, res) => {
//   const { oldTableName } = req.params
//   const { newTableName, newHouseAreaName } = req.body

//   try {
//     const result = await queryDb(
//       `UPDATE ${tableNames.inventoryTables} SET name = ?, houseAreaName = ? WHERE name = ?`,
//       [newTableName, newHouseAreaName, oldTableName]
//     )
//     res.json({
//       message: `Inventory table '${oldTableName}' updated successfully`,
//     })
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// //Add a new item to a table:
// app.post('/item', async (req, res) => {
//   const { itemName, quantity, daysToUseUp, price, tableName } = req.body

//   try {
//     const result = await queryDb(
//       `INSERT INTO ${tableNames.items} (name, quantity, daysToUseUp, price, tableName) VALUES (?, ?, ?, ?, ?)`,
//       [itemName, quantity, daysToUseUp, price, tableName]
//     )
//     res.json({ message: `Item '${itemName}' inserted successfully` })
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// //Update an existing item in a table:
// app.put('/item/:oldItemName', async (req, res) => {
//   const { oldItemName } = req.params
//   const { newItemName, newQuantity, newDaysToUseUp, newPrice, newTableName } =
//     req.body

//   try {
//     const result = await queryDb(
//       `UPDATE ${tableNames.items} SET name = ?, quantity = ?, daysToUseUp = ?, price = ?, tableName = ? WHERE name = ?`,
//       [
//         newItemName,
//         newQuantity,
//         newDaysToUseUp,
//         newPrice,
//         newTableName,
//         oldItemName,
//       ]
//     )
//     res.json({ message: `Item '${oldItemName}' updated successfully` })
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// })

// // Add middleware to parse JSON request bodies
// app.use(express.json())

// app.use((req, res) => {
//   res.status(404).end()
// })

// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
