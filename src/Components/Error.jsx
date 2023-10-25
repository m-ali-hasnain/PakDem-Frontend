import React, { useEffect, useState } from "react";
import { Box ,Typography,Button } from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";



function ErrorScreen() {


    const navigate = useNavigate()
    const theme = useTheme();

    const currentURL = window.location.href;



  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '14%', xs: '6%' },
       
    }}>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h2" sx={{ flexGrow: 1 ,mt:'1%' , mb:'2%' , color : 'red' }}>
             404 Not found
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1 , mb:'2%' , color : 'red' }}>
             No Such Page exists with url : {currentURL}
        </Typography>
        <Typography variant="h6" sx={{ flexGrow: 1, mb:'2%' }}>
            Please check the url and try again
        </Typography>
        <Button variant='contained' 
            onClick={() => navigate('/Home')}
            sx={{mb:'2.5%' ,padding:1}}>
            Back to Home
        </Button>
        </Box>
        
    </Box>
    )
}

export default ErrorScreen;
