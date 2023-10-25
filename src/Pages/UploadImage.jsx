import React, { useState } from 'react';
import { storage } from '../firebase';
import { Typography ,Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL, listAll, getStorage } from 'firebase/storage';

const UploadImage = () => {
  const [fileNumber, setFileNumber] = useState('');
  const [image, setImage] = useState(null);

  const handleChange = e => {
    const file = e.target.files[0];
    setImage(file);
  };
  
  const theme = useTheme();
  const navigate = useNavigate()

const handleUpload = () => {
    if(fileNumber !== '' && image)
    {
        const storageRef = ref(storage, `images/${fileNumber}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', 
        snapshot => {},
        error => alert(error),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            alert(`Image Uploaded`);
            navigate('/Home')
            });
        }
        );
    } 
    else{
        alert('You must enter File Number and add an image')
    }
  };



  return (
    <div style={{marginTop:'5%'}}>
        <div style={{marginTop:'2%' , marginBottom:'2%'}}>
            <Typography variant='h5'>
                Upload Image of a File
            </Typography>
        </div>
        <div style={{ marginBottom:'2%'}}>
            <input 
                style={{width:'20%' , padding:'1% 1%'}}  type="text" 
                placeholder="Enter File Number" 
                onChange={(e) => setFileNumber(e.target.value)} 
            />
        </div>
     
      <input 
            type="file" onChange={handleChange} />
      <div style={{marginTop:'2%', marginBottom:'2%'}}>
      <Button
        style={{
            color: theme.palette.secondary.text,
                        backgroundColor: theme.palette.secondary.main,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        boxShadow: 10,
                        my: 1,
                        ':hover': {
                            backgroundColor: theme.palette.secondary.hoverButton,
                            color: theme.palette.secondary.main,
                        },
                        
                       
        }}
      
      onClick={handleUpload}>Upload</Button>
      </div>
    </div>
  );
};

export default UploadImage;
