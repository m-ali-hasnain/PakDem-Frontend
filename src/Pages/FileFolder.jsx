import React, { useEffect, useState } from "react";
import { Box ,Typography , Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import {Grid} from '@mui/material';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from "react-router-dom";
import DataTable from "../Components/Table";
import FileSelector from "../Components/fileselector";
import {  getFolder } from "../api/Payments";
import { useFormik } from "formik";
import * as Yup from "yup";
import InfoIcon from '@mui/icons-material/Info';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeIcon from '@mui/icons-material/Badge';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MainForm from "./Folder Components/MainAppForm";
import GetCard from "../Components/Card";
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, listAll, getStorage } from 'firebase/storage';



function FileFolder() {


    const navigate = useNavigate()
    const theme = useTheme();

    const [applicationForm, setApplicationForm] = useState({});
    const [receipts, setReceipts] = useState([]);
    const [commissiondata, setCommission] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedTab, setSelectedTab] = useState('Application Form');
    const [images, setImages] = useState([]);
  

    const fetchImages = async (fileNumber) => {
      const imagesList = [];
      const listRef = ref(storage, `images/${fileNumber}`);
  
      listAll(listRef).then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            imagesList.push(url);
            setImages(imagesList);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
    };

    

    const handleConfirm = (file) => {
        setSelectedFile(file);
    };

    
  const initialValues =   {
    FileNo: null
  } 

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        FileNo: Yup.number().required("File No is required!"),
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });

   

    const handleConfirmButtonClick = async () => {
      if (selectedFile || values.FileNo) {
        if (selectedFile) {
          fetchImages(selectedFile)
          const response = await getFolder(selectedFile);
    
          // Separate receipts from the response
          const { commission , receipts, ...applicationFormData } = response;
    
          // Set the states
          setApplicationForm(applicationFormData);
          setReceipts(receipts);
          setCommission(commission);
          console.log(typeof  commission)
        } else if (values.FileNo) {
          if (isNaN(values.FileNo)) {
            alert('File should be a number');
          } else {
            fetchImages(values.FileNo)
            const response = await getFolder(values.FileNo);
    
            // Separate receipts from the response
            const {commission ,  receipts, ...applicationFormData } = response;
    
            // Set the states
            setApplicationForm(applicationFormData);
            setReceipts(receipts);
    
            setCommission(commission);

            
          }
        }
      } else {
        alert('Please select or type a file before confirming.');
      }
    };


    const handleTabClick = (tabName) => {
      setSelectedTab(tabName);
    };
  
    const renderSelectedContent = () => {
      switch (selectedTab) {
        case 'Application Form':
          return Object.keys(applicationForm).length === 0 ? 
                <> No Data </> :
               <GetCard data={applicationForm} nav='Main' edit={false} isExp={true} />;
        case 'Receipts':
          return receipts.length === 0 ? 
                <> No data</> : 
                <DataTable data = { receipts }  nav = 'ReceiptDetails'  isPayment = {false} />;
        case 'Images':
          return <div>
          {images.map((img, index) => (
            <div >
              <img src={img} style={{margin:5}}  alt={`img-${index}`} key={index} width="300" height="300" />
            </div>
          ))}
        </div>;
        case 'Commission Out':
          if (Array.isArray(commissiondata) && commissiondata.length > 0) {
            return <DataTable data={commissiondata} nav='ReceiptDetails' isPayment={true} />;
          } else {
            return <>No data</>;
          }
        
        default:
          return null;
      }
    };
  
    const [offset, setOffset] = useState(0);
    const MAX_VISIBLE_BUTTONS = 6
    
    const handleNext = () => {
      if (offset + MAX_VISIBLE_BUTTONS < buttons.length) {
        setOffset(offset + 1);
      }
    };
  
    const handlePrev = () => {
      if (offset > 0) {
        setOffset(offset - 1);
      }
    };
  
    //Buttons
  
  const buttons = [
    {
      label: 'Application Form',
      tabName: 'Application Form',
      icon: InfoIcon, 
    },
    {
      label: 'Receipts',
      tabName: 'Receipts',
      icon: IntegrationInstructionsIcon,
    },
    
    {
      label: 'Images',
      tabName: 'Images',
      icon: NoteAltIcon,
    },
    {
      label: 'Commission Out',
      tabName: 'Commission Out', 
      icon: FeedbackIcon,
    }
   
  ];




  return (
    <Box 
    sx={{
        display: 'flex',
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'column',
        paddingTop: { lg: '4%', md: '6%', sm: '8%', xs: '6%' },
       
    }}>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        mx:'auto'
        
         }}
    >
        <Typography variant="h4" sx={{ flexGrow: 1 , mb:'1%' }}>
             File Folders
        </Typography>
        </Box>
        <Box sx={{
        backgroundColor: theme.palette.secondary.background,
        justifyContent:'center',
        flexDirection:'row',
        paddingTop:'4%' ,
        
         }}
    >
        <form onSubmit={handleSubmit}>
        <Grid container >

        <Grid item lg={2}  /> 
        <Grid item lg={3} md={3} sm={5} xs={12}
        >
            <FileSelector onConfirm={handleConfirm} />
        </Grid>
        <Grid item lg={2} md={4} sm={5} xs={12}
        >
            <Typography variant="h6" sx={{
                    mt:2,
                    mb: {lg :0 , xs:2}
                    }}>
                - Or Type - 
            </Typography>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}
        >
            <TextField sx={{  width: {lg : '100%' , md : "85%" , 
                                        sm : "70%" , xs : "60%"} }}
                id="outlined-multiline-flexible"
                label="File No*"
                color='secondary'
                name='FileNo'
                value={values.FileNo}
                onChange={handleChange}
                onBlur={handleBlur}
              />{!selectedFile && errors.FileNo && touched.FileNo ? (
                <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.FileNo}</p>
              ) : null}
        </Grid>
        <Grid item lg={2}  /> 
        <Grid item lg={12} md={10} sm={12} xs={12}
        >
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
            onClick={handleConfirmButtonClick}>Get File Record</Button>
        </Grid>
        </Grid>
        </form>

        </Box>
        <Box sx={{ mt:'2%' }}>
                  <Grid item xs={12}>
                  {offset > 0 && (
                      <IconButton onClick={handlePrev}>
                        <ArrowBackIosNewIcon />
                      </IconButton>
                    )}
                  {buttons.slice(offset, offset + MAX_VISIBLE_BUTTONS).map((button, index) => (
                    
                      <Button
                        key={index}
                        onClick={() => handleTabClick(button.tabName)}
                        sx={{
                          color: 'inherit',
                          position: 'relative',
                          fontWeight: 'bold',
                          '&::after': {
                            content: '""',
                            display: 'block',
                            width: '100%',
                            height: '2px',
                            background: theme.palette.secondary.main,
                            position: 'absolute',
                            bottom: '-4px',
                            transform: selectedTab === button.tabName ? 'scaleX(1)' : 'scaleX(0)',
                            transition: 'transform 0.3s ease',
                          },
                          '&:hover::after': {
                            transform: 'scaleX(1)',
                          },
                          marginLeft: index > 0 ? '2%' : '0', 
                        }}
                      >
                        {button.icon && <button.icon sx={{ marginRight: 1 }} />}
                        {button.label}
                      </Button>
                    ))}
                    {offset + MAX_VISIBLE_BUTTONS < buttons.length && (
                      <IconButton onClick={handleNext}>
                        <ArrowForwardIosIcon />
                      </IconButton>
                    )}
                    
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ padding: '1%', paddingTop: '2%' }}>
                      {renderSelectedContent()}
                    </Box>
                  </Grid>
           </Box>
    </Box>
    )
}

export default FileFolder;
