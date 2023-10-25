import React , {useState} from 'react';
import { Box, Typography, Button } from '@mui/material';
import {Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@emotion/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FileSelector from '../Components/fileselector';
import CreateIcon from '@mui/icons-material/Create';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from 'dayjs';
import { useEffect } from "react";
import AgentSelectorID from '../Components/AgentSelectorID';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { createPlot,updatePlot } from './Apis/PlotsApi';
import SubAgentSelectorID from '../Components/subAgentSelectorID';
import InvestorSelector from '../Components/InvestorSeletorID'; 



function CreatePlot() {

  const data = useLocation().state?.data
  
  const theme = useTheme()
  const navigate = useNavigate()


  const [selectedFile, setSelectedFile] = useState('');

  if(data){
    var val = data.sold
  }
  else{
    var val = false
  }

  const [checked, setChecked] = useState(val);

    const handleConfirm = (file) => {
        setSelectedFile(file);
    };


    
  


  const initialValues = data === undefined ? {
    PlotSize : null,
    PlotNo : null,
    PlotMeasurement : null,
    Street: null,
    Phase:null,
    Block:null,
    Category : null,
    PlotLocation:null,
    Amount : null,
    Plots:null
  } : {
    PlotSize : data.PlotSize,
    PlotNo : data.PlotNo,
    PlotMeasurement : null,
    Street: data.Street,
    Phase: data.Phase,
    Block: data.Block,
    Category : data.Category,
    PlotLocation:data.PlotLocation,
    Amount : data.Amount,
    Plots: data.Plots
  }

  

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        Plots: Yup.string().required("Plot is required"),
        PlotNo: Yup.string().required("Plot No is required"),
        Block : Yup.string().ensure().required("Block is required required!"),

       
        
      }),
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: (values, action) => {
        console.log(values);
         
      },
    });

    const handleSold = (event) => {
        setChecked(event.target.checked);
      };


  const handleClick = async () => {
  
      if (values.Plots && values.PlotNo && values.Block ) { 
        if(data){
            const submission = updatePlot(
                data.PlotID,
                null,
                1,
                values.PlotNo,
                values.Plots,
                values.PlotSize,
                values.Street,
                values.Phase,
                values.Block,
                values.Category,
                values.PlotLocation,
                values.Amount,
                null,
                checked
            )
            if(submission){
                alert('Plot updated')
                navigate(`/Plot/details/${data.PlotID}`)
            }
            else{
                alert('not updated')
            }
        }
        else{
            const submission =   createPlot(
                null,
                1,
                values.PlotNo,
                values.Plots,
                values.PlotSize,
                values.Street,
                values.Phase,
                values.Block,
                values.Category,
                values.PlotLocation,
                values.Amount,
                null,
                checked)
                if(submission) {

                alert('Plot created')
                navigate('/AllPlots')

                }
                else {
                alert('Technical Error')
                }
        }
        
       
    }
      
      else{
        alert("Please fill required fields")
      }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', 
            backgroundColor: theme.palette.secondary.background,
              alignItems: 'center', width: '100%' , pb : '4%' , 
              paddingTop : { lg: '4%', md: '6%', sm: '8%', xs: '6%' }
     }}>
      <Box>
        <Typography variant='h5' sx={{ fontWeight: 'bold', marginBottom: 2, marginTop: 1 }}>
          {data ? "Edit " : "Create "} Plot
        </Typography>
      </Box>
      <Box sx={{
          width:'90%' , flexGrow:1 , border : 2 , 
          borderRadius:10,backgroundColor:theme.palette.primary.background,
          borderColor : theme.palette.secondary.main , padding:'2%'
           }} >
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{padding:'2%'}}>

        <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Plot Size</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Plot Size"
                color='secondary'
                name='PlotSize'
                value={values.PlotSize}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"3 Marla"}>3 Marla Res</MenuItem>
                <MenuItem value={"5 Marla"}>5 Marla Res</MenuItem>
              </Select>
            </FormControl>

          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Plot No"
                    color='secondary'
                    name='PlotNo'
                    value={values.PlotNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.PlotNo && touched.PlotNo ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.PlotNo}</p>
            ) : null}
          </Grid>  

          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Plot Measurement</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Plot Measurement"
                color='secondary'
                name='PlotMeasurement'
                value={values.PlotMeasurement}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"25 x 70"}>25 x 70</MenuItem>
                <MenuItem value={"35 x 70"}>35 x 70</MenuItem>
              </Select>
            </FormControl>

          </Grid>

          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Street"
                    color='secondary'
                    name='Street'
                    value={values.Street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
          </Grid>

          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Phase</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Phase"
                color='secondary'
                name='Phase'
                value={values.Phase}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Phase I"}>Phase I</MenuItem>
                <MenuItem value={"Phase II"}>Phase II</MenuItem>
                <MenuItem value={"Phase III"}>Phase III</MenuItem>
                <MenuItem value={"Phase IV"}>Phase IV</MenuItem>
              </Select>
            </FormControl>

          </Grid>


          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Block</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Block"
                color='secondary'
                name='Block'
                value={values.Block}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"A"}>A</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"D"}>D</MenuItem>
                <MenuItem value={"A Com"}>A Com</MenuItem>
                <MenuItem value={"B Com"}>BCom</MenuItem>
              </Select>
            </FormControl>
            {errors.Block && touched.Block ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.Block}</p>
            ) : null}
          </Grid>

          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Select Category</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Select Category"
                color='secondary'
                name='Category'
                value={values.Category}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Residential"}>Residential</MenuItem>
                <MenuItem value={"Commercial"}>Commercial</MenuItem>
              </Select>
            </FormControl>

          </Grid>


          <Grid item lg={3} md = {3} sm = {6} xs={12}>
          <FormControl sx={{width: '100%' }}>
              <InputLabel >Plot Location</InputLabel>
              <Select
                id="outlined-multiline-flexible"
                label="Plot Location"
                color='secondary'
                name='PlotLocation'
                value={values.PlotLocation}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value={"Corner"}>Corner</MenuItem>
                <MenuItem value={"Non Corner"}>Non Corner</MenuItem>
                <MenuItem value={"Road Facing"}>Road Facing</MenuItem>
                <MenuItem value={"Double Road Facing"}>Double Road Facing</MenuItem>
                <MenuItem value={"Main Boulevard"}>Main Boulevard</MenuItem>
                <MenuItem value={"Park Facing"}>Park Facing</MenuItem>
                <MenuItem value={"Three Side Open"}>Three Side Open</MenuItem>
                <MenuItem value={"Main Road"}>Main Road</MenuItem>
              </Select>
            </FormControl>

          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Amount"
                    color='secondary'
                    name='Amount'
                    value={values.Amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
          </Grid>  

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <TextField sx={{  width: '100%' }}
                    id="outlined-multiline-flexible"
                    label="Plots"
                    color='secondary'
                    name='Plots'
                    value={values.Plots}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            {errors.Plots && touched.Plots ? (
              <p style={{ color: 'red', marginTop: 0, marginLeft: 4, marginBottom: 0 }}>{errors.Plots}</p>
            ) : null}
          </Grid>

          <Grid item lg={1} md={1} sm={6} xs={12}>
          <FormControlLabel
            sx={{paddingTop:1}}
            label="Sold"
            control={<Checkbox checked={checked} onChange={handleSold} />}
            
            />
          </Grid> 
          <Grid item lg={5} md={5}>

          </Grid> 
          <Grid item lg={3} md={3} sm={6} xs={12}></Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}></Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}></Grid>



          <Grid item lg={3} md={3} sm={6} xs={12}>
            <Box sx={{  alignSelf: 'flex-end' , mx:'auto' ,}}>
                <Button type='submit' onClick={() => { handleClick() }}
                  variant="contained" color="secondary" endIcon={<CreateIcon fontSize='large' />} sx={{ width: '100%', padding: 2, fontSize: 16, fontWeight: 'bold' }}>
                  {data ? "Update" : "Create"}
                </Button>
            </Box>
            </Grid>
            
            </Grid>
        </form>

      </Box>
    </Box>
  );
}

export default CreatePlot;
