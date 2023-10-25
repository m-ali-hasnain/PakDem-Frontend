import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import {Button} from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getTransferFile } from '../api/Transfer';
import TransferCard from '../Components/TransferCard';
import FileSelector from '../Components/fileselector';
import RegistryInteqalForm from './RegistryInteqalForm';

function CreateRegistryInteqal () {


    const navigate = useNavigate()
    const theme = useTheme();
    
    const [data , setData] = useState(null);

    const [selectedFile, setSelectedFile] = useState('');

    const getdetails = async (file) => {
        try {
            
            const responseData = await getTransferFile(file); 

            const FileDetails = {
              Application_No : responseData.ApplicationNo,
              Applicant_Name: responseData.ApplicantName,
              Father_Or_Husband: responseData.FatherOrHusband,
              CNIC_No: responseData.CNICNo,
              Contact_No: responseData.ContactNo,
              Nok : responseData.Nok,
              NoK_Father_Name : responseData.NoKFatherName,
              File_No: responseData.FileNo,
              File_Type: responseData.FileType,
              Plot_Size: responseData.Area,
              Plot_No: responseData.PlotNo,
              Phase: responseData.Phase,
              Block: responseData.Block,
              Total_Installment: responseData.Total_Installment,
              Down_Payment: responseData.DownPayment,
              Monthly_Installment : responseData.MonthlyInstallment


            }
            setData(FileDetails); 
          } catch (error) {
            
          }
    }

    const handleConfirm = (file) => {
        setSelectedFile(file);
        getdetails(file);
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
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding:'1%'
            }}
          >
            <FileSelector onConfirm={handleConfirm} />
            
          </Box>
          {
            data &&
            (<>
              <TransferCard data={data} edit={true} isExp={true}  />
              <RegistryInteqalForm ApplicationNo = {data.Application_No} />
            </>)
            }
        </Box>
      );
            }

export default CreateRegistryInteqal;
