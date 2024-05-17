'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import { redirect } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import AlertDialogue from './Dialogue'
import { FormDialogue } from './FormDialogue';
// Custom function to handle sorting
function sortData(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// The DataTable component
export default function DataTable({ rows, columns,route ,deleteRoute,inputFields}) {
  let token = localStorage.getItem('token')
  let config1 = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json", // Add other headers as needed
    },
  };
  const [open, setOpen] = React.useState(false);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [openEdit,setOpenEdit] = useState(false)
  const [values,setValues] = useState({
    name:"",
    subject:"",
    marks:""
})
  let [selectedId,setSelectedId] = useState(null)

  // Handles request to sort
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const handleDelete = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

      const handleEdit = async (id) => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/teacher/get_student/${id}`, config1);
          if (res.status === 200 || res.status === 201) {
            setValues(res.data.data);
            setSelectedId(id);
            setOpenEdit(true);
          }
        } catch (err) {
          console.log(err);
        }
      };

    function handleClose(){
      setOpenEdit(false)
    }
  // Sort rows
  const sortedRows = sortData(rows, getComparator(orderDirection, orderBy));
 
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                className=' font-bold'
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? orderDirection : 'asc'}
                  onClick={() => handleRequestSort(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>{row[column.id]}</TableCell>
              ))}
              <TableCell>
                <IconButton ><ViewIcon /></IconButton>
                <IconButton onClick={()=>handleEdit(row._id)}><EditIcon /></IconButton>
                <IconButton onClick={()=>handleDelete(row._id)}><DeleteIcon /></IconButton>

              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {open&&<AlertDialogue title={"This action will delete data permanantly"} text={"Are You Sure to delete!"} allow={"Delete"} deny={"Cancel"} id={selectedId} deleteRoute={deleteRoute}/>}
      {openEdit&&<FormDialogue inputFields={inputFields} name={"Edit Student"} route={`${import.meta.env.VITE_BASE_URL}/teacher/edit_student/${selectedId}`} type={"edit"} open={openEdit} handleClose={handleClose} values={values}/>}
    </TableContainer>
  );
}
