import * as React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export function SpecificUserInfoDialog(props) {
  const { onClose, open, user } = props;
  const handleClose = () => {
    onClose();
  };
  const {street, suite, city, zipcode} = user.address;

  return (
    <Dialog onClose={handleClose} open={open}>
    <div style={{padding:'15px'}}>
    <DialogTitle style={{textAlign:'center'}}><b>User Info for {user.name}</b></DialogTitle>
      <List sx={{ pt: 2 }}>
        <ListItemText primary={`ID: ${user.id}`} />
        <ListItemText primary={`Name: ${user.name}`} />
        <ListItemText primary={`User Name: ${user.username}`} />
        <ListItemText primary={`Email: ${user.email}`} />
        <ListItemText primary={`Address: ${street} ${suite} ${city} - ${zipcode}`} />
        <ListItemText primary={`Phone: ${user.phone}`} />
        <ListItemText primary={`Website: ${user.website}`} />
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
