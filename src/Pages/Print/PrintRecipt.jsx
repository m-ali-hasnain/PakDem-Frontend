import React ,{useRef , useEffect, useState} from 'react';
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
import { getprintReceipt } from '../../api/Receipt';





function PrintRecipt() {
  const [data,setData] = useState(null)
  const id = useLocation().state?.id
  
  const theme = useTheme()
  const navigate = useNavigate()
  const componentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        const responseData = await getprintReceipt(id); // Call the function to get the data
        setData(responseData); // Set the data in the state
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchData(); 
  }, []);


    function FileNumberBoxes({ fileNumber }) {
        // Convert the file number to a string and split it into individual digits
        const digits = fileNumber.toString().split('');
        console.log('digit ' ,digits)
      
        const boxes = Array.from({ length: digits.length }, (_, index) => (
          <Box
            sx={{
              border: 1,
              ml: 1,
              padding: 1,
              width: '1rem', // Set a fixed width for the boxes
              height: '1rem', // Set a fixed height for the boxes
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
          {data && 
          <>  
          <ReactToPrint 
                    trigger={() => (
                    <Button variant="contained" color="primary" sx={{ mb: 1 }}>
                        <PrintIcon  />
                    </Button>
                    )}
                    content={() => componentRef.current}
                    documentTitle='ReceiptForm'
                    pageStyle='print'
                />
       

          <Box sx={{
            
              width:'100%' , flexGrow:1 , border : 2 , 
              borderRadius:10,backgroundColor:theme.palette.primary.background,
              borderColor : theme.palette.secondary.main ,
              }} >
            <Grid container  sx={{padding:'2%'}} ref={componentRef}>

            
            

                <Grid item lg={12} md={12} sm={12} xs={12}>
                <Box
                        sx={{
                        border : 5,
                        borderColor : '#0E9494',
                        paddingX:3,
                        marginY : 1,
                        paddingY:1,
                        borderRadius:5,
                        width:'93%'
                        }}
                    >
                    <Box sx ={{
                            
                            color:'#0E9494',
                            }}>
                        <Typography sx={{ml:'17.5%'}}  variant='h4'>
                            MIAN MUHAMMAD BAKHSH CITY
                        </Typography>
                        <Typography  variant='h5' sx={{ml:'12%' , color:'black'}}>
                            A PROJECT BY PAKDEM DEVELOPERS (SMC-PVT) LTD.
                        </Typography>
                        <Typography variant='body1' sx={{ml:'12%' ,color:'black'}} >
                            OFFICE NO 14,SECOND FLOOR,MAJEED PLAZA,BANK ROAD, SADDAR,RAWALPINDI
                        </Typography >
                        <Typography variant='body1' sx={{ml:'29%' ,color:'black'}}>
                            PHONE: 051-8315383 WHATSAPP: 0312-9113369
                        </Typography>
                    
                    </Box>

                    </Box>
                    
                    
                </Grid>
            
                <Grid  container 
            sx={{
              border : 5,
              borderColor : '#0E9494',
              paddingX:3,
              marginY : 1,
              paddingY:1,
              borderRadius:5,
              width:'100%'
            }}
          >

        
            <Grid item lg={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1,
                        mt:'20%'
                    }}
                >
                    <Typography
                        sx={{mt:0.5}}
                    >Recipt Number :
                    </Typography>
                    <FileNumberBoxes fileNumber={data.Receipt_No} />
                </Box>
              </Grid>
              <Grid item lg={12} sx= {{ml:'10%'}}>
               
                        <Typography variant='h4'
                            sx={{
                                fontFamily:'inherit'
                                ,fontWeight:'800',
                                fontSize:'34px' , 
                               color : '#0E9494',
                        }}
                        >
                            RECEIPT FORM
                        </Typography>
                            </Grid>
              <Grid item lg={6} >
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:6,
                        mt:'16%'
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    >Receipt Status :
                    </Typography>
                    <Typography
                    variant='h6'
                            sx={{  paddingX: 2, color: data.Receipt_Status == 'UnPaid' ? 'blue' : 'green'  , ml:2}}

                            >
                        {data.Receipt_Status?.toUpperCase()}
                    </Typography>
                    
                </Box>
              </Grid>
             
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    variant='body1'
                    >FILE NUMBER :
                    </Typography>
                    <Typography
                    variant='body1'
                            sx={{mt:0.5 , ml:2}}
                            >
                        {data.File_No}
                        <Divider
                            sx={{ width:100,
                                mt:data.File_No? 0 : 3,
                                backgroundColor: 'black',
                            }}
                        />
                    </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    variant='body1'
                    >DATE :
                    </Typography>
                    <Typography
                    variant='body1'
                            sx={{mt:0.5 , ml:2}}
                            >
                        {data.Date}
                        <Divider
                            sx={{ width:100,
                                mt:data.Date? 0 : 3,
                                backgroundColor: 'black',
                            }}
                        />
                    </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    variant='body1'
                    >NAME :
                    </Typography>
                    <Typography
                    variant='body1'
                            sx={{mt:0.5 , ml:2}}
                            >
                        {data.Name?.toUpperCase()}
                        <Divider
                            sx={{ width:300,
                                mt:data.Name? 0 : 3,
                                backgroundColor: 'black',
                            }}
                        />
                    </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    variant='body1'
                    >Receieved Amount :
                    </Typography>
                    <Typography
                    variant='body1'
                            sx={{mt:0.5 , ml:2}}
                            >
                        {data.Received_Amount}
                        <Divider
                            sx={{ width:200,
                                mt:data.Received_Amount? 0 : 3,
                                backgroundColor: 'black',
                            }}
                        />
                    </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    variant='body1'
                    >TOTAL RECIEVED AMOUNT :
                    </Typography>
                    <Typography
                    variant='body1'
                            sx={{mt:0.5 , ml:2}}
                            >
                        {data.Total_Recieved}
                        <Divider
                            sx={{ width:100,
                                mt:data.Total_Recieved? 0 : 3,
                                backgroundColor: 'black',
                            }}
                        />
                    </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    variant='body1'
                    >RECEIPT TYPE:
                    </Typography>
                    <Typography
                    variant='body1'
                            sx={{mt:0.5 , ml:2}}
                            >
                        {data.Mode_Of_Payment}
                        <Divider
                            sx={{ width:100,
                                mt:data.Mode_Of_Payment? 0 : 3,
                                backgroundColor: 'black',
                            }}
                        />
                    </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    variant='body1'
                    >AMOUNT FOR THE MONTH:
                    </Typography>
                    <Typography
                    variant='body1'
                            sx={{mt:0.5 , ml:2}}
                            >
                        {data.Amount_For_The_Month_Of}
                        <Divider
                            sx={{ width:100,
                                mt:data.Amount_For_The_Month_Of? 0 : 3,
                                backgroundColor: 'black',
                            }}
                        />
                    </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    variant='body1'
                    >PAYMENT TYPE:
                    </Typography>
                    <Typography
                    variant='body1'
                            sx={{mt:0.5 , ml:2}}
                            >
                        {data.Payment_Mode}
                        <Divider
                            sx={{ width:100,
                                mt:data.Payment_Mode? 0 : 3,
                                backgroundColor: 'black',
                            }}
                        />
                    </Typography>
                </Box>
              </Grid>

            
       
              <Grid item lg={3} md={3} sm={3} xs={3}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body1'
                 >AREA :
                 </Typography>
                 <Typography
                 variant='body1'
                        sx={{mt:0.5 , ml:2 , border:1 , paddingX:'1%' }}
                        >
                    {data.Area?.toUpperCase()}
 
                 </Typography>
            </Box>
          </Grid>

          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body1'
                 >PHASE :
                 </Typography>
                 <Typography
                 variant='body1'
                        sx={{mt:0.5 , ml:2 , border:1 , 
                            paddingX:'3%' }}
                        >
                    {data.Phase?.toUpperCase()}
 
                 </Typography>
            </Box>
          </Grid>
        
          <Grid item lg={3} md={3} sm={3} xs={3} >
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                    ml:1
                }}
            >
                <Typography
                sx={{mt:0.5}}
                variant='body1'
                 >BLOCK :
                 </Typography>
                 <Typography
                 variant='body1'
                        sx={{mt:0.5 , ml:2 , border:1 , paddingX:'3%' }}
                        >
                    {data.Block?.toUpperCase()}
 
                 </Typography>
            </Box>
          </Grid>
           <Grid item lg={3} md={3} sm={3} xs={3}>
            <Box
                sx={{display:'flex',
                     flexDirection:"row",
                    color:'black',
                }}  
            >
                <Typography
                sx={{mt:0.5}}
                variant='body1'
                 >PLOT NUMBER :
                 </Typography>
                 <Typography
                 variant='body1'
                        sx={{mt:0.5 , ml:2 , border:1 , 
                            paddingX:'3%' }}
                        >
                    {data.Plot?.toUpperCase()}
 
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
                variant='body1'
                 >REMARKS 
                 </Typography>
                 <Typography
                 variant='body1'
                        sx={{mt:0.5 , ml:2}}
                        >
                    {data.Remarks?.toUpperCase()}
                    <Divider
                        sx={{ width:600,
                            mt:data.Remarks? 0 : 3,
                            backgroundColor: 'black' }}
                    />
                 </Typography>
            </Box>
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    variant='body1'
                    >PLOT AMOUNT:
                    </Typography>
                    <Typography
                    variant='body1'
                            sx={{mt:0.5 , ml:2}}
                            >
                        {data.Total_Amount}
                        <Divider
                            sx={{ width:100,
                                mt:data.Total_Amount? 0 : 3,
                                backgroundColor: 'black',
                            }}
                        />
                    </Typography>
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1
                    }}
                >
                    <Typography
                    sx={{mt:0.5}}
                    variant='body1'
                    >BALANCE AMOUNT:
                    </Typography>
                    <Typography
                    variant='body1'
                            sx={{mt:0.5 , ml:2}}
                            >
                        {data.Balance_Amount}
                        <Divider
                            sx={{ width:200,
                                mt:data.Balance_Amount? 0 : 3,
                                backgroundColor: 'black',
                            }}
                        />
                    </Typography>
                </Box>
              </Grid>
              </Grid>
              <Grid>

               
              <Box
                    sx={{display:'flex',
                        flexDirection:"row",
                        color:'black',
                        ml:1,
                    }}
                >

                    <Typography
                    variant='body2'
                            sx={{ ml:2}}
                            >
                              <Divider
                            sx={{ width:870,
                                backgroundColor: 'black',
                            }}
                        />
                              UBL Bank
                              Title:
                              PAKDEM SMC Pvt Ltd
                              ,
                              A/C No:
                              0109000236639528,
                              Branch Code:
                              1491,
                              IBAN:
                              PK02UNIL 0109000236639528
                        
                    </Typography>
                </Box>      
              </Grid>

                </Grid>
            

          </Box>
          </>}
    </Box>
  );
}

export default PrintRecipt;
