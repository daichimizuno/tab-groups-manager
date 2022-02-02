import DeleteIcon from '@mui/icons-material/Delete'
import {
  Checkbox,
  Divider,
  IconButton,
  Paper,
  TableContainer
} from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import * as React from 'react'
import { useEffect, useState } from 'react'
import ChromeStorageAccess, {
  Color,
  TabGroup
} from '../../../dao/chrome_storage_access'
import DeleteAlert from '../dialogs/delete_alert'
import SettingsIcon from '@mui/icons-material/Settings'
import { makeStyles } from '@mui/styles'
import ChangeTabGroupDialog from '../dialogs/change_tabgroup_dialog'

const tableStyles = makeStyles(() => ({
  container: {
    marginBottom: 30,
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'solid'
  },
  smallCell: {
    minWidth: 100,
    borderRightStyle: 'dashed',
    borderRightColor: 'grey'
  },
  mediumCell: {
    minWidth: 200,
    borderRightStyle: 'dashed',
    borderRightColor: 'grey'
  },
  largeCell: {
    minWidth: 300,
    borderRightStyle: 'dashed',
    borderRightColor: '#grey'
  }
}))

const DialogType = {
  DELETE: 'delete',
  CHANGE_TAB_GROUP: 'change_tab_group'
} as const
type DialogType = typeof DialogType[keyof typeof DialogType]

const TabGroupTable = (props: any) => {
  const chromeStorageAccess = new ChromeStorageAccess()
  const [selected, setSelected] = useState<string[]>([])
  const [tabGroups, setTabGroups] = useState<TabGroup[]>(
    props.tabGroup as TabGroup[]
  )
  const [changeTabGroupSelected, setChangeTabGroupSelected] =
    useState<number>(0)
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [openChangeTabGroupDialog, setOpenChangeTabGroupDialog] =
    useState<boolean>(false)

  const deleteTabGroup = props.deleteTabGroup
  const classes = tableStyles()

  useEffect(() => {}, [tabGroups])

  const showDialog = (type: DialogType, index: number) => {
    if (type === DialogType.DELETE) {
      setOpenDeleteDialog(true)
    } else if (type == DialogType.CHANGE_TAB_GROUP) {
      setChangeTabGroupSelected(index)
      console.log(`changeTabGroupSelected: ${changeTabGroupSelected}`)
      setOpenChangeTabGroupDialog(true)
    }
  }

  const closeDialog = (type: DialogType) => {
    if (type === DialogType.DELETE) {
      setOpenDeleteDialog(false)
    } else if (type == DialogType.CHANGE_TAB_GROUP) {
      setOpenChangeTabGroupDialog(false)
    }
  }

  const _deleteTabGroup = () => {
    setOpenDeleteDialog(false)
    if (selected.length > 0) {
      deleteTabGroup(selected)
    }
  }

  const _changeTabGroup = async (index: number, name: string, color: Color) => {
    console.log(`before tabGroup ${JSON.stringify(tabGroups)}`)
    await chromeStorageAccess.changeTabGroup(index, name, color as Color)
    const newTabGroups = await chromeStorageAccess.getAllTabGroup()
    setTabGroups(newTabGroups)
    console.log(`after tabGroup ${JSON.stringify(tabGroups)}`)

    setOpenChangeTabGroupDialog(false)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  return (
    <>
      <DeleteAlert
        open={openDeleteDialog}
        disagree={() => closeDialog(DialogType.DELETE)}
        agree={() => _deleteTabGroup()}
      />

      <ChangeTabGroupDialog
        open={openChangeTabGroupDialog}
        disagree={() => closeDialog(DialogType.CHANGE_TAB_GROUP)}
        agree={(index, name, color) => _changeTabGroup(index, name, color)}
        tabGroup={tabGroups}
        index={changeTabGroupSelected}
      />

      <TableContainer component={Paper} className={classes.container}>
        {selected.length !== 0 ? (
          <IconButton
            style={{ float: 'right', marginRight: 30 }}
            color='primary'
            aria-label='delete tab'
            component='span'
            onClick={() => showDialog(DialogType.DELETE, 0)}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <div></div>
        )}

        <Table>
          <TableHead>
            <TableRow hover>
              <TableCell className={classes.smallCell} align='center'>
                <h3>削除</h3>
              </TableCell>
              <TableCell className={classes.smallCell} align='center'>
                <h3>設定変更</h3>
              </TableCell>
              <TableCell className={classes.largeCell} align='center'>
                <h3>タブグループ名</h3>
              </TableCell>
              <TableCell className={classes.mediumCell} align='center'>
                <h3>タブ色</h3>
              </TableCell>
              <TableCell align='center'>
                <h3>URL</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabGroups.map((tabGroup, index) => {
              const isItemSelected = isSelected(tabGroup.tabGroupName)
              const labelId = `enhanced-table-checkbox-${index}`
              return (
                <TableRow role='checkbox' key={tabGroup.id}>
                  <TableCell
                    padding='checkbox'
                    align='center'
                    onClick={(e) => handleClick(e, tabGroup.tabGroupName)}
                    className={classes.smallCell}>
                    <Checkbox color='primary' checked={isItemSelected} />
                  </TableCell>

                  <TableCell align='center' className={classes.smallCell}>
                    <IconButton
                      color='primary'
                      onClick={() =>
                        showDialog(DialogType.CHANGE_TAB_GROUP, index)
                      }>
                      <SettingsIcon />
                    </IconButton>
                  </TableCell>

                  <TableCell
                    component='th'
                    id={labelId}
                    scope='row'
                    padding='none'
                    align='center'
                    className={classes.largeCell}>
                    <h4>{tabGroup.tabGroupName}</h4>
                  </TableCell>

                  <TableCell align='center' className={classes.mediumCell}>
                    <h4>{tabGroup.tabColor}</h4>
                  </TableCell>

                  <TableCell>
                    {tabGroup.urls.map((url) => {
                      return (
                        <div key={url}>
                          <h5>{url}</h5>
                          <Divider />
                        </div>
                      )
                    })}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TabGroupTable
