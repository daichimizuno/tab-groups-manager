import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  Divider,
  IconButton,
  Paper,
  TableContainer,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect, useState } from "react";
import { TabGroup } from "../../../dao/chrome_storage_access";
import DeleteAlert from "../alerts/delete_alert";

const TabGroupTable = (props: any) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const tabGroups = props.tabGroup as TabGroup[];
  const deleteTabGroup = props.deleteTabGroup;

  useEffect(() => {}, [tabGroups]);

  const showDialog = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const _deleteTabGroup = () => {
    setOpenDialog(false);
    if (selected.length > 0) {
      deleteTabGroup(selected);
    }
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <>
      <DeleteAlert
        open={openDialog}
        disagree={() => closeDialog()}
        agree={() => _deleteTabGroup()}
      />
      <TableContainer component={Paper} style={{ marginBottom: 30 }}>
        {selected.length !== 0 ? (
          <IconButton
            style={{ float: "right", marginRight: 30 }}
            color="primary"
            aria-label="delete tab"
            component="span"
            onClick={() => showDialog()}
          >
            <DeleteIcon />
          </IconButton>
        ) : (
          <div></div>
        )}

        <Table>
          <TableHead>
            <TableRow hover>
              <TableCell style={{ minWidth: 100 }} align="center">
                <h3>削除</h3>
              </TableCell>
              <TableCell style={{ minWidth: 300 }} align="center">
                <h3>タブグループ名</h3>
              </TableCell>
              <TableCell style={{ minWidth: 200 }} align="center">
                <h3>タブ色</h3>
              </TableCell>
              <TableCell align="center">
                <h3>URL</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tabGroups.map((tabGroup, index) => {
              const isItemSelected = isSelected(tabGroup.tabGroupName);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  onClick={(e) => handleClick(e, tabGroup.tabGroupName)}
                  role="checkbox"
                  key={tabGroup.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell padding="checkbox" align="center">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    align="center"
                  >
                    <h4>{tabGroup.tabGroupName}</h4>
                  </TableCell>
                  <TableCell align="center">
                    <h4>{tabGroup.tabColor}</h4>
                  </TableCell>
                  <TableCell>
                    {tabGroup.urls.map((url) => {
                      return (
                        <div key={url}>
                          <h5>{url}</h5>
                          <Divider />
                        </div>
                      );
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TabGroupTable;
