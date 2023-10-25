import React , {useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import {Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

import { createVoucher } from './Apis/VoucherApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreateVoucher() {
  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()

  const [user, setUser] = React.useState('')

  const [selectedFile, setSelectedFile] = useState('');

    const handleConfirm = (file) => {
        setSelectedFile(file);
    };


  


  const initialValues =   {
    Date: null,
    FileNo: null,
    description : "",
    Amount : null,
    Agent : "",
    VoucherNo: ""
    
  } 

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        FileNo: Yup.number().required("File No is required!"),
       
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });

 


  const handleClick = async () => {
    

   

    

  
      
      if ((values.FileNo || selectedFile) ) { 
            
    
        if(values.FileNo){
            var File = values.FileNo
       } 
       else{
            var File = selectedFile
       }

          const submission = await createVoucher(
                                                    File,
                                                    values.Date,
                                                    values.Agent,
                                                    values.Amount,
                                                    values.description,
                                                    null,
                                                    null,
                                                    null,
                                                    values.VoucherNo
                                                )
          
            if(submission) {
              alert('Voucher created')
              navigate('/Home')
            }
            else{
              alert('Technical Error')
            }
       
    }
      
      else{
        alert("Please fill required fields")
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
          {data ? "Edit " : "Create "} Voucher
        </Typography>
      </Box>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        
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
                      label="Voucher Date" />
                  </Box>
                  
                </Box>
                
                
              </DemoContainer>
            </LocalizationProvider>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <AgentSelectorID
              
              onConfirm={(selectedAgentID) => {
                setFieldValue("Agent", selectedAgentID);
              }}
            />
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
          <FileSelector onConfirm={handleConfirm} />
        </Grid>


        <Grid item lg={4} md={4} sm={12} xs={12}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
             <Typography >
                - or Type -
            </Typography>
             <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="File No*"
                color='secondary'
                name='FileNo'
                value={values.FileNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />{!selectedFile && errors.FileNo && touched.FileNo ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.FileNo}</p>
              ) : null}
        </Grid>
  
          <Grid item lg={4} md={4} sm={6} xs={12}>
          <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Receieved Amount"
                color='secondary'
                name='Amount'
                value={values.Amount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>  

          <Grid item lg={4} md={4} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="description"
                color='secondary'
                 name='description'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="VoucherNo"
                color='secondary'
                 name='VoucherNo'
                value={values.VoucherNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>

            <Box sx={{ width: {lg: '15%' , sm:'70%'}, marginTop: 4, alignSelf: 'flex-end' , mx:'auto' }}>
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

export default CreateVoucher;
