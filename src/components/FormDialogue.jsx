import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Form from "../components/Form";
import React, { useEffect,useState } from "react";
import axios from 'axios'



export function FormDialogue(props) {
    const { open,values,inputFields,handleClose,route ,name,type} = props;
   

    return (
      <Dialog
        onClose={handleClose}
        open={open}
      >
        {/* <DialogTitle>Add Student</DialogTitle> */}
        <div className="w-80">
        <Form
          method={"post"}
          values={values}
          type={name}
          route={route}
          inputFields={inputFields}
          isAuthPage={false}
          
        />
        </div>
        
      </Dialog>
    );
  }