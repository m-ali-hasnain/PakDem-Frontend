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

import { registerInvestor } from './Apis/RegistrationApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreateInvestor() {

  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()

  const initialValues = {
    Date : null,
    Name : null ,
    CNICNo : null ,
    SpouseName : null ,
    CompanyName : null,
    CompanyAddress : null ,
    OfficeNo : null ,
    ContactNo : null,
    Email : null ,
    RegistrationAs : "2",
    UserName : null,
    Password : null
  }
  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        Name: Yup.string().required("Name is required!"),
        UserName: Yup.string().required("User Name is required!"),
        Password: Yup.string().required("Password is required!"),

      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });




  const handleClick = async () => {
  
      if (values.Name && values.UserName && values.Password ) { 
       
       
            const submission =   registerInvestor(
                                                values.Date,
                                                values.Name,
                                                values.CNICNo,
                                                values.SpouseName,
                                                values.CompanyName,
                                                values.CompanyAddress,
                                                values.OfficeNo,
                                                values.ContactNo,
                                                values.Email,
                                                values.RegistrationAs,
                                                values.UserName,
                                                values.Password,
                                        )
                if(submission) {

                alert('New Investor is Registered')
                navigate('/Home')

                }
                else {
                alert('Technical Error')
                }
        
        
       
    }
      
      else{
        alert("Please fill all required fields")
      }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', 
            backgroundColor: theme.palette.secondary.background,
              alignItems: 'center', width: '100%' , pb : '2%' , 
              paddingTop : { lg: '4%', md: '6%', sm: '8%', xs: '6%' }
     }}>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>
          {data ? "Edit " : "Create "} Investor 
        </Typography>
      </Box>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{padding:'2%' , paddingBottom: 1}}>

        <Grid item lg={12} md={12} sm={12} xs={12}
          
          >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Box>
                    <Box>
                      <DatePicker
                        name='Date'
                        id="Date"
                        value={values.Date}
                        onChange={(value) => setFieldValue("Date", value, true)}
                        onBlur={handleBlur}
                        label="Date" />
                    </Box>
                    
                  </Box>
                  
                  
                </DemoContainer>
              </LocalizationProvider>
          </Grid>
        
        <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Name"
                    color='secondary'
                    name='Name'
                    value={values.Name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.Name && touched.Name ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.Name}</p>
            ) : null}
        </Grid>

         <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="CNIC No"
                    color='secondary'
                    name='CNICNo'
                    value={values.CNICNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              
        </Grid> 

        <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Spouse Name"
                    color='secondary'
                    name='SpouseName'
                    value={values.SpouseName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />

        </Grid> 

        <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Company Name"
                    color='secondary'
                    name='CompanyName'
                    value={values.CompanyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />

        </Grid> 


        <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Company Address"
                    color='secondary'
                    name='CompanyAddress'
                    value={values.CompanyAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              
        </Grid> 
   

        <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Office No"
                    color='secondary'
                    name='OfficeNo'
                    value={values.OfficeNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              
        </Grid> 

        <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Contact No"
                    color='secondary'
                    name='ContactNo'
                    value={values.ContactNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              
        </Grid> 

        <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Email"
                    color='secondary'
                    name='Email'
                    value={values.Email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              
        </Grid> 


          
        <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="User Name"
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

        <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Password"
                    color='secondary'
                    name='Password'
                    value={values.Password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              {errors.Password && touched.Password ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.Password}</p>
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

export default CreateInvestor;
