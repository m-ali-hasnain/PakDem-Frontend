import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import {Button} from '@mui/material'
import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getrefundFile } from '../api/Transfer';
import TransferCard from '../Components/TransferCard';
import FileSelector from '../Components/fileselector';
import RefundForm from './refundForm';
import { useFormik } from "formik";
import * as Yup from "yup";

function CreateRefund () {


    const navigate = useNavigate()
    const theme = useTheme();
    
    const [data , setData] = useState(null);

    const [selectedFile, setSelectedFile] = useState('');
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
    const getdetails = async (file) => {
        try {
            
            const responseData = await getrefundFile(file); 

            const FileDetails = {
              Applicant_Name: responseData.ApplicantName,
              Father_Or_Husband: responseData.FatherOrHusband,
              CNIC_No: responseData.CNICNo,
              Contact_No: responseData.ContactNo,
              File_No: responseData.FileNo,
              Plot_Size: responseData.Area,
              Plot_No: responseData.PlotNo,
              Total_Amount : responseData.TotalAmount,
              Total_Installment: responseData.Total_Installment,
              Down_Payment: responseData.DownPayment,
              Monthly_Installment : responseData.MonthlyInstallment,
              Total_Paid_Amount : responseData.Total_Paid_Amount


            }
            setData(FileDetails); 
          } catch (error) {
            
          }
    }

    const handleConfirm = (file) => {
        setSelectedFile(file);
    };

    const handleConfirmButtonClick = async () => {
      if (selectedFile || values.FileNo) {
        if (selectedFile) {
          getdetails(selectedFile)
        } else if (values.FileNo) {
          if (isNaN(values.FileNo)) {
            alert('File should be a number');
          } else {
            getdetails(values.FileNo)
          }
        }
      } else {
        alert('Please select or type a file before confirming.');
      }
    };

    return (
        <Box
          sx={{
            display: 'flex',
            backgroundColor: theme.palette.secondary.background,
            justifyContent: 'center',
            flexDirection: 'column',
            paddingTop: { lg: '4%', md: '6%', sm: '15%', xs: '8%' },
            height : data ? 'auto' : '40vh'
            
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              padding:'1%'
            }}
          >
            <FileSelector onConfirm={handleConfirm} />
            <Typography variant="h6" sx={{
                    mt:2,
                    mb: {lg :0 , xs:2}
                    }}>
                -- Or Type -- 
            </Typography>
            <TextField sx={{ mt:1,  width: {lg : '30%' , md : "30%" , 
                                        sm : "30%" , xs : "30%"} }}
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

        

          </Box>
          <Box>
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
            onClick={handleConfirmButtonClick}>Get File Record
            </Button>
          </Box>
          {
            data &&
            (<>
              <TransferCard data={data} edit={true} isExp={true}  />
              <RefundForm ApplicationNo = {data.File_No} Total_Paid_Amount = {data.Total_Paid_Amount} />
            </>)
            }
        </Box>
      );
            }

export default CreateRefund;
