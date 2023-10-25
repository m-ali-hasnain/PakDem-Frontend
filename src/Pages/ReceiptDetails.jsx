import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import {Button} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getSingleReceipt } from '../api/Receipt';
import GetCard from '../Components/Card';
import PrintIcon from '@mui/icons-material/Print';

function ReceiptDetails () {

    const navigate = useNavigate()
    const theme = useTheme();
    
    const location = useLocation();

    const id = location.pathname.split('/').pop();
    const [data , setData] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
          try {        
            const responseData = await getSingleReceipt(id); // Call the function to get the data
            setData(responseData); // Set the data in the state
          } catch (error) {
            // Handle error if needed
          }
        };
    
        fetchData(); // Call the async function to fetch and set the data
      }, []);
      

    
  


    return (
        <Box
          sx={{
            display: 'flex',
            backgroundColor: theme.palette.secondary.background,
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: { lg: '4%', md: '6%', sm: '15%', xs: '8%' },
            
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding:'1%'
            }}
          >
            <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
              Receipt Details
            </Typography>
            {data && <Box sx= {{display:'flex' , justifyContent: "flex-end" , mr:"6%"}}>
              <Button onClick={() => navigate('/PrintRecipt', { state: { id: data.Id } } )} variant='contained' >
                    Print <PrintIcon sx={{ml:1}} />
              </Button>
            </Box>}
            
          </Box>
          
          <GetCard data={data} nav='Receipt' isExp={true} />
        </Box>
      );
            }

export default ReceiptDetails;
