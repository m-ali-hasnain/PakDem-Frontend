import React, { useEffect, useState } from "react";
import { Box ,Typography , Button } from "@mui/material";
import { useTheme } from '@emotion/react';
import { Formik, Form } from 'formik';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import { getMainAppform } from "../api/Tracking";
import dayjs from 'dayjs';
import SingleDateSelector from "../Components/SingleDate";


function MainFormTracking() {


    const navigate = useNavigate()
    const theme = useTheme();

  const [data, setData] = useState(null);

  const initialValues = {
    starting: null,
  }

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        
        const responseData = await getMainAppform(); // Call the function to get the data
        setData(responseData); // Set the data in the state
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData();
  }, []);



  const getRecord = async (startDate) => {
    try {
        
      const responseData = await getCAPayment(startDate); // Call the function to get the data
      setData(responseData); // Set the data in the state
    } catch (error) {
      // Handle error if needed
    }
  }

  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' },
       
    }}>
      <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
            Main Application Form Tracking
        </Typography>



        </Box>
        <DataTable data = { data }  nav = 'Payments' isPayment = {true} />
    </Box>
    )
}

export default MainFormTracking;
