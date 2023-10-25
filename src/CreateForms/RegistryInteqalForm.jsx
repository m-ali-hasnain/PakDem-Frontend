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

import { updateRegistryInteqal } from '../api/RegistryInteqal';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function RegistryInteqalForm({ApplicationNo}) {

  
  const theme = useTheme()
  const navigate = useNavigate()

  const initialValues =  {
         registry_Ineqal_Charges : '',
         Registry_Date : null,
         Registry_Number : '',
         Inteqal_Number : '',
         inteqal_date : null
  } 
  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        registry_Ineqal_Charges: Yup.number().required("Registry_Inteqal_Charges is required!"),
        Registry_Number: Yup.number().required("Inteqal_Charges is required!"),
        Inteqal_Number: Yup.number().required("Registry_Charges is required!"),

        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
        
      },
    });




  const handleClick = async () => {
  
      if (
            values.registry_Ineqal_Charges !== '' && !isNaN(values.registry_Ineqal_Charges)
        ) { 
       
       
           if 
            (   (values.Registry_Number !== '' && 
                !isNaN(values.Registry_Number))
                             || 
                (   values.Inteqal_Number !== '' && 
                !isNaN(values.Inteqal_Number)
                )
            )
           
           {
             const submission =   updateRegistryInteqal(
                                                 ApplicationNo,
                                                 values.registry_Ineqal_Charges,
                                                 values.Registry_Date,
                                                 values.Registry_Number,
                                                 values.Inteqal_Number,
                                                 values.inteqal_date
                                         )
                 if(submission) {
 
                 alert('Registy/Inteqal Created')
                 navigate('/RegistryInteqal')
 
                 }
                 else {
                 alert('Technical Error')
                 }
         
           }
           else{
                alert('Please add Registry Number or Inteqal Number')
           }
        
       
    }
      
      else{
        alert("Please Enter proper Registry Inteqal Charges")
      }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', 
            backgroundColor: theme.palette.secondary.background,
              alignItems: 'center', width: '100%' , pb : '4%' , 
             
     }}>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{padding:'2%'}}>

        <Grid item lg={6} md={6} sm={6} xs={12}
          
          >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Box>
                    <Box>
                      <DatePicker
                        name='Registry_Date'
                        id="Registry_Date"
                        value={values.Registry_Date}
                        onChange={(value) => setFieldValue("Registry_Date", value, true)}
                        onBlur={handleBlur}
                        label="Registry Date" />
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
                        name='inteqal_date'
                        id="inteqal_date"
                        value={values.inteqal_date}
                        onChange={(value) => setFieldValue("inteqal_date", value, true)}
                        onBlur={handleBlur}
                        label="Inteqal Date" />
                    </Box>
                    
                  </Box>
                  
                  
                </DemoContainer>
              </LocalizationProvider>
        </Grid>


          

          <Grid item lg={4} md={4} sm={6} xs={12}>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-multiline-flexible"
            label="Registry Inteqal Charges"
            color="secondary"
            name="registry_Ineqal_Charges"
            value={values.registry_Ineqal_Charges}
            onChange={handleChange}
            onBlur={(e) => {
              if (e.target.value !== '') setFieldValue('registry_Ineqal_Charges', parseFloat(e.target.value));
              else setFieldValue('registry_Ineqal_Charges', '');
            }}
          />
          {errors.registry_Ineqal_Charges && touched.registry_Ineqal_Charges ? (
            <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
            {errors.registry_Ineqal_Charges === 'Registry Inteqal Charges should be a number'
                ? 'Registry Inteqal Charges should be a number'
                : 'Registry Inteqal Charges should be a number'}
            </p>
        ) : null}
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12}>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-multiline-flexible"
            label="Registry Number"
            color="secondary"
            name="Registry_Number"
            value={values.Registry_Number}
            onChange={handleChange}
            onBlur={(e) => {
              if (e.target.value !== '') setFieldValue('Registry_Number', parseFloat(e.target.value));
              else setFieldValue('Registry_Number', '');
            }}
          />
          {errors.Registry_Number && touched.Registry_Number ? (
            <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
            {errors.Registry_Number === 'Registry Number should be a number'
                ? 'Registry number should be a number'
                : 'Registry number should be a number'}
            </p>
        ) : null}
        </Grid>


        <Grid item lg={4} md={4} sm={6} xs={12}>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-multiline-flexible"
            label="Inteqal Number"
            color="secondary"
            name="Inteqal_Number"
            value={values.Inteqal_Number}
            onChange={handleChange}
            onBlur={(e) => {
              if (e.target.value !== '') setFieldValue('Inteqal_Number', parseFloat(e.target.value));
              else setFieldValue('Inteqal_Number', '');
            }}
          />
          {errors.Inteqal_Number && touched.Inteqal_Number ? (
            <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
            {errors.Inteqal_Number === 'Inteqal Number should be a number'
                ? 'Inteqal number should be a number'
                : 'Inteqal number should be a number'}
            </p>
        ) : null}
        </Grid>


            <Box sx={{  alignSelf: 'flex-end' , mx:'auto' , my:'2%'}}>
                <Button type='submit' onClick={() => { handleClick() }}
                  variant="contained" color="secondary" endIcon={<CreateIcon fontSize='large' />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                    Save
                </Button>
            </Box>
           
            
            </Grid>
        </form>

      </Box>
    </Box>
  );
}

export default RegistryInteqalForm;
