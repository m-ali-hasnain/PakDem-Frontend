import React, { useEffect, useState } from "react";
import { Box ,Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import { getDevelopmentReciept } from "../api/Receipt";


function DevelopmentReceipt() {


    const navigate = useNavigate()
    const theme = useTheme();

  const [data, setData] = useState(null);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        
        const responseData = await getDevelopmentReciept(); // Call the function to get the data
        setData(responseData); // Set the data in the state
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData(); // Call the async function to fetch and set the data
  }, []);

  console.log(data); // Now data should have the response data from Axios

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
             Development Charges Receipt
        </Typography>
        </Box>
        <DataTable data = { data }  nav = 'ReceiptDetails'  isPayment = {false} />
    </Box>
    )
}

export default DevelopmentReceipt;
