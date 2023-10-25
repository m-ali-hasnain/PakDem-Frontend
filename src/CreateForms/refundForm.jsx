import React , {useState } from 'react';
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

import { createRefund } from './Apis/Refund';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function RefundForm( { ApplicationNo , Total_Paid_Amount}) {

  
  const theme = useTheme()
  const navigate = useNavigate()

  const initialValues =  {
    Remarks : null,
    ModeofPayment : null,
    Installment : null,
    CompanyPercentage : '',
    Date : null,
  } 

  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        CompanyPercentage: Yup.number().required("Company Percentage is required!")
      
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });




  const handleClick = async () => {
  
      if (
            values.CompanyPercentage !== '' && !isNaN(values.CompanyPercentage)
        ) { 

          const RefundAmount = Total_Paid_Amount * ((100 - values.CompanyPercentage) / 100)
       
       
            const submission =   createRefund(
                                                ApplicationNo,
                                                values.Date,
                                                RefundAmount,
                                                values.Installment,
                                                values.ModeofPayment,
                                                values.Remarks
                                        )
                if(submission) {

                    alert('Refund Created')
                    navigate('/RefundSchedule')

                }
                else {
                alert('Technical Error')
                }
        
        
       
    }
      
      else{
        alert("Company Percentage should be valid")
      }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', 
            backgroundColor: theme.palette.secondary.background,
              alignItems: 'center', width: '100%' , pb : '4%' , 
             
     }}>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>
          Refund Details
        </Typography>
      </Box>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{padding:'2%'}}>

        <Grid item lg={12} md={12} sm={6} xs={12}
          
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
                        label="Refund Date" />
                    </Box>
                    
                  </Box>
                  
                  
                </DemoContainer>
              </LocalizationProvider>
        </Grid>



          <Grid item lg={4} md={4} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="No. of Months to Refund Amount"
                color='secondary'
                name='Installment'
                value={values.Installment}
                onChange={handleChange}
                onBlur={handleBlur}
              />
             
          </Grid>
          

        <Grid item lg={4} md={4} sm={6} xs={12}>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-multiline-flexible"
            label="Company Percentage"
            color="secondary"
            name="CompanyPercentage"
            value={values.CompanyPercentage}
            onChange={handleChange}
            onBlur={(e) => {
              if (e.target.value !== '') setFieldValue('CompanyPercentage', parseFloat(e.target.value));
              else setFieldValue('CompanyPercentage', '');
            }}
          />
          {errors.CompanyPercentage && touched.CompanyPercentage ? (
            <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
            {errors.CompanyPercentage === 'Company Percentage should be a number'
                ? 'Company Percentage should be a number'
                : 'Company Percentage should be a number'}
            </p>
        ) : null}
        </Grid>


          <Grid item lg={4} md={4} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Remarks"
                color='secondary'
                name='Remarks'
                value={values.Remarks}
                onChange={handleChange}
                onBlur={handleBlur}
              />
             
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Mode of Payment"
                color='secondary'
                name='ModeofPayment'
                value={values.ModeofPayment}
                onChange={handleChange}
                onBlur={handleBlur}
              />
                
          </Grid>

 
       
          <Grid item lg={6} md={6} sm={6} xs={12} sx={{mx:'auto'}}>
            <Box sx={{  alignSelf: 'flex-end' , mx:'auto' , my:'2%'}}>
                <Button type='submit' onClick={() => { handleClick() }}
                  variant="contained" color="secondary" endIcon={<CreateIcon fontSize='large' />} sx={{ width: '50%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                  Refund
                </Button>
            </Box>
            </Grid>
           
            
            </Grid>
        </form>

      </Box>
    </Box>
  );
}

export default RefundForm;
