import React, { useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL, listAll, getStorage } from 'firebase/storage';

const Test = () => {
  const [fileNumber, setFileNumber] = useState('');
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  const handleChange = e => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${fileNumber}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed', 
      snapshot => {},
      error => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(`File available at ${downloadURL}`);
        });
      }
    );
  };

  const fetchImages = async () => {
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

  return (
    <div>
      <input type="text" placeholder="File Number" onChange={(e) => setFileNumber(e.target.value)} />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={fetchImages}>Fetch</button>
      <div>
        {images.map((img, index) => (
          <img src={img} alt={`img-${index}`} key={index} width="100" height="100" />
        ))}
      </div>
    </div>
  );
};

export default Test;
