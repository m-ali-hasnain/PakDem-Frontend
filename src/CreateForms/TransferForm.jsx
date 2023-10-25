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

import { updateTransfer } from '../api/Transfer';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function TransferForm({ApplicationNo}) {

  
  const theme = useTheme()
  const navigate = useNavigate()





  


  const initialValues =  {
    ApplicantName : null,
    FatherOrHusband : null,
    CNICNo : null,
    ContactNo : null,
    Nok : null,
    NokSRelation : null,
    TransferAmount : '',
    Date : null,
  } 
  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        ApplicantName: Yup.string().required("Applicant Name is required!"),
        TransferAmount: Yup.number().required("Transfer Amount is required!"),
        Nok : Yup.string().required("Nok is required!"),
        FatherOrHusband :  Yup.string().required("Father/Husband is required!"),
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
        
      },
    });




  const handleClick = async () => {
  
      if (
        values.ApplicantName && values.FatherOrHusband &&
            values.Nok && values.TransferAmount !== '' && !isNaN(values.TransferAmount)
        ) { 
       
       
            const submission =   updateTransfer(
                                                ApplicationNo,
                                                values.ApplicantName,
                                                values.FatherOrHusband,
                                                values.CNICNo,
                                                values.ContactNo,
                                                values.Nok,
                                                values.NokSRelation,
                                                values.TransferAmount,
                                                values.Date,
                                        )
                if(submission) {

                alert('Transfer File Created')
                navigate('/TransferFiles')

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
             
     }}>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>
          Current Client Details
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
                        label="Transfer Date" />
                    </Box>
                    
                  </Box>
                  
                  
                </DemoContainer>
              </LocalizationProvider>
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Applicant Name"
                color='secondary'
                name='ApplicantName'
                value={values.ApplicantName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.ApplicantName && touched.ApplicantName ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ApplicantName}</p>
            ) : null}
          </Grid>
          

          <Grid item lg={4} md={4} sm={6} xs={12}>
          <TextField
            sx={{ width: '100%' }}
            id="outlined-multiline-flexible"
            label="Transfer Amount"
            color="secondary"
            name="TransferAmount"
            value={values.TransferAmount}
            onChange={handleChange}
            onBlur={(e) => {
              if (e.target.value !== '') setFieldValue('TransferAmount', parseFloat(e.target.value));
              else setFieldValue('TransferAmount', '');
            }}
          />
          {errors.TransferAmount && touched.TransferAmount ? (
            <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
            {errors.TransferAmount === 'Transfer Amount should be a number'
                ? 'Transfer Amount should be a number'
                : 'TransferAmount should be a number'}
            </p>
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

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Father Or Husband"
                color='secondary'
                name='FatherOrHusband'
                value={values.FatherOrHusband}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.FatherOrHusband && touched.FatherOrHusband ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.FatherOrHusband}</p>
            ) : null}
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Nok"
                color='secondary'
                name='Nok'
                value={values.Nok}
                onChange={handleChange}
                onBlur={handleBlur}
              />
                {errors.Nok && touched.Nok ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.Nok}</p>
            ) : null}
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Relation to Nok"
                color='secondary'
                name='NokSRelation'
                value={values.NokSRelation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>

        

       

          

       
            <Box sx={{  alignSelf: 'flex-end' , mx:'auto' , my:'2%'}}>
                <Button type='submit' onClick={() => { handleClick() }}
                  variant="contained" color="secondary" endIcon={<CreateIcon fontSize='large' />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                  Transfer
                </Button>
            </Box>
           
            
            </Grid>
        </form>

      </Box>
    </Box>
  );
}

export default TransferForm;
