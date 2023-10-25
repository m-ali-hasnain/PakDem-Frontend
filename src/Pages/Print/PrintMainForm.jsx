import React ,{useRef} from 'react';
import { Box, Typography, Button , Divider } from '@mui/material';
import {Grid} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import img from '../../assets/Logo.png'
import ReactToPrint from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';





function PrintMainAppForm() {
  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()
  const componentRef = useRef(null);



 



    function FileNumberBoxes({ fileNumber }) {
        // Convert the file number to a string and split it into individual digits
        const digits = fileNumber.toString().split('');
      
        const boxes = Array.from({ length: 4 }, (_, index) => (
          <Box
            sx={{
              border: 1,
              ml: 1,
              padding: 1,
              width: '0.5rem', // Set a fixed width for the boxes
              height: '0.5rem', // Set a fixed height for the boxes
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={index}
            className={`digit-box ${index < 3 ? 'filled' : ' '}`}
          >
            {digits[index] || ' '}
          </Box>
        ));
      
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {boxes}
          </Box>
        );
      }

      function NoteNumberBoxes({ NoteNumber }) {
        // Convert the file number to a string and split it into individual digits
        const digits = NoteNumber ? NoteNumber?.toString().split('') : 0;
      
        const boxes = Array.from({ length: 10 }, (_, index) => (
          <Box
            sx={{
              border: 1,
              ml: 1,
              padding: 1,
              width: '0.5rem', // Set a fixed width for the boxes
              height: '0.5rem', // Set a fixed height for the boxes
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={index}
            className={`digit-box ${index < 3 ? 'filled' : ' '}`}
          >
            {digits[index] || ' '}
          </Box>
        ));
      
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {boxes}
          </Box>
        );
      }

      function CNICNumberBoxes({ NoteNumber }) {
       
        // Convert the file number to a string and split it into individual digits
        const digits = NoteNumber ? NoteNumber?.toString().split('') : 0;
      
        const boxes = Array.from({ length: 15 }, (_, index) => (
          <Box
            sx={{
              border: 1,
              ml: 1,
              padding: 1,
              width: '0.5rem', // Set a fixed width for the boxes
              height: '0.5rem', // Set a fixed height for the boxes
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={index}
            className={`digit-box ${index < 3 ? 'filled' : ' '}`}
          >
            {digits[index] || ' '}
          </Box>
        ));
      
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {boxes}
          </Box>
        );
      }

      function NOKCNICNumberBoxes({ NoteNumber }) {
       
        // Convert the file number to a string and split it into individual digits
        const digits = NoteNumber ? NoteNumber?.toString().split('') : 0;
      
        const boxes = Array.from({ length: 15 }, (_, index) => (
          <Box
            sx={{
              border: 1,
              ml: 1,
              padding: 1,
              width: '0.5rem', // Set a fixed width for the boxes
              height: '0.5rem', // Set a fixed height for the boxes
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={index}
            className={`digit-box ${index < 3 ? 'filled' : ' '}`}
          >
            {digits[index] || ' '}
          </Box>
        ));
      
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {boxes}
          </Box>
        );
      }

      function PhoneNumberBoxes({ NoteNumber }) {
     
        // Convert the file number to a string and split it into individual digits
        const digits = NoteNumber ? NoteNumber?.toString().split('') : 0;
      
        const boxes = Array.from({ length: 12 }, (_, index) => (
          <Box
            sx={{
              border: 1,
              ml: 1,
              padding: 1,
              width: '0.5rem', // Set a fixed width for the boxes
              height: '0.5rem', // Set a fixed height for the boxes
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={index}
            className={`digit-box ${index < 3 ? 'filled' : ' '}`}
          >
            {digits[index] || ' '}
          </Box>
        ));
      
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {boxes}
          </Box>
        );
      }



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', 
            backgroundColor: theme.palette.secondary.background,
              alignItems: 'center', width: '100%' , pb : '4%' , 
              paddingTop : { lg: '4%', md: '6%', sm: '8%', xs: '6%' }
     }}>
            <ReactToPrint 
                    trigger={() => (
                    <Button variant="contained" color="primary" 
                    sx={{ 
                      mb: 1 , padding:'1%' ,
                       paddingX:'4%'}}>
                        <PrintIcon  />
                    </Button>
                    )}
                    content={() => componentRef.current}
                    documentTitle='MainAppForm'
                    pageStyle='print'
                />
       

      <Box sx={{
        
          width:'93%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <Grid container spacing={2} sx={{padding:'2%'}} ref={componentRef}>
        <Grid item lg={8} md={8} sm={8} xs={8}>
           
            <Box sx={{
                    display:'flex' ,
                  justifyContent:'end',
                  color:'#0E9494'
                  }}>
                <Typography variant='h4'
                    
                    sx={{
                        fontFamily:'inherit',
                        paddingRight:'12%' 
                        ,fontWeight:'800',
                        fontSize:'40px' ,    
                }}
                >
                    MEMBERSHIP FORM
                </Typography>
            </Box>
        </Grid>

          <Grid item lg={5}>
          <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:2
                }}
            >
                <Typography

                sx={{mt:0.5 , mr :1 }}
                variant='body2'
                 >DATE :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , border:1 , paddingX:1}}
                        >
                    {data.Date}
 
                 </Typography>
            </Box>
            
          </Grid>
          <Grid item lg={7} >
          <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:2
                }}
            >
                <Typography
                    sx={{mt:0.5}}
                    variant='body2'
                 >FILE NUMBER :
                 </Typography>
                <FileNumberBoxes fileNumber={data.FileNo} />
            </Box>
            
          </Grid>
          <Grid item lg={11} >
          <Box
                sx={{display:'flex',
                    color:'black',
                    justifyContent:'end'
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >NOTE NUMBER :
                 </Typography>
                <NoteNumberBoxes NoteNumber={data.NoteNo ? data.NoteNo  : ''} />
            </Box>
          </Grid>
          <Box
            sx={{
              border : 2,
              borderColor : '#0E9494',
              paddingX:3,
              marginY : 1,
              paddingY:1,
              borderRadius:5,
              width:'100%'
            }}
          >
          <Grid item lg={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'#0E9494',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='h6'
                 >PERSONAL INFORMATION
                 </Typography>

            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1,
                    mt:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >APPLICANT NAME :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2}}
                        >
                    {data.ApplicantName?.toUpperCase()}
                    <Divider
                        sx={{ width:500,
                            mt:data.ApplicantName? 0 : 3,
                            backgroundColor: 'black',

                         }}
                    />
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1,
                    mt:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >FATHER / HUSBAND NAME :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2}}
                        >
                    {data.FatherOrHusband?.toUpperCase()}
                    <Divider
                        sx={{ width:530,
                            mt:data.FatherOrHusband? 0 : 3,
                            backgroundColor: 'black' }}
                    />
                 </Typography>
            </Box>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1,
                    mt:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                 >CNIC NUMBER :
                 </Typography>
                <CNICNumberBoxes NoteNumber={data.CNICNo } />
            </Box>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1,
                    mt:1,

                }}
            >
                <Typography
                sx={{mt:0.5}}
                 >PHONE NUMBER :
                 </Typography>
                <PhoneNumberBoxes NoteNumber={data.ContactNo } />
            </Box>
          </Grid>
          </Box>
          <Box
            sx={{
              border : 2,
              borderColor : '#0E9494',
              paddingX:3,
              marginY : 1,
              paddingY:1,
              borderRadius:5,
              width:'100%'
            }}
          >

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'#0E9494',
                    ml:1,
                    mt:1,
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='h6'
                 >NOMINIES INFORMATION
                 </Typography>

            </Box>
          </Grid>
          <Grid item lg={6} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    mt:1,
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >NEXT OF KIN (NOK) :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2}}
                        >
                    {data.Nok?.toUpperCase()}
                    <Divider
                        sx={{ width:150,
                            mt:data.Nok? 0 : 3,
                            backgroundColor: 'black' }}
                    />
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    mt:1,
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >NOK RELATION: 
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2}}
                        >
                    {data.NokSRelation?.toUpperCase()}
                    <Divider
                        sx={{ width:120,
                            mt:data.NokSRelation? 0 : 3,
                            backgroundColor: 'black' }}
                    />
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    mt:1,
                }}
            >
                <Typography
                sx={{mt:0.5, ml:1.5}}
                 >NOK CNIC :
                 </Typography>
                <NOKCNICNumberBoxes NoteNumber={data.NoKCNIC ? data.NoKCNIC : '' } />
            </Box>
          </Grid>
          <Grid item lg={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1,
                    mt:1,
                }}
            >
                <Typography
                sx={{mt:0.5}}
                 >NOK PHONE NUMBER :
                 </Typography>
                <PhoneNumberBoxes NoteNumber={data.NokContact ? data.NokContact : ''  } />
            </Box>
          </Grid>
          </Box>
          

          <Box
            sx={{
              border : 2,
              borderColor : '#0E9494',
              paddingX:3,
              marginY : 1,
              paddingY:1,
              borderRadius:5,
              width:'100%'
            }}
          >

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'#0E9494',
                    ml:1,
                    mt:1,
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='h6'
                 >ADDRESS
                 </Typography>

            </Box>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >POSTAL ADDRESS :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2}}
                        >
                    {data.PostalAddress?.toUpperCase()}
                    <Divider
                        sx={{ width:720,
                            mt:data.PostalAddress? 0 : 3,
                            backgroundColor: 'black' }}
                    />
                 </Typography>
            </Box>
          </Grid>
          
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                
                 <Typography
                 variant='body2'
                        sx={{mt:3 , ml:4}}
                        >
                  
                    <Divider
                        sx={{ width:820,
                            backgroundColor: 'black' }}
                    />
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                
                 <Typography
                 variant='body2'
                        sx={{mt:3 , ml:4}}
                        >
                  
                    <Divider
                        sx={{ width:820,
                            backgroundColor: 'black' }}
                    />
                 </Typography>
            </Box>
          </Grid>
          </Box>

          
          <Box
            sx={{
              border : 2,
              borderColor : '#0E9494',
              paddingX:3,
              marginY : 1,
              paddingY:1,
              borderRadius:5,
              width:'95%'
            }}
          >

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'#0E9494',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='h6'
                 >PLOT DETAILS
                 </Typography>

            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} 
            sx={{
              display:'flex',
              flexDirection:'row'
            }}
              
              >
          <Grid item lg={3}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >PLOT SIZE :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 , paddingX:'5%' }}
                        >
                    {data.Area?.toUpperCase()}
 
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >PLOT LOCATION :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 , paddingX:'5%' }}
                        >
                    {data.PlotLocation?.toUpperCase()}
 
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={3}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >PHASE :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 , 
                            paddingX:'10%' }}
                        >
                    {data.Phase?.toUpperCase()}
 
                 </Typography>
            </Box>
          </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} 
            sx={{
              display:'flex',
              flexDirection:'row'
            }}
              
              >
        
          <Grid item lg={4} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >BLOCK :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 , paddingX:'5%' }}
                        >
                    {data.Block?.toUpperCase()}
 
                 </Typography>
            </Box>
          </Grid>
         
          <Grid item lg={4} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >PLOT CATEGORY :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 , 
                            paddingX: data.PlotCategory?'5%' : '20%' }}
                        >
                    {data.PlotCategory?.toUpperCase()}
 
                 </Typography>
            </Box>
          </Grid>

           <Grid item lg={4}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >PLOT NUMBER :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 , 
                            paddingX:'10%' }}
                        >
                    {data.PlotNo?.toUpperCase()}
 
                 </Typography>
            </Box>
          </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} 
            sx={{
              display:'flex',
              flexDirection:'row'
            }}
              
              >
        


          <Grid item lg={6}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >PLOT AMOUNT :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 , paddingX:'10%' }}
                        >
                    {data.TotalAmount}
 
                 </Typography>
            </Box>
          </Grid>

          <Grid item lg={6} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >DOWN PAYMENT:
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 , paddingX:'10%' }}
                        >
                    {data.DownPayment}
 
                 </Typography>
            </Box>
          </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} 
            sx={{
              display:'flex',
              flexDirection:'row'
            }}
              
              >

          <Grid item lg={6} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >CORNER PAYMENT:
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 , 
                            paddingX:data.CornerCharges ?'10%' : '15%' }}
                        >
                    {data.CornerCharges}
 
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >DISCOUNT:
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 ,
                        paddingX:data.Discount ?'10%' : '15%'  }}
                        >
                    {data.Discount}
 
                 </Typography>
            </Box>
          </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} 
            sx={{
              display:'flex',
              flexDirection:'row'
            }}
              
              >
          <Grid item lg={6}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >MONTHLY INSTALLMENT:
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 ,
                        paddingX:data.MonthlyInstallment ?'10%' : '15%'  }}
                        >
                    {data.MonthlyInstallment}
 
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography

                sx={{mt:0.5 }}
                variant='body2'
                 >PAYMENT MODE:
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 ,
                        paddingX:data.ModeOfPayment ?'10%' : '15%'  }}
                        >
                    {data.ModeOfPayment?.toUpperCase()}
 
                 </Typography>
            </Box>
          </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} 
            sx={{
              display:'flex',
              flexDirection:'row'
            }}
              
              >
          <Grid item lg={6} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography

                sx={{mt:0.5 , color:'red'}}
                variant='body2'
                 >GRAND TOTAL:
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 ,
                        paddingX:data.TotalAmount ?'10%' : '15%'  }}
                        >
                    {data.TotalAmount + data.CornerCharges - data.Discount}
 
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={6} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography

                sx={{mt:0.5 }}
                variant='body2'
                 >TOTAL INSTALLMENT:
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2 , border:1 ,
                        paddingX:data.Total_Installment ?'10%' : '15%'  }}
                        >
                    {data.Total_Installment}
 
                 </Typography>
            </Box>
          </Grid>
          </Grid>
          
          </Box>
          <Box
            sx={{
              borderTop : 2,
              borderColor : '#0E9494',
              marginY:3,
              width:'100%'
            }}
          ></Box>
          <Grid item lg={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                     justifyContent:'center',
                    color:'#0E9494',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='h6'
                 >-- FOR OFFICE USE ONLY --
                 </Typography>

            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >MANAGER STAMP & SIGNATURE :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2}}
                        >
                    {null}
                    <Divider
                        sx={{ width:600,mt:3,
                            backgroundColor: 'black' }}
                    />
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={9}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >CLIENT SIGNATURE :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2}}
                        >
                    {null}
                    <Divider
                        sx={{ width:450,mt:3,
                            backgroundColor: 'black' }}
                    />
                 </Typography>
            </Box>
          </Grid>
        

          <Grid item lg={6} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography

                sx={{mt:1.5 }}
                variant='body2'
                 >WITNESS # 1:
                 </Typography>
            </Box>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography

                sx={{mt:3.5 }}
                variant='body2'
                 >WITNESS # 2:
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={6}>
          <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1,
                    pt:2
                }}
            >
                <Typography
                sx={{mt:2.5}}
                variant='body2'
                 >CEO SIGNATURE :
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:1.5 , ml:2}}
                        >
                    {null}
                    <Divider
                        sx={{ width:300,mt:3,
                            backgroundColor: 'black' }}
                    />
                 </Typography>
            </Box>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1,
                    mt:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body2'
                 >REMARKS 
                 </Typography>
                 <Typography
                 variant='body2'
                        sx={{mt:0.5 , ml:2}}
                        >
                    {data.AppRemarks?.toUpperCase()}
                    <Divider
                        sx={{ width:900,
                            mt:data.AppRemarks? 0 : 3,
                            backgroundColor: 'rgba(255, 122, 89, 0)' }}
                    />
                 </Typography>
                 
            </Box>
          </Grid>




            
            </Grid>
        

      </Box>
    </Box>
  );
}

export default PrintMainAppForm;
