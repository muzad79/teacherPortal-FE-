import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function AlertDialog({text,allow,deny,title,id,deleteRoute}) {
  let token = localStorage.getItem("token")
  let config1 = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Add other headers as needed
    },
  };
 const [open,setOpen]= React.useState(true)
 const handleClose=()=>{
    setOpen(false)
 }
 const handleDelete=async ()=>{
  try{
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
   let res= await axios.delete(`${deleteRoute}/${id}`,config1)
    if(res.status == 200 || res.status == 201){
      toast.success(res?.data?.message,{autoClose:2000})
      window.location.reload();
    }
  }
  catch(err){
    console.log(err)
    toast.error("something went wrrong")
  }

  
  setOpen(false)
}

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{deny}</Button>
          <Button onClick={handleDelete} autoFocus>
            {allow}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}