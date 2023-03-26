const fetcher = async (
  url: string,
  method = 'GET' as 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: Record<string, unknown>
) => {
  const init: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (body) init.body = JSON.stringify(body)

  try {
    const response = await fetch(url, init)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

export const getAll = async () => await fetcher('/')

export const addHouseArea = async (areaName: string) =>
  await fetcher('/housearea', 'POST', { areaName })

export const updateHouseArea = async (oldName: string, newName: string) => {
  let test = await fetch(`/housearea/${oldName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newName }),
  })

  test = await test.json()

  console.log(test)

  // await fetcher(`/housearea/${oldName}`, 'PUT', { newName })
}

export const addTable = async (tableName: string, houseAreaName: string) =>
  await fetcher('/table', 'POST', { tableName, houseAreaName })

export const updateTable = async (
  oldTableName: string,
  newTableName: string,
  houseAreaName: string
) =>
  await fetcher(`/table/${oldTableName}`, 'PUT', {
    newTableName,
    houseAreaName,
  })

export const addItem = async (
  itemName: string,
  quantity: number,
  daysToUseUp: number,
  price: number,
  tableName: string
) =>
  await fetcher('/item', 'POST', {
    itemName,
    quantity,
    daysToUseUp,
    price,
    tableName,
  })

export const updateItem = async (
  oldItemName: string,
  newItemName: string,
  newQuantity: number,
  newDaysToUseUp: number,
  newPrice: number,
  newTableName: string
) =>
  await fetcher(`/item/${oldItemName}`, 'PUT', {
    newItemName,
    newQuantity,
    newDaysToUseUp,
    newPrice,
    newTableName,
  })
