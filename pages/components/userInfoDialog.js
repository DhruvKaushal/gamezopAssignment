import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export function SpecificUserInfoDialog(props) {
  const { onClose, open, user } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
    <div style={{padding:'10px'}}>
    <DialogTitle style={{textAlign:'center'}}><b>User Info for {user.name}</b></DialogTitle>
      <List sx={{ pt: 2 }}>
        <ListItemText primary={`ID: ${user.id}`} />
        <ListItemText primary={`Name: ${user.name}`} />
        <ListItemText primary={`User Name: ${user.username}`} />
        <ListItemText primary={`Email: ${user.email}`} />
        <ListItemText primary={`Address: ${user.address.street} ${user.address.suite} ${user.address.city} - ${user.address.zipcode}`} />
      </List>
    </div>
      
    </Dialog>
  );
}

SpecificUserInfoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
