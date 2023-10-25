import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DeleteMainAppform } from '../CreateForms/Apis/MainAppFormApi';
import { deletePlot ,deletePlotPrice } from '../CreateForms/Apis/PlotsApi';
import LinearWithValueLabel from './Loader';
import ReactToPrint from 'react-to-print';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GetCard({ data ,nav ,edit = true,  isExp }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Box
        sx={{
          width: '90%',
          mx: 'auto',
          pt: '5.4%',
          pb: '5.4%',
        }}
      >
        <Typography>Loading Data...</Typography>
        <LinearWithValueLabel />
      </Box>
    );
  }

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/Create/${nav}`, { state: { data: data } });
  };

  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('type');

    if (userType == null) {
      setisAdmin(false);
    } else if (userType == 1 || userType == 4) {
      setisAdmin(true);
    } else {
      setisAdmin(false);
    }
  }, []);

  const keys = Object.keys(data);

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
    const UserID = localStorage.getItem('UserID');

    if (nav === 'Main') {
      const applicationNo = data.ApplicationNo;
      const success = await DeleteMainAppform(UserID, applicationNo);
      if (success) {
        navigate('/MainAppForm');
      }
      handleClose();
    } else if (nav === 'Plot') {
      const PlotID = data.PlotID;
      const success = await deletePlot(PlotID);
      if (success) {
        navigate('/AllPlots');
      }
      handleClose();
    } else if (nav === 'PlotPrice') {
      const PlotPriceID = data.PlotPriceID;
      const success = await deletePlotPrice(PlotPriceID);
      if (success) {
        navigate('/PlotPrices');
      }
      handleClose();
    }
  }

  const componentRef = useRef(null);

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
        <Grid container spacing={2} ref={componentRef}>
          {isAdmin && (
            <Grid
              item
              xs={12}
              className="print-hide"
              sx={{ display: 'flex', justifyContent: { sm: 'flex-end', xs: 'center' }, mt: 1 }}
            >
              {edit && (
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    mr: { lg: 2, md: 2, sm: 1, xs: 1 },
                  }}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              )}
              {!isExp && (
                <>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Delete
                  </Button>
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Are You Sure You Want to Delete?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        Note : You can't undo this operation
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button variant='outlined' color="error" onClick={handleDelete}>Delete</Button>
                    </DialogActions>
                  </Dialog>
                </>
              )}
              {/* <ReactToPrint 
                trigger={() => (
                  <Button variant="outlined" color="primary" sx={{ mb: 1 }}>
                    Print
                  </Button>
                )}
                content={() => componentRef.current}
                documentTitle='new document'
                pageStyle='print'
              /> */}
            </Grid>
          )}
          {keys.map((key, index) => (
            <Grid item lg={4} md={4} sm={6} xs={12} key={key}>
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
      <style>
        {`
          @media print {
            .print-hide {
              display: none !important;
            }
          }
        `}
      </style>
    </Box>
  );
}
