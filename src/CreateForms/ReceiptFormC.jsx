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

import { createReceipt, updateReceipt } from './Apis/ReceiptApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreateReceipt() {
  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()

  const [user, setUser] = React.useState('')

  const [selectedFile, setSelectedFile] = useState('');

    const handleConfirm = (file) => {
        setSelectedFile(file);
    };

   
  
  


  const initialValues = data === undefined ?  {
    Date: null,
    FileNo: null,
    Amount_For_The_Month_Of: null,
    ReceiptType : null,
    CommAmount : null,
    ReceiptCategory : "",
    ReceiptStatus : "",
    ModeOfPayment : "",
    ReceievedAmount : null,
    Agent : "",
    Remarks : "",
    Online_Method : null,
    Method_ID : null
  } :
  {
    Date:  null,
    FileNo: data.File_No ,
    Amount_For_The_Month_Of: data.Amount_For_The_Month_Of,
    ReceiptType : data.Receipt_Type,
    CommAmount : data.Commission_Amount,
    ReceiptCategory : data.Receipt_Catgory,
    ReceiptStatus : data.Receipt_Status ,
    ModeOfPayment : data.Mode_Of_Payment,
    ReceievedAmount : data.Received_Amount    ,
    Agent : data.Agent_ID,
    Remarks : data.Remarks,
    Online_Method : data.Online_Method,
    Method_ID : data.Method_ID
    
  }


  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        FileNo: Yup.number().required("File No is required!"),
        ReceievedAmount: Yup.number().required("Receieved Amount is required!"),
        ReceiptType : Yup.string().ensure().required("Receipt Type is required required!"),
        ModeOfPayment : Yup.string().ensure().required("Mode of Payment is required required!"),
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });

 
    const labelStyle = {
      color: values.ReceiptStatus === 'Paid' ? 'green' : values.ReceiptStatus === 'UnPaid' ? 'blue' : 'black',
    };
  

  const handleClick = async () => {
    

   

    

    const UserID = localStorage.getItem("UserID")

  
      
      if (
        (values.FileNo || selectedFile) 
        && values.ReceievedAmount && 
        values.ReceiptType && values.ModeOfPayment) { 
            
        const ReceivedDifferenceAmount = null    
        const ReceivedFrom = null
        if(values.FileNo){
            var File = values.FileNo
       } 
       else{
            var File = selectedFile
       }



        if(data) {

         const submission = await updateReceipt(
                                                UserID,
                                                data.Id,                                                
                                                data.Receipt_No,
                                                values.FileNo,
                                                values.Date  ,
                                                values.ReceievedAmount ,
                                                ReceivedDifferenceAmount  ,
                                                ReceivedFrom ,
                                                values.Amount_For_The_Month_Of  ,
                                                '1' ,
                                                values.ModeOfPayment,
                                                null,
                                                null ,
                                                null   ,
                                                null     ,
                                                UserID ,
                                                'Unknown',
                                                values.Remarks     ,
                                                null    ,
                                                values.ReceiptCategory  ,
                                                values.ReceiptStatus  ,
                                                null  ,
                                                values.Agent  ,
                                                null ,
                                                values.CommAmount,
                                                null ,
                                                values.ReceiptType 
                                                )
            
            if(submission) {
            alert('Receipt Updated')
            navigate(`/ReceiptDetails/${data.Id}`);
            }
            else{
            alert('Technical Error')
            }
        }
        else {

             
           
          
        
          const submission = await createReceipt(
            UserID,
            File,
            values.Date  ,
            values.ReceievedAmount ,
            ReceivedDifferenceAmount  ,
            ReceivedFrom ,
            values.Amount_For_The_Month_Of  ,
            '1' ,
            values.ModeOfPayment,
            null,
            null ,
            null   ,
            null     ,
            UserID ,
            'Unknown',
            values.Remarks     ,
            null    ,
            values.ReceiptCategory  ,
            values.ReceiptStatus  ,
            null  ,
            values.Agent  ,
            null ,
            values.CommAmount,
            null ,
            values.ReceiptType ,
            values.Online_Method,
            values.Method_ID                        )
          
            if(submission) {
              alert('Receipt created')
              navigate('/Home')
            }
            else{
              alert('Technical Error')
            }
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
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>{data ? "Edit " : "Create "} Receipt</Typography>
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
                      label="Date" />
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
  
          <Grid item lg={3} md={3} sm={6} xs={12}>
          <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Receieved Amount*"
                color='secondary'
                name='ReceievedAmount'
                value={values.ReceievedAmount}
                onChange={handleChange}
                onBlur={handleBlur}
              />{errors.ReceievedAmount && touched.ReceievedAmount ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ReceievedAmount}</p>
              ) : null}
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{ width: '100%' }}
              id="outlined-multiline-flexible"
              label="Amount For the Month Of"
              color='secondary'
              name='Amount_For_The_Month_Of'
              value={values.Amount_For_The_Month_Of}
              onChange={handleChange}
              onBlur={handleBlur}

            />{errors.Amount_For_The_Month_Of && touched.Amount_For_The_Month_Of ? (
              <p style={{ color: 'red', marginLeft: 4, marginBottom: 0, marginTop: 0 }}>{errors.Amount_For_The_Month_Of}</p>
            ) : null}
 
            </Grid>

            <Grid item lg={3} md = {3} sm = {6} xs={12}>
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
                <MenuItem value={"Online"}>Online</MenuItem>
                <MenuItem value={"CA"}>CA</MenuItem>
               
              </Select>
          </FormControl>
          {errors.ModeOfPayment && touched.ModeOfPayment ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ModeOfPayment}</p>
            ) : null}
          </Grid>

          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Online Method</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Online Method"
                color='secondary'
                name='Online_Method'
                value={values.Online_Method}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Transaction ID"}>Transaction ID</MenuItem>
                <MenuItem value={"Slip ID"}>Slip ID</MenuItem>
                <MenuItem value={"Sequence ID "}>Sequence ID </MenuItem>
                <MenuItem value={"Cross Cheque No"}>Cross Cheque No</MenuItem>
                <MenuItem value={"Other ID"}>Other ID</MenuItem>
               
              </Select>
          </FormControl>
          
          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="ID"
                color='secondary'
                name='Method_ID'
                value={values.Method_ID}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>

          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Receipt Category</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Receipt Category"
                color='secondary'
                name='ReceiptCategory'
                value={values.ReceiptCategory}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Down Payment"}>Down Payment</MenuItem>
                <MenuItem value={"Installments"}>Installments</MenuItem>
                <MenuItem value={"Full Cash"}>Full Cash</MenuItem>
                <MenuItem value={"Registry Fee"}>Registry Fee</MenuItem>
                <MenuItem value={"Transfer Fee"}>Transfer Fee</MenuItem>
                <MenuItem value={"Development Charges"}>Development Charges</MenuItem>
              </Select>
          </FormControl>
          </Grid>


          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Receipt Type</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Receipt Type"
                color='secondary'
                name='ReceiptType'
                value={values.ReceiptType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"1"}>Regular Receipt</MenuItem>
                <MenuItem value={"2"}>Transfer Receipt</MenuItem>
                <MenuItem value={"3"}>Dev Charges Receipt</MenuItem>
              </Select>
            </FormControl>
            {errors.ReceiptType && touched.ReceiptType ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.ReceiptType}</p>
            ) : null}
          </Grid>

          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width:'100%'}}>
              <InputLabel >Receipt Status</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Receipt Status"
                color='secondary'
                name='ReceiptStatus'
                value={values.ReceiptStatus}
                style={labelStyle}
                onChange={handleChange}
                onBlur={handleBlur}
                
              >
                <MenuItem value={"Paid"}>Paid</MenuItem>
                <MenuItem value={"UnPaid"}>Un Paid</MenuItem>
              </Select>
            </FormControl>

          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
              <TextField sx={{  width: '100%' }}
                id="outlined-multiline-flexible"
                label="Commission Paid To Agent"
                color='secondary'
                name='CommAmount'
                value={values.CommAmount}
                onChange={handleChange}
                onBlur={handleBlur}
              />
          </Grid>          

          <Grid item lg={3} md={3} sm={6} xs={12}>
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

export default CreateReceipt;
