import React, { useEffect, useState } from "react";
import { Box, Button , Typography} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import AgentSelector from "../Components/AgentSelector";
import { getAgentVouchers } from "../api/Agents";



function AgentVouchers() {


    const navigate = useNavigate()
    const theme = useTheme();

    const [data, setData] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState('');

    const handleConfirm = (Agent) => {
        setSelectedAgent(Agent);
    };

   

  const handleConfirmButtonClick = async () => {
    if (selectedAgent) {
        const res = await getAgentVouchers(selectedAgent)
        setData(res)
        

    } else {
      alert('Please select a Agent before confirming.');
    }
  };

  const GrandTotal = data?.reduce((sum, item) => sum + item.Amount, 0)

  const ButtonStyling = {
    alignSelf: 'start' , paddingX :2 , paddingY:1,
    marginLeft:'5%',
    border:'2px solid black',
    justifyContent:'start',
    color:theme.palette.text.primary,
    alignItems:'start',
    ':hover': {
        backgroundColor: theme.palette.secondary.hoverButton,
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main
      },
    }

  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' },
        height : data ? 'auto' : "70vh",
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
        <Button  sx={ButtonStyling}
                onClick={() => navigate('/Create/Voucher')}
            >
            Create Voucher <CreateIcon sx={{ml:1}} />
        </Button>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        paddingTop:'1%' ,
        
         }}
    >
            <AgentSelector onConfirm={handleConfirm} />
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
        {data && <DataTable data = { data }  nav = 'Payments' isPayment = {true} />}
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

export default AgentVouchers;
