import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { TabGroup } from "../../dao/chrome_storage_access";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TabGroupTable = (props: any) => {
  const tabGroups = props.tabGroup as TabGroup[];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>タブ名</TableCell>
            <TableCell align="right">タブ色</TableCell>
            <TableCell align="right">url</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabGroups.map((tabGroup) => (
            <TableRow
              key={tabGroup.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {tabGroup.tabGroupName}
              </TableCell>
              <TableCell align="right">{tabGroup.tabColor}</TableCell>
              <TableCell align="right">{tabGroup.urls}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabGroupTable;
