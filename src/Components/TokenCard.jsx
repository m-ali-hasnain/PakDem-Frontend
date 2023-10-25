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

import CreateIcon from '@mui/icons-material/Create';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DeleteMainAppform } from '../CreateForms/Apis/MainAppFormApi';
import { deletePlot ,deletePlotPrice } from '../CreateForms/Apis/PlotsApi';
import LinearWithValueLabel from './Loader';
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import { updateTokenReceipt } from '../api/Receipt';
import { LayersClearTwoTone } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TokenCard({ data ,nav ,edit = true,  isExp }) {

    

  if (!data || Object.keys(data).length === 0) {
    return <Box
            sx={{
              width: '90%',
              mx: 'auto',
              pt: '5.4%',
              pb: '5.4%',
            }}
          >
            <Typography>Loading Data...</Typography>
            <LinearWithValueLabel />
          </Box>;
  }

  const navigate = useNavigate()
  

  const handleEdit = () => {
    setShowdetails(false)
  };


  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('type');
  
    console.log(data)
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

  const [showDetails, setShowdetails] = useState(true)

  const keys = Object.keys(data);

  // Helper function to format keys
  const formatKey = (key) => {
    const words = key.split('_');
    const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedWords.join(' ');
  };

  const initialValues = {
    
    downPayment: '',

  }
  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        downPayment: Yup.number().nullable(),


      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
         
      },
    });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {

    if(values.downPayment != '' && !isNaN(values.downPayment)){
        const totalPayment = values.downPayment + data.Received_Amount
        const responseData = await updateTokenReceipt(
                                    data.Id,data.Receipt_No,totalPayment)
        if(responseData) {
           alert('Token Money Updated')
           navigate(`/ReceiptDetails/${responseData.Id}`);
        }
    }
    else{
        alert("Down Payment can't be null")
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
    {showDetails && <Card
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
        <Grid container spacing={2}>
          {isAdmin && (
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: { sm: 'flex-end', xs: 'center' }, mt: 1 }}
            >
              {
              edit && (
                <>
                <Button
                variant="outlined"
                color="primary"
                sx={{
                  mr: { lg: 2, md: 2, sm: 1, xs: 1 },
                }}
                onClick={handleEdit}
              >
                Update Token
              </Button>
              </>
              )}
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
      </Card>}
    {
        !showDetails && 
        <Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} sx={{padding:'2%' , paddingBottom: 1}}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        id="outlined-multiline-flexible"
                        label="Down Payment"
                        color="secondary"
                        name="downPayment"
                        value={values.downPayment}
                        onChange={handleChange}
                        onBlur={(e) => {
                        if (e.target.value !== '') setFieldValue('downPayment', parseFloat(e.target.value));
                        else setFieldValue('downPayment', '');
                        }}
                    />
                    {errors.downPayment && touched.downPayment ? (
                        <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>
                        {errors.downPayment === 'Down Payment should be a number'
                            ? 'Down Payment should be a number'
                            : 'Down Payment Percentage should be a number'}
                        </p>
                    ) : null}
                    </Grid>
                    <Box sx={{  alignSelf: 'flex-end' , mx:'auto' , my:'5%'}}>
                        <Button type='submit' onClick={() => { handleClick() }}
                        variant="contained" color="secondary" endIcon={<CreateIcon fontSize='large' />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                            Update
                        </Button>
                    </Box>
                </Grid>
            </form>
        </Box>
    }
    </Box>
  );
}
