import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { SpecificUserInfoDialog } from "./userInfoDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UserTable({ data }) {
  const [rows, setRows] = useState(data);
  const [searched, setSearched] = useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const handleClickOpen = (user) => {
    setSelectedUser(user)
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = data.filter((row) => {
      return (
        row.name.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.email.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <Paper>
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>User Name</b>
                </TableCell>
                <TableCell>
                  <b>E-Mail</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} onClick={() => handleClickOpen(row)}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
      <SpecificUserInfoDialog
        open={open}
        onClose={handleClose}
        user={selectedUser}
      />
    </>
  );
}
