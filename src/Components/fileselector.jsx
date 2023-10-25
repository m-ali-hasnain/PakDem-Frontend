import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { getMainAppFormDetails } from '../api/MainAppFrom';
import { FixedSizeList } from 'react-window';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FileSelector({ onConfirm }) {
  const theme = useTheme();
  const [file, setFile] = useState('');

  const [fileNos, setFileNos] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const responseData = await getMainAppFormDetails();
         
        setFileNos(responseData.map(item => item.File_No));
        console.log(fileNos)
      } catch (error) {
        // Handle error if needed
      }
    };
    fetchFiles();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFile(value);
    onConfirm(value); 
  };

  // Render the VirtualizedList
  const VirtualizedList = React.forwardRef(({ children, ...rest }, ref) => (
    <FixedSizeList
      height={400}
      width={300}
      itemSize={ITEM_HEIGHT}
      itemCount={fileNos.length}
      ref={ref}
      {...rest}
    >
      {({ index, style }) => (
        <MenuItem
          key={fileNos[index]}
          value={fileNos[index]}
          style={style}
          onClick={() => handleChange({ target: { value: fileNos[index] } })}
        >
          {fileNos[index]}
        </MenuItem>
      )}
    </FixedSizeList>
  ));

  return (
    <div >
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">File No</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={file}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="File No" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected && <Chip key={selected} label={selected} />}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          <VirtualizedList />
        </Select>
      </FormControl>
    </div>
  );
}
