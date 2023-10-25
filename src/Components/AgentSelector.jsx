import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { getAllAgents } from '../api/Agents';
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

export default function AgentSelector({ onConfirm }) {
  const theme = useTheme();
  const [Agent, setAgent] = useState('');

  const [AgentNos, setAgentNos] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const responseData = await getAllAgents();
        setAgentNos(responseData.map(item => item.Name));
      } catch (error) {
        // Handle error if needed
      }
    };
    fetchAgents();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAgent(value);
    onConfirm(value); // Call the onConfirm function when a Agent is selected
  };

  // Render the VirtualizedList
  const VirtualizedList = React.forwardRef(({ children, ...rest }, ref) => (
    <FixedSizeList
      height={400}
      width={300}
      itemSize={ITEM_HEIGHT}
      itemCount={AgentNos.length}
      ref={ref}
      {...rest}
    >
      {({ index, style }) => (
        <MenuItem
          key={AgentNos[index]}
          value={AgentNos[index]}
          style={style}
          onClick={() => handleChange({ target: { value: AgentNos[index] } })}
        >
          {AgentNos[index]}
        </MenuItem>
      )}
    </FixedSizeList>
  ));

  return (
    <div >
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Agent</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={Agent}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Agent" />}
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
