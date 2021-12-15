import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";

const DeleteAlert = (props: any) => {
  const { open, disagree, agree } = props;

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        data-testid="delete-dialog"
      >
        <DialogTitle id="alert-dialog-title">{"確認"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            本当に削除しても良いですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={disagree}>Cancel</Button>
          <Button onClick={agree} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteAlert;
