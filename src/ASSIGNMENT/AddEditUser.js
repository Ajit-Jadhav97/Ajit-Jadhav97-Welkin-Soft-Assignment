import React from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import UserForm from "./UserForm";

const AddEditUser = ({ open, handleClose, operation, ...props }) => {
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle> {operation == "edit" ? "Edit" : "Add"} User</DialogTitle>
        <DialogContent>
          <UserForm
            operation={operation}
            handleClose={handleClose}
            {...props}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEditUser;
