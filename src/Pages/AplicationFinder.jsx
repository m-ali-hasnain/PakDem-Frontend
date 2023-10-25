import React, { useEffect, useState } from "react";
import { Box ,Typography , Button } from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";

import MultipleFileSelector from "../Components/MultipleFileSelector";
import { getApplicationFormRecord } from "../api/MainAppFrom";



function ApplicationFormRecord() {


    const navigate = useNavigate()
    const theme = useTheme();

    const [data, setData] = useState(null);
   

  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' },
        height : data ? 'auto' : '50%'
       
    }}>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 ,mb:'1%' }}>
             Application Record Multiple Files
        </Typography>
        </Box>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        paddingTop:'2%'
         }}
    >
            <MultipleFileSelector  />
            
        </Box>
        {data && (<DataTable data = { data }  nav = 'Payments' isPayment = {true} />)}
    </Box>
    )
}

export default ApplicationFormRecord;
