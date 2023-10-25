import React, { useEffect, useState } from "react";
import { Box ,Typography , Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import {Grid} from '@mui/material';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import FileSelector from "../Components/fileselector";
import { getCAPayment , getPaymentSchedule } from "../api/Payments";
import { useFormik } from "formik";
import * as Yup from "yup";



function PaymentSchedule() {


    const navigate = useNavigate()
    const theme = useTheme();

    const [data, setData] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');

    const handleConfirm = (file) => {
        setSelectedFile(file);
    };

    
  const initialValues =   {
    FileNo: null
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

   

  const handleConfirmButtonClick = async () => {
    if (selectedFile || values.FileNo) {
        if(selectedFile){
        const response = await getPaymentSchedule(selectedFile)
        setData(response)
        }
        else if(values.FileNo){
            if(isNaN(values.FileNo)){
                alert("File should be a number")
            }
            else{
                const response = await getPaymentSchedule(values.FileNo)
                setData(response)
            }
            
        }
    } else {
      alert('Please select or Type a file before confirming.');
    }
  };



  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' },
        height : data ? 'auto' : '80vh'
       
    }}>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
             Payment Schedule
        </Typography>
        </Box>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        paddingTop:'4%' ,
        
         }}
    >
        <form onSubmit={handleSubmit}>
        <Grid container >

        <Grid item lg={2}  /> 
        <Grid item lg={3} md={3} sm={5} xs={12}
        >
            <FileSelector onConfirm={handleConfirm} />
        </Grid>
        <Grid item lg={2} md={4} sm={5} xs={12}
        >
            <Typography variant="h6" sx={{
                    mt:2,
                    mb: {lg :0 , xs:2}
                    }}>
                - Or Type - 
            </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}
        >
            <TextField sx={{ mt:1,  width: {lg : '100%' , md : "85%" , 
                                        sm : "70%" , xs : "60%"} }}
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
        <Grid item lg={2}  /> 
        <Grid item lg={12} md={10} sm={12} xs={12}
        >
            <Button
                sx = {{
                    color: theme.palette.secondary.text,
                    backgroundColor: theme.palette.secondary.main,
                    fontWeight: 'bold',
                    boxShadow: 10,
                    my: 1,
                    ':hover': {
                        backgroundColor: theme.palette.secondary.hoverButton,
                        color: theme.palette.secondary.main,
                    },
                    border: 1,
                    borderRadius: 2,
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingTop: 1,
                    paddingBottom: 1,
                    borderColor: theme.palette.secondary.Button,
                }}
            onClick={handleConfirmButtonClick}>Get Schedule</Button>
        </Grid>
        </Grid>
        </form>
        </Box>
       {data && <DataTable data = { data }  nav = 'Payments' isPayment = {true} />}
    </Box>
    )
}

export default PaymentSchedule;
