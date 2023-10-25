import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DeleteMainAppform } from '../CreateForms/Apis/MainAppFormApi';
import { deletePlot ,deletePlotPrice } from '../CreateForms/Apis/PlotsApi';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TransferCard({ data ,nav ,edit = true,  isExp }) {
  if (!data || Object.keys(data).length === 0) {
    return <div>No data available.</div>;
  }

  const navigate = useNavigate()
  

  const handleEdit = () => {
    navigate(`/Create/${nav}`, { state: { data: data } });
  };


  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('type');
  
    if (userType == null) {
      setisAdmin(false);
    } else if (userType == 1) {
      setisAdmin(true);
    } else if (userType == 2) {
      setisAdmin(false);
    } else if (userType == 3) {
      setisAdmin(false);
    } else if (userType == 4) {
      setisAdmin(true);
    }

  }, []);

  const keys = Object.keys(data);

  // Helper function to format keys
  const formatKey = (key) => {
    const words = key.split('_');
    const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedWords.join(' ');
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const UserID = localStorage.getItem('UserID')

    if(nav == 'Main')
    {
      const applicationNo = data.ApplicationNo
      const success = await DeleteMainAppform(UserID , applicationNo)
      if(success){
        navigate('/MainAppForm');
      }
      handleClose()
    }
    else if(nav == 'Plot'){
      const PlotID = data.PlotID
      const success = await deletePlot(PlotID)
      if(success){
        navigate('/AllPlots');
      }
      handleClose()
    }
    else if(nav == 'PlotPrice'){
      const PlotPriceID = data.PlotPriceID
      const success = await deletePlotPrice(PlotPriceID)
      if(success){
        navigate('/PlotPrices');
      }
      handleClose()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
    
      <Card
        sx={{
          display: 'flex',
          padding: '2%',
          maxWidth: '85%',
          mb: '3%',
          border: '1 solid white',
          borderRadius: 10,
          boxShadow: 10,
        }}
      >
        <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent:  'center' , mt: 1 }}
            >
             <Typography variant='h4'>
                    {edit ? "" : "Previous "} Client Details
                </Typography>
            </Grid>
          
          {keys.map((key, index) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={key}>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '1%',
                }}
              >
                <Typography
                  sx={{ fontFamily: 'sans-serif', fontSize: 16, fontWeight: 'bold', mb: 1 }}
                  color="text.secondary"
                >
                  {formatKey(key)}:
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  {data[key]}
                </Typography>
              </CardContent>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
