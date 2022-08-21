import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import Switch from '@mui/material/Switch';
import { SpecificUserInfoDialog } from "./userInfoDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UserTable({ data, topUser }) {
    const router = useRouter();
  const [rows, setRows] = useState(data);
  const [searched, setSearched] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [topUsers, setTopUsers] = useState(Array(data.length).fill(false));
  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };
  useEffect(()=>{
    const topUsersFromLocal = JSON.parse(localStorage.getItem("topUsers"));
    topUsersFromLocal ? setTopUsers(topUsersFromLocal) : setTopUsers(Array(data.length).fill(false))
    localStorage.setItem('users', JSON.stringify(data));
    console.log(topUsers)
  }, [])

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

  const setTopUser = (event, index) => {
    event.stopPropagation();
    let tempTopUsers = topUsers;
    tempTopUsers[index] = !tempTopUsers[index];
    setTopUsers(tempTopUsers);
    localStorage.setItem("topUsers", JSON.stringify(topUsers));
    router.push('/users');
  };
  const onToggleClick = (event, index) => {
    event.stopPropagation();
  }
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
                {!topUser && <TableCell>
                  <b>Top User?</b>
                </TableCell>}
                {!topUser && <TableCell>
                  <b>Disable User</b>
                </TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.id} onClick={() => handleClickOpen(row)}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  {console.log(topUsers[index])}
                  {!topUser &&<TableCell>
                    <input
                      type="checkbox"
                      id="isTopUser"
                      checked={topUsers[index] ? 'checked' : ''}
                      onClick={(e) => setTopUser(e, index)}
                    />
                  </TableCell>}
                  {!topUser &&
                  <TableCell><Switch color="warning" onClick={(e) => onToggleClick(e, index)}/></TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <br />
      {open && (
        <SpecificUserInfoDialog
          open={open}
          onClose={handleClose}
          user={selectedUser}
        />
      )}
    </>
  );
}
