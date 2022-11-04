import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    props.setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Seach By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label="Search BY"
          onChange={handleChange}
        >
          <MenuItem value={'firstname'}>firstname</MenuItem>
          <MenuItem value={'secondname'}>secondname</MenuItem>
          <MenuItem value={'field'}>field</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
