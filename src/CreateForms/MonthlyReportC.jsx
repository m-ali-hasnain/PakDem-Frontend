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

import { MonthlyReport } from './Apis/MonthlyReportApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreateMonthlyReport() {

  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()

  const initialValues = data === undefined ? {
    Date : null,
    Total_Received_Amount : null,
    Office_Expence : null
  } : {
    Date : null
  }

  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        Total_Received_Amount: Yup.number().nullable(),
        Office_Expence : Yup.number().nullable(),
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });




  const handleClick = async () => {
  
      if (values.Total_Received_Amount != '' && !isNaN(values.Total_Received_Amount) &&
            values.Office_Expence != '' && !isNaN(values.Office_Expence) 
        ) { 
       
       
            const submission =   await MonthlyReport(
                                        values.Date,
                                        values.Total_Received_Amount,
                                        values.Office_Expence
                                        
                                        )
                if(submission) {

                alert('Monthly Report created')
                navigate('/MonthlyReport')

                }
                else {
                alert('Error Creating Monthly Report')
                }
        
        
       
    }
      
      else{
        alert("Please Follow required Fields correctly")
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
          {data ? "Edit " : "Create "} Monthly Report
        </Typography>
      </Box>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{padding:'2%'}}>

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

        <Grid item lg={5} md={6} sm={6} xs={12}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
          <TextField
                        sx={{ width: '80%' }}
                        id="outlined-multiline-flexible"
                        label="Total Received Amount"
                        color="secondary"
                        name="Total_Received_Amount"
                        value={values.Total_Received_Amount}
                        onChange={handleChange}
                        onBlur={(e) => {
                        if (e.target.value !== '') setFieldValue('Total_Received_Amount', parseFloat(e.target.value));
                        else setFieldValue('Total_Received_Amount', '');
                        }}
                    />
                    {errors.Total_Received_Amount && touched.Total_Received_Amount ? (
                        <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
                        {errors.Total_Received_Amount === 'Total Received Amount should be a number'
                            ? 'Total Received Amount should be a number'
                            : 'Total Received Amount should be a number'}
                        </p>
                    ) : null}
        </Grid>

        <Grid item lg={5} md={6} sm={6} xs={12}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
          <TextField
                        sx={{ width: '80%' }}
                        id="outlined-multiline-flexible"
                        label="Office Expence"
                        color="secondary"
                        name="Office_Expence"
                        value={values.Office_Expence}
                        onChange={handleChange}
                        onBlur={(e) => {
                        if (e.target.value !== '') setFieldValue('Office_Expence', parseFloat(e.target.value));
                        else setFieldValue('Office_Expence', '');
                        }}
                    />
                    {errors.Office_Expence && touched.Office_Expence ? (
                        <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
                        {errors.Office_Expence === 'Office Expence should be a number'
                            ? 'Office Expence should be a number'
                            : 'Office Expence should be a number'}
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

export default CreateMonthlyReport;
