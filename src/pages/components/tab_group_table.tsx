import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TabGroup } from "../../dao/chrome_storage_access";
import { styled } from "@mui/material/styles";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TabGroupTable = (props: any) => {
  const tabGroup = props.tabGroup as TabGroup[];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="right">タブ名</StyledTableCell>
            <StyledTableCell align="right">タブの色</StyledTableCell>
            <StyledTableCell align="right">URL</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {tabGroup.map((tab) => (
            <StyledTableRow
              key={tab.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {tab.tabGroupName}
              </StyledTableCell>
              <StyledTableCell align="right">{tab.tabColor}</StyledTableCell>
              <List sx={style} component="nav" aria-label="mailbox folders">
                <ListItem button>
                  <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button divider>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Trash" />
                </ListItem>
                <Divider light />
                <ListItem button>
                  <ListItemText primary="Spam" />
                </ListItem>
              </List>
              <StyledTableCell align="right">
                {tab.urls.map((url) => {
                  return <p>{url}</p>;
                })}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabGroupTable;
