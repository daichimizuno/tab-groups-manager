import { Colorize } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Color, TabGroup } from '../../../dao/chrome_storage_access'

type Props = {
  open: boolean
  disagree: () => void
  agree: (index: number, name: string, color: Color) => void
  tabGroup: TabGroup[]
  index: number
}

const color = [
  'grey',
  'blue',
  'red',
  'yellow',
  'green',
  'pink',
  'purple',
  'cyan'
] as Color[]

const ChangeTabGroupDialog = (props: Props) => {
  const { open, disagree, agree, tabGroup, index } = props

  const [inputGroupName, setInputGroupName] = useState<string>(
    tabGroup[index].tabGroupName
  )
  const [selectedColor, setSelectedColor] = useState<string>(
    tabGroup[index].tabColor
  )

  useEffect(() => {
    setInputGroupName(tabGroup[index].tabGroupName)
    setSelectedColor(tabGroup[index].tabColor)
  }, [tabGroup[index].tabGroupName])

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        data-testid='delete-dialog'>
        <DialogTitle id='alert-dialog-title'>{'変更画面'}</DialogTitle>
        <DialogContentText id='alert-dialog-description' ml={2}>
          以下を変更して変更ボタンを押してください
        </DialogContentText>
        <DialogContent>
          <Stack direction='row' spacing={5}>
            <TextField
              id='groupName'
              type='text'
              name='groupName'
              value={inputGroupName}
              label='グループ名'
              variant='outlined'
              onChange={(e) => setInputGroupName(e.target.value)}
            />

            <FormControl sx={{ width: 200 }}>
              <InputLabel id='simple-select-label'>Color</InputLabel>
              <Select
                value={selectedColor}
                label='Color'
                onChange={(e) => setSelectedColor(e.target.value)}>
                {color.map((color: Color) => {
                  return (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={disagree}>Cancel</Button>
          <Button
            onClick={() =>
              agree(index, inputGroupName, selectedColor as Color)
            }>
            変更
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChangeTabGroupDialog
