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

import { registerAgent } from './Apis/RegistrationApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreateAgent() {

  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()

  const initialValues = {
    Date : null,
    Name : '' ,
    CNICNo :  '' ,
    FatherName :  '' ,
    CompanyName :  '',
    CompanyAddress :  '' ,
    OfficeNo :  '' ,
    Phone :  '',
    Email :  '' ,
    CommissionPercentage: '',
    DownPaymentCommission: '',
    InstallmentCommission: '',
    OpeningBalance: '',
    OpeningDate :  ''
  }
  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        Name: Yup.string().required("Name is required!"),
        CommissionPercentage: Yup.number().nullable(),
        DownPaymentCommission: Yup.number().nullable(),
        InstallmentCommission: Yup.number().nullable(),
        OpeningBalance: Yup.number().nullable(),

      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
         
      },
    });




  const handleClick = async () => {
  
    if (
        (values.CommissionPercentage !== '' && isNaN(values.CommissionPercentage)) ||
        (values.DownPaymentCommission !== '' && isNaN(values.DownPaymentCommission)) ||
        (values.InstallmentCommission !== '' && isNaN(values.InstallmentCommission)) ||
        (values.OpeningBalance !== '' && isNaN(values.OpeningBalance))
      ) {
        alert('Commission values must be numbers');
      }
    else if(values.Name === ''){
        alert('Name cannot be empty')
    } 
      
    else{
        const submission =   registerAgent(
                                    values.Date,
                                    values.Name,
                                    values.CNICNo,
                                    values.FatherName,
                                    values.CompanyName,
                                    values.CompanyAddress,
                                    values.OfficeNo,
                                    values.Phone,
                                    values.Email,
                                    values.CommissionPercentage,
                                    values.DownPaymentCommission,
                                    values.InstallmentCommission,
                                    values.OpeningBalance,
                                    values.OpeningDate,
                )
            if(submission) {
            alert('New Agent is Registered')
            navigate('/Agents')
            }
            else {
            alert('Technical Error')
            }
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
          {data ? "Edit " : "Create "} Agent
        </Typography>
      </Box>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{padding:'2%' , paddingBottom: 1}}>

        <Grid item lg={6} md={6} sm={6} xs={12}
          
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


          <Grid item lg={6} md={6} sm={6} xs={12}
          
          >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Box>
                    <Box>
                      <DatePicker
                        name='OpeningDate'
                        id="OpeningDate"
                        value={values.OpeningDate}
                        onChange={(value) => setFieldValue("OpeningDate", value, true)}
                        onBlur={handleBlur}
                        label="Opening Balance Date" />
                    </Box>
                    
                  </Box>
                  
                  
                </DemoContainer>
              </LocalizationProvider>
          </Grid>
        
        <Grid item lg={3} md={3} sm={6} xs={12}>
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

         <Grid item lg={3} md={3} sm={6} xs={12}>
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

        <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Father Name"
                    color='secondary'
                    name='FatherName'
                    value={values.FatherName}
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
                    label="Phone"
                    color='secondary'
                    name='Phone'
                    value={values.Phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
              
        </Grid> 

        <Grid item lg={3} md={3} sm={6} xs={12}>
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

        <Grid item lg={3} md={3} sm={6} xs={12}>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-multiline-flexible"
            label="Commission Percentage"
            color="secondary"
            name="CommissionPercentage"
            value={values.CommissionPercentage}
            onChange={handleChange}
            onBlur={(e) => {
              if (e.target.value !== '') setFieldValue('CommissionPercentage', parseFloat(e.target.value));
              else setFieldValue('CommissionPercentage', '');
            }}
          />
          {errors.CommissionPercentage && touched.CommissionPercentage ? (
            <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
            {errors.CommissionPercentage === 'Commission Percentage should be a number'
                ? 'Commission Percentage should be a number'
                : 'Commission Percentage should be a number'}
            </p>
        ) : null}
        </Grid>

          
 

        <Grid item lg={3} md={3} sm={6} xs={12}>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-multiline-flexible"
            label="Down Payment Commission"
            color="secondary"
            name="DownPaymentCommission"
            value={values.DownPaymentCommission}
            onChange={handleChange}
            onBlur={(e) => {
              if (e.target.value !== '') setFieldValue('DownPaymentCommission', parseFloat(e.target.value));
              else setFieldValue('DownPaymentCommission', '');
            }}
          />
          {errors.DownPaymentCommission && touched.DownPaymentCommission ? (
            <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
            {errors.DownPaymentCommission === 'Down Payment Commission should be a number'
                ? 'Down Payment Commission should be a number'
                : 'Down Payment Commission should be a number'}
            </p>
        ) : null}
        </Grid>

        <Grid item lg={3} md={3} sm={6} xs={12}>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-multiline-flexible"
            label="Installment Commission"
            color="secondary"
            name="InstallmentCommission"
            value={values.InstallmentCommission}
            onChange={handleChange}
            onBlur={(e) => {
              if (e.target.value !== '') setFieldValue('InstallmentCommission', parseFloat(e.target.value));
              else setFieldValue('InstallmentCommission', '');
            }}
          />
          {errors.InstallmentCommission && touched.InstallmentCommission ? (
            <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
            {errors.InstallmentCommission === 'Installment Commission should be a number'
                ? 'Installment Commission should be a number'
                : 'Installment Commission should be a number'}
            </p>
        ) : null}
        </Grid>

        <Grid item lg={3} md={3} sm={6} xs={12}>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-multiline-flexible"
            label="Opening Balance"
            color="secondary"
            name="OpeningBalance"
            value={values.OpeningBalance}
            onChange={handleChange}
            onBlur={(e) => {
              if (e.target.value !== '') setFieldValue('OpeningBalance', parseFloat(e.target.value));
              else setFieldValue('OpeningBalance', '');
            }}
          />
          {errors.OpeningBalance && touched.OpeningBalance ? (
            <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
            {errors.OpeningBalance === 'Opening Balance should be a number'
                ? 'Opening Balance should be a number'
                : 'Opening Balance should be a number'}
            </p>
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

export default CreateAgent;
