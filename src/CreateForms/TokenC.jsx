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

import { createToken } from './Apis/TokenApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreateTokenMoney() {

  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()

  const [selectedFile, setSelectedFile] = useState(null);

  const handleConfirm = (file) => {
      setSelectedFile(file);
  };



  


  const initialValues = data === undefined ? {
    FileNo : null,
    Total_Installment : null,
    ApplicantName : null,
    FatherOrHusband : null,
    CNICNo: null,
    ContactNo : null,
    PermanentAddress : null,
    Nok : null,
    TotalAmount : null,
    ReceivedAmount : null,
    AmountReceivedForPlot : null,
    ModeOfPayment : null,
    Prepaired_By : null,
    Prepaired_by_Name : null,
    Remarks : null,
  } : {
    Date : null
  }

  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        FileNo: Yup.string().required("File No is required"),
        ApplicantName: Yup.string().required("Please Enter the ApplicantName"),
        TotalAmount: Yup.number().required("Total Amount is required!"),
        ReceivedAmount: Yup.number().required("Receieved Amount is required!"),
        ModeOfPayment : Yup.string().ensure().required("Mode of Payment is required required!"),
      
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });




  const handleClick = async () => {
  
      if (
          values.FileNo && values.ApplicantName && values.TotalAmount 
            && values.ReceivedAmount && values.ModeOfPayment 
        ) { 

          const UserID = localStorage.getItem("UserID")

         
       
       
            const submission =   await createToken(
                                        values.FileNo,
                                        values.Total_Installment,
                                        values.ApplicantName,
                                        values.FatherOrHusband,
                                        values.CNICNo,
                                        values.ContactNo,
                                        values.PermanentAddress,
                                        values.Nok,
                                        values.TotalAmount,
                                        values.ReceivedAmount,
                                        values.AmountReceivedForPlot,
                                        values.ModeOfPayment,
                                        UserID,
                                        values.Prepaired_by_Name,
                                        values.Remarks,
                                        )
                if(submission) {

                alert('Token Money Created')
                navigate('/Home')

                }
                else{
                  alert('Error Creating Token Money')
                }
    }
      
      else{
        alert("Please fill required Fields")
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
          {data ? "Edit " : "Create "} Token Money
        </Typography>
      </Box>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{padding:'2%'}}>
          <Grid item lg={4} md={4} sm={6} xs={12}>
                <TextField sx={{  width: '100%' }}
                  id="outlined-multiline-flexible"
                  label="File No *"
                  color='secondary'
                  name='FileNo'
                  value={values.FileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />{errors.FileNo && touched.FileNo ? (
                  <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.FileNo}</p>
                ) : null}
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{ width: '100%' }}
              id="outlined-multiline-flexible"
              label="Applicant Name *"
              color='secondary'
              name='ApplicantName'
              value={values.ApplicantName}
              onChange={handleChange}
              onBlur={handleBlur}

            />{errors.ApplicantName && touched.ApplicantName ? (
              <p style={{ color: 'red', marginLeft: 4, marginBottom: 0, marginTop: 0 }}>{errors.ApplicantName}</p>
            ) : null}
 
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{ width: '100%' }}
              id="outlined-multiline-flexible"
              label="Father Or Husband *"
              color='secondary'
              multiline
              name='FatherOrHusband'
              value={values.FatherOrHusband}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Nok *"
                color='secondary'
                name='Nok'
                value={values.Nok}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Total Amount *"
                color='secondary'
                name='TotalAmount'
                value={values.TotalAmount}
                onChange={handleChange}
                onBlur={handleBlur}
              />{errors.TotalAmount && touched.TotalAmount ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.TotalAmount}</p>
              ) : null}
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Received Amountt *"
                color='secondary'
                name='ReceivedAmount'
                value={values.ReceivedAmount}
                onChange={handleChange}
                onBlur={handleBlur}
              />{errors.ReceivedAmount && touched.ReceivedAmount ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ReceivedAmount}</p>
              ) : null}
          </Grid>
            <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{ width: '100%' }}
              id="outlined-multiline-flexible"
              label="Total Installments *"
              color='secondary'
              name='Total_Installment'
              value={values.Total_Installment}
              onChange={handleChange}
              onBlur={handleBlur}

            />
 
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
                label="Prepaired By"
                color='secondary'
                name='Prepaired_by_Name'
                value={values.Prepaired_by_Name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Phone No"
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
                label="Amount Received For Plot"
                color='secondary'
                name='AmountReceivedForPlot'
                value={values.AmountReceivedForPlot}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>

          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TextField sx={{ width: '100%' }}
              id="outlined-multiline-flexible"
              label="Permanent Address *"
              color='secondary'
              multiline
              name='PermanentAddress'
              value={values.PermanentAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            </Grid>

            <Grid item lg={4} md = {4} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Mode of Payment*</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Mode Of Payment*"
                color='secondary'
                name='ModeOfPayment'
                value={values.ModeOfPayment}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Cash"}>Cash</MenuItem>
                <MenuItem value={"Installments"}>Installments</MenuItem>
                <MenuItem value={"CA"}>CA</MenuItem>
               
              </Select>
          </FormControl>
          {errors.ModeOfPayment && touched.ModeOfPayment ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ModeOfPayment}</p>
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

export default CreateTokenMoney;
