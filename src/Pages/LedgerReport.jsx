import React, { useEffect, useState } from "react";
import { Box ,Typography } from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import { getLedgerReport } from "../api/LedgerReport";
import LedgerTable from "../Components/LedgerTable";


function LedgerReport() {


    const navigate = useNavigate()
    const theme = useTheme();

  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      
      const responseData = await getLedgerReport(); 
      setData(responseData); 
    } catch (error) {
      // Handle error if needed
    }
  };
  useEffect(() => {

    fetchData(); 
  }, []);

  

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
            Ledger Report
        </Typography>
        </Box>
        <LedgerTable data = { data }  nav = 'MainAppFormDetails'  isPayment = {false} />
    </Box>
    )
}

export default LedgerReport;
