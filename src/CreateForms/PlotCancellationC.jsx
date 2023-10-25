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

import { createCacellationLetter } from './Apis/PlotsApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreateCancellationLetter() {

  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState(null);

  const handleConfirm = (file) => {
      setSelectedFile(file);
  };



  


  const initialValues = data === undefined ? {
    Date : null,
    AmountNotPaid: null,
    ReasonForCancellation : null,
  } : {
    Date : null
  }

  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        AmountNotPaid: Yup.string().required("Amount Not Paid is required"),
        ReasonForCancellation: Yup.string().required("Reason For Cancellation No is required"),
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });




  const handleClick = async () => {
  
      if (selectedFile && values.AmountNotPaid && values.ReasonForCancellation ) { 
            const submission =   createCacellationLetter(
                                        selectedFile,
                                        values.Date,
                                        values.AmountNotPaid,
                                        values.ReasonForCancellation
                                        )
                if(submission) {

                alert('cacellation Letter created')
                navigate('/PlotCancellation')

                }
                else {
                alert('Technical Error')
                }
        
        
       
    }
      
      else{
        alert("Please fill required field")
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
          {data ? "Edit " : "Create "} Cancellation Letter
        </Typography>
      </Box>
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
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
          <FileSelector onConfirm={handleConfirm} />
        </Grid>

        <Grid item lg={6} md={6} sm={6} xs={12}>
              <TextField sx={{  width: '75%' }}
                id="outlined-multiline-flexible"
                label="Amount Not Paid*"
                color='secondary'
                name='AmountNotPaid'
                value={values.AmountNotPaid}
                onChange={handleChange}
                onBlur={handleBlur}
              />{errors.AmountNotPaid && touched.AmountNotPaid ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.AmountNotPaid}</p>
              ) : null}
          </Grid>
          
          <Grid item lg={6} md={6} sm={6} xs={12}>
              <TextField sx={{  width: '75%' }}
                id="outlined-multiline-flexible"
                label="Reason For Cancellation*"
                color='secondary'
                name='ReasonForCancellation'
                value={values.ReasonForCancellation}
                onChange={handleChange}
                onBlur={handleBlur}
              />{errors.ReasonForCancellation && touched.ReasonForCancellation ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ReasonForCancellation}</p>
              ) : null}
          </Grid>

       
            <Box sx={{  alignSelf: 'flex-end' , mx:'auto' , my:'2%'}}>
                <Button type='submit' onClick={() => { handleClick() }}
                  variant="contained" color="secondary" endIcon={<CreateIcon fontSize='large' />} sx={{  paddingY: 2,paddingX:4, fontSize: 16, fontWeight: 'bold' }}>
                  {data ? "Update" : "Create"}
                </Button>
            </Box>
           
            
            </Grid>
        </form>

      </Box>
    </Box>
  );
}

export default CreateCancellationLetter;
