import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import {Button} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getPlotAllotmentDetails } from '../api/Plots';
import GetCard from '../Components/Card';

function PlotAllotmentDetails () {

    const navigate = useNavigate()
    const theme = useTheme();
    
    const location = useLocation();

    const id = location.pathname.split('/').pop();
    const [data , setData] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
          try {        
            const responseData = await getPlotAllotmentDetails(id); 
            setData(responseData); 
          } catch (error) {
            // Handle error if needed
          }
        };
    
        fetchData(); 
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
              Plot Allotment Details
            </Typography>

            
          </Box>
          <GetCard data={data} edit = {false} isExp={true} />
        </Box>
      );
            }

export default PlotAllotmentDetails;
