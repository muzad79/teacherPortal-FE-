import React, { useEffect, useState } from "react";
import DataTable from "../components/Table";
// import DashboardHeader from "@/app/components/DashboardHeader";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Form from "../components/Form";
import { FormDialogue } from "../components/FormDialogue";


const Page = () => {
  const route = `${import.meta.env.VITE_BASE_URL}/teacher/add_student`; // Use VITE_BASE_URL
  const deleteRoute = `${import.meta.env.VITE_BASE_URL}/teacher/delete_student`; // Use VITE_BASE_URL
  const inputFields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter Name",
    },
    {
      label: "Subject",
      name: "subject",
      type: "text",
      placeholder: "Enter Subject",
    },
    {
      label: "Marks",
      name: "marks",
      type: "text",
      placeholder: "Enter Marks",
    },
  ];
  const values = {
    name: "",
    subject: "",
    marks:""
    
  };
  const [data, setData] = useState([]);
  let token = localStorage.getItem("token")
  let config1 = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Add other headers as needed
    },
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        let res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/teacher/get_students`,
          config1
        );
        setData(res?.data.data || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
        setData([]);
      }
    };
    getData();
  }, []);

  const columns = [
    { id: "name", label: "Name", sortable: true },
    { id: "subject", label: "Subject", sortable: true },
    { id: "marks", label: "Marks", sortable: false },
  ];

  

  return (
    <div className="p-10  flex flex-col items-center">
    <div>
      <DataTable
        rows={data}
        columns={columns}
        route={"/dashboard/departments"}
        deleteRoute={deleteRoute}
        inputFields={inputFields}
      />

      <div className="mt-8">
        <Button variant="contained" onClick={handleClickOpen}>
          Add
        </Button>
      </div>
      <FormDialogue inputFields={inputFields} values={values} open={open} handleClose={handleClose} route={route} name={"Add Student"} type={"add"}/>
    </div>
    </div>
  );
};

export default Page;
