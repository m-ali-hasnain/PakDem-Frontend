import React, { useEffect, useState } from "react";
import { Box ,Typography , Button } from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import AgentSelectorID from "../Components/AgentSelectorID";
import { getAgentVouchers } from "../api/Agents";



function Fake() {


    const navigate = useNavigate()
    const theme = useTheme();

    const [data, setData] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState('');

    const handleConfirm = (Agent) => {
        setSelectedAgent(Agent);
    };

   

  const handleConfirmButtonClick = async () => {
    if (selectedAgent) {
        console.log(selectedAgent)
        

    } else {
      alert('Please select a Agent before confirming.');
    }
  };

  const GrandTotal = data?.reduce((sum, item) => sum + item.Amount, 0)

  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' },
        height : data ? 'auto' : 247,
        paddingBottom:'1%'
       
    }}>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
             Agent Vouchers
        </Typography>
        </Box>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        paddingTop:'1%' ,
        
         }}
    >
            <AgentSelectorID onConfirm={handleConfirm} />
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
            onClick={handleConfirmButtonClick}>Get Record</Button>
        </Box>
        <DataTable data = { data }  nav = 'Payments' isPayment = {true} />
        {data && 
        <Box sx={{padding:'1%'}}>
            <Typography variant = "h4" sx={{fontFamily:'sans-serif' , fontWeight:'bold'}}>
                Grand Total
            </Typography>
            <Typography variant = "h5">
                Rs. {GrandTotal}
            </Typography>
        </Box>
        }
    </Box>
    )
}

export default Fake;
