import React, { useEffect, useState } from "react";
import { Box ,Typography , Button } from "@mui/material";
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import FileSelector from "../Components/fileselector";
import { getReceipts } from "../api/Receipt";



function ReceiptFinder() {


    const navigate = useNavigate()
    const theme = useTheme();

    const [data, setData] = useState(null);
    const [selectedFile, setSelectedFile] = useState('');

    const handleConfirm = (file) => {
        setSelectedFile(file);
    };

   

  const handleConfirmButtonClick = async () => {
    if (selectedFile) {
        const response = await getReceipts(selectedFile)
        setData(response)
    } else {
      alert('Please select a file before confirming.');
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
        height : data ? 'auto' : 247
       
    }}>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
             Receipt Finder
        </Typography>
        </Box>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        paddingTop:'4%' ,
        
         }}
    >
            <FileSelector onConfirm={handleConfirm} />
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
    </Box>
    )
}

export default ReceiptFinder;
