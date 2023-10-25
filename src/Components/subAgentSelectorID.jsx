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

export default function SubAgentSelectorID({ onConfirm }) {
  const theme = useTheme();
  const [selectedAgent, setSelectedAgent] = useState('');

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const responseData = await getAllAgents();
        setAgents(responseData);
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
    setSelectedAgent(value);
    onConfirm(value); // Call the onConfirm function when an agent is selected
  };

  // Render the VirtualizedList
  const VirtualizedList = React.forwardRef(({ children, ...rest }, ref) => (
    <FixedSizeList
      height={400}
      width={300}
      itemSize={ITEM_HEIGHT}
      itemCount={agents.length}
      ref={ref}
      {...rest}
    >
      {({ index, style }) => (
        <MenuItem
          key={agents[index].AgentID}
          value={agents[index].AgentID}
          style={style}
          onClick={() => handleChange({ target: { value: agents[index].AgentID } })}
        >
          {agents[index].Name}
        </MenuItem>
      )}
    </FixedSizeList>
  ));

  return (
    <div>
      <FormControl sx={{  width: 270 }}>
        <InputLabel id="demo-multiple-chip-label">Sub Agent</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={selectedAgent}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Agent" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected && (
                <Chip key={selected} label={agents.find(agent => agent.AgentID === selected)?.Name} />
              )}
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
