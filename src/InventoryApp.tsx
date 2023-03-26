import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow as MuiTableRow,
  TableCell,
  Typography,
  Tooltip,
  IconButton,
  Button,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import Logout from '@mui/icons-material/Logout'
import DeleteIcon from '@mui/icons-material/Delete'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { capitalize, uniqueId } from 'lodash-es'

import {
  getAll,
  addHouseArea,
  updateHouseArea,
  addTable,
  addItem,
  updateItem,
  updateTable,
} from './api'

interface ITableRow {
  itemName: string
  quantity: number
  daysToUseUp?: number
  price?: number
}

interface ITable {
  tableName: string
  items: ITableRow[]
}

export interface HouseAreasAndTheirTables {
  [key: string]: ITable[]
}

const HouseAreaHeader: React.FC<{ name: string }> = ({ name }) => {
  const [isInEditState, setIsInEditState] = useState(false)
  const [houseAreaName, setHouseAreaName] = useState(name)
  const [isUpdating, setIsUpdating] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ houseAreaName: string }>()

  const handleEdit = async ({
    houseAreaName: newName,
  }: {
    houseAreaName: string
  }) => {
    setIsUpdating(true)
    setHouseAreaName(newName) // Optimistic update

    try {
      await updateHouseArea(name, newName)
      // console.log(updateHouseArea)

      // console.log(newName)
    } catch (error) {
      console.error(error)
      setHouseAreaName(name) // Revert to the previous value
    }

    setIsUpdating(false)
    setIsInEditState(false)
  }

  return (
    <Box display='flex' alignItems='center' width='100%' mb='1rem'>
      <Typography fontSize='2rem' mr='2rem'>
        {capitalize(houseAreaName)}
      </Typography>
      {isInEditState && (
        <TextField
          {...register('houseAreaName', { required: true })}
          label='New name'
          size='small'
          variant='outlined'
          error={Boolean(errors['houseAreaName'])}
          autoFocus
        />
      )}
      {isInEditState ? (
        <Box display='flex'>
          <IconButton onClick={handleSubmit(handleEdit)} disabled={isUpdating}>
            <CheckCircleOutlineIcon />
          </IconButton>
          <IconButton
            onClick={() => setIsInEditState(false)}
            disabled={isUpdating}
          >
            <Logout />
          </IconButton>
        </Box>
      ) : (
        <Button
          startIcon={<EditIcon />}
          onClick={() => setIsInEditState(true)}
          disabled={isUpdating}
          sx={{ fontSize: '.8rem' }}
        >
          Edit the house area name
        </Button>
      )}
    </Box>
  )
}

const TableRow: React.FC<
  ITableRow & { onSave: React.Dispatch<React.SetStateAction<ITableRow[]>> }
> = ({ itemName, quantity, daysToUseUp = 0, price = 0, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITableRow>({
    defaultValues: {
      itemName,
      quantity,
      daysToUseUp,
      price,
    },
  })
  const [isInEditState, setIsInEditState] = useState(false)

  const handleEdit = (data: ITableRow) => {
    if (isInEditState) {
      onSave((prev) => {
        const index = prev.findIndex((item) => item.itemName === itemName)
        const newItems = [...prev]
        newItems[index] = data
        return newItems
      })
      setIsInEditState(false)
    } else {
      setIsInEditState(true)
    }
  }

  const renderCells = () => {
    const fieldNameValueMap = new Map([
      ['itemName', itemName],
      ['quantity', `${quantity}`],
      ['daysToUseUp', `${daysToUseUp}`],
      ['price', `${price}`],
    ])

    return Array.from(fieldNameValueMap.entries()).map((entry, index) => (
      <TableCell key={uniqueId()} height={isInEditState ? '100px' : 'auto'}>
        {isInEditState ? (
          <Box position='relative'>
            <TextField
              fullWidth
              size='small'
              {...register(entry[0] as keyof ITableRow, {
                required: true,
                pattern: index === 0 ? /\w/ : /^[0-9]+$/,
              })}
            />
            {errors[entry[0]] && (
              <Box position='absolute' color='red' whiteSpace='nowrap'>
                Check out this field
              </Box>
            )}
          </Box>
        ) : (
          <Typography>{entry[1] || '😸'}</Typography>
        )}
      </TableCell>
    ))
  }

  return (
    <Tooltip
      title={
        <Box
          component='form'
          onSubmit={handleSubmit(handleEdit)}
          px='1rem'
          py='0.5rem'
        >
          <IconButton type='submit'>
            {isInEditState ? <CheckCircleOutlineIcon /> : <EditIcon />}
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          {isInEditState && (
            <IconButton onClick={() => setIsInEditState(false)}>
              <Logout />
            </IconButton>
          )}
        </Box>
      }
      enterDelay={500}
      leaveDelay={200}
    >
      <MuiTableRow>{renderCells()}</MuiTableRow>
    </Tooltip>
  )
}

const InventoryTable: React.FC<ITable> = ({
  tableName,
  items: initialItems,
  ...props
}) => {
  const [items, setItems] = useState(initialItems)

  return (
    <Table {...props}>
      <TableHead sx={{ backgroundColor: 'grey.700' }}>
        <MuiTableRow>
          <TableCell>{capitalize(tableName)}</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Days to use up</TableCell>
          <TableCell>Price</TableCell>
        </MuiTableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.itemName} onSave={setItems} {...item} />
        ))}
      </TableBody>
    </Table>
  )
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const InventoryApp: React.FC = () => {
  const [areasWithTables, setAreasWithTables] =
    useState<HouseAreasAndTheirTables | null>(null)

  useEffect(() => {
    getAll().then((data) => {
      setAreasWithTables(data)
    })
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box p='2rem'>
        <TextField
          label='Search'
          variant='outlined'
          // onChange={handleSearch}
          fullWidth
        />
        <Box width='100%'>
          {areasWithTables ? (
            Object.entries(areasWithTables).map(([houseArea, tables]) => (
              <Box key={houseArea} my='4rem'>
                <HouseAreaHeader name={houseArea} />
                <Box
                  display='flex'
                  alignItems='baseline'
                  gap='5rem'
                  sx={{
                    '& > *': {
                      maxWidth: '600px',
                    },
                  }}
                >
                  {tables.map(({ tableName, items }) => (
                    <InventoryTable
                      key={tableName}
                      tableName={tableName}
                      items={items}
                    />
                  ))}
                </Box>
              </Box>
            ))
          ) : (
            <Box py='2rem'>Loading...</Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default InventoryApp
