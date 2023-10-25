import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import {Grid} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import DataTable from "./Table";
import { Container } from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import { getApplicationFormRecord } from "../api/MainAppFrom";


export default function MultipleFileSelector() {
  const [fields, setFields] = useState([""]);
  

  const navigate = useNavigate()
    const theme = useTheme();

    const [data, setData] = useState(null);

  const handleAddField = () => {
    setFields([...fields, ""]);
    
  };

  const handleRemoveField = (index) => {
    const filteredFields = fields.filter((_, i) => i !== index);
    setFields(filteredFields);
    
  };

  const handleClick = async () => {
    if (fields[0] !== "") {
        console.log(fields)
        const res = await getApplicationFormRecord(fields)
        setData(res)

    } else {
      alert('Please type atleast 1 file');
    }
  }

  return (
    <Grid container spacing={2} sx={{padding:'2%'}}>

        
      {fields.map((field, index) => (
        <Grid item lg={2} md={3} sm={4} xs={12}>
          <TextField
            value={field}
            onChange={(e) => {
              const updatedFields = [...fields];
              updatedFields[index] = e.target.value;
              setFields(updatedFields);
            }}
            label="File No"
            
          />
          <IconButton onClick={() => handleRemoveField(index)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      ))}
      <Button variant="contained" onClick={handleAddField} 
           sx={{ mx: {lg :3 , md : 3 , sm : 3 , xs : 'auto'} ,mb:5, mt:3, padding:1 }}>
        Add File No
      </Button>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Button
               onClick={handleClick}
                sx = {{
                    color: theme.palette.secondary.text,
                    backgroundColor: theme.palette.secondary.main,
                    fontWeight: 'bold',
                    boxShadow: 10,
                    my: 3,
                    ':hover': {
                        backgroundColor: theme.palette.secondary.hoverButton,
                        color: theme.palette.secondary.main,
                    },
                    border: 1,
                    borderRadius: 2,
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingTop: 1,
                    paddingBottom: 1,
                    borderColor: theme.palette.secondary.Button,
                }}>
        Get Record
        </Button>
      </Grid>

      {data && (<DataTable data = { data }  nav = 'Payments' isPayment = {true} />)}
  
    </Grid>
  );
}