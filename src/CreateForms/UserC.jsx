import React , {useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import {Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FileSelector from '../Components/fileselector';
import CreateIcon from '@mui/icons-material/Create';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import { useEffect } from "react";
import AgentSelectorID from '../Components/AgentSelectorID';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { createUser } from './Apis/UserApi';



function CreateUser() {

  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()

 
  


  const initialValues =  {
    UserName : null,
    Password : null,
    RolesID : null 
  }

  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        UserName: Yup.string().required("User Name is required!"),
        Password: Yup.string().required("Password is required!"),
        RolesID : Yup.string().ensure().required("Role is required required!"),
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });




  const handleClick = async () => {
  
      if (values.UserName && values.Password && values.RolesID ) { 
       
       
            const submission =  await createUser(
                values.UserName, values.Password, values.RolesID 
                                        )
                if(submission) {

                alert('User created')
                navigate('/Home')

                }
                else {
                alert('Technical Error')
                }
        
        
       
    }
      
      else{
        alert("Please Fill required Fields")
      }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', 
            backgroundColor: theme.palette.secondary.background,
              alignItems: 'center', width: '100%' , pb : '4%' , 
              paddingTop : { lg: '4%', md: '6%', sm: '8%', xs: '6%' }
     }}>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>
          {data ? "Edit " : "Create "} User
        </Typography>
      </Box>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{padding:'2%'}}>
        <Grid item lg={4} md={4} sm={12} xs={12}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
             <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="User Name*"
                    color='secondary'
                    name='UserName'
                    value={values.UserName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.UserName && touched.UserName ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.UserName}</p>
            ) : null}
                
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
             <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Password*"
                    color='secondary'
                    type="password"
                    name='Password'
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.Password && touched.Password ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.Password}</p>
            ) : null}
                
            </Grid>
            <Grid item lg={4} md = {4} sm = {12} xs={12}>
            <FormControl sx={{width: '100%' }}>
                <InputLabel >Role*</InputLabel>
                <Select
                    id="outlined-multiline-flexible"
                    label="Role*"
                    color='secondary'
                    name='RolesID'
                    value={values.RolesID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <MenuItem value={"2"}>Staff</MenuItem>
                    <MenuItem value={"3"}>Cashier</MenuItem>
                    <MenuItem value={"4"}>Finance Manager</MenuItem>
                
                </Select>
            </FormControl>
            {errors.ModeOfPayment && touched.ModeOfPayment ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ModeOfPayment}</p>
                ) : null}
            </Grid>


          

       
            <Box sx={{  alignSelf: 'flex-end' , mx:'auto' , my:'2%'}}>
                <Button type='submit' onClick={() => { handleClick() }}
                  variant="contained" color="secondary" endIcon={<CreateIcon fontSize='large' />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                  {data ? "Update" : "Create"}
                </Button>
            </Box>
           
            
            </Grid>
        </form>

      </Box>
    </Box>
  );
}

export default CreateUser;
