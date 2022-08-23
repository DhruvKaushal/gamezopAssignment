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
import Switch from "@mui/material/Switch";
import { SpecificUserInfoDialog } from "./userInfoDialog";
import styles from "../../styles/global.module.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type tableProps = {
  data: Array<object>;
  topUser: boolean;
};

const UserTable = ({ data, topUser }: tableProps) => {
  const router = useRouter();
  const [rows, setRows] = useState(data);
  const [searched, setSearched] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [topUsers, setTopUsers] = useState(Array(data.length).fill(false));
  const [blockedTimer, setBlockedTimer] = useState(Array(data.length).fill(0));
  const [blockedUsers, setBlockedUsers] = useState(
    Array(data.length).fill(false)
  );

  //Handler for more user details dialog state
  const handleClickOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  /*Here we check the localstorage to see if any prior state exists. 
  If it does then we set the existing states, else we set up a new state*/
  useEffect(() => {
    const topUsersFromLocal = JSON.parse(localStorage.getItem("topUsers"));
    const blockedUsersFromLocal = JSON.parse(
      localStorage.getItem("blockedUsers")
    );
    topUsersFromLocal
      ? setTopUsers(topUsersFromLocal)
      : setTopUsers(Array(data.length).fill(false));
    blockedUsersFromLocal
      ? setBlockedUsers(blockedUsersFromLocal)
      : setBlockedUsers(Array(data.length).fill(false));
    localStorage.setItem("users", JSON.stringify(data));
  }, []);

  //Utility function for search bar
  const requestSearch = (searchedVal: string) => {
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

  //Setting top users
  const setTopUser = (event: any, index: number) => {
    event.stopPropagation();
    let tempTopUsers = topUsers;
    tempTopUsers[index] = !tempTopUsers[index];
    setTopUsers(tempTopUsers);
    localStorage.setItem("topUsers", JSON.stringify(topUsers));
    router.push("/users");
  };

  //Blocking users. Attempt at blocking/unblocking users after 5 minutes. Not functioning properly yet
  const onToggleClick = (event: any, index: number) => {
    event.stopPropagation();
    let tempBlockedUsers = blockedUsers;
    if (tempBlockedUsers[index] == false) {
      let tempBlockedTimer = blockedTimer;
      if (blockedTimer[index] === 0) {
        tempBlockedTimer[index] = setTimeout(() => {
          clearTimeout(tempBlockedTimer[index]);
        }, 30 * 1000);
        setBlockedTimer(tempBlockedTimer);
      } else {
        clearTimeout(tempBlockedTimer[index]);
        tempBlockedTimer[index] = 0;
        setBlockedTimer(tempBlockedTimer);
      }
    } else {
      clearTimeout(blockedTimer[index]);
    }
    tempBlockedUsers[index] = !tempBlockedUsers[index];
    setBlockedUsers(tempBlockedUsers);
    localStorage.setItem("blockedUsers", JSON.stringify(blockedUsers));
    router.push("/users");
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
                {!topUser && (
                  <TableCell>
                    <b>Top User?</b>
                  </TableCell>
                )}
                {!topUser && (
                  <TableCell>
                    <b>Disable User</b>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  className={
                    blockedUsers[index] ? styles.greyedRow : styles.normalRow
                  }
                  key={row.id}
                  onClick={() => handleClickOpen(row)}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  {!topUser && (
                    <TableCell>
                      <input
                        type="checkbox"
                        id="isTopUser"
                        checked={topUsers[index] ? "checked" : ""}
                        onClick={(e) => setTopUser(e, index)}
                      />
                    </TableCell>
                  )}
                  {!topUser && (
                    <TableCell>
                      <Switch
                        color="warning"
                        onClick={(e) => onToggleClick(e, index)}
                        checked={blockedUsers[index]}
                      />
                    </TableCell>
                  )}
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
};

export default UserTable;
