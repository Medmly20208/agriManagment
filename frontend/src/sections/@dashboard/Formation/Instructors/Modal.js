import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  Box,
  Button,
  InputLabel,
  Typography,
  Modal,
  Stack,
  InputAdornment,
} from '@mui/material';

// axios
import axios from 'axios';
import { element } from 'prop-types';

// Iconify
import Iconify from '../../../../components/Iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [availabeCourses, setAvailableCourses] = useState([]);

  const getAllCourses = () => {
    axios.get('http://localhost:5000/csfcourses').then((res) => setAvailableCourses(res.data));
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  console.log(availabeCourses);

  const [firstname, setfirstname] = useState('');
  const [secondname, setsecondname] = useState('');
  const [field, setfield] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [email, setemail] = useState('');
  const [adress, setadress] = useState('');
  const [city, setcity] = useState('');
  const [coursedocument, setcoursedocument] = useState('');
  const [cv, setcv] = useState('');

  const [filterCourses, setFilterCourses] = useState();

  const handleAddInstructor = () => {
    props.onAddInstructor({ firstname, secondname, field, phonenumber, email, adress, city, coursedocument, cv });
    props.handleClose();
  };

  // get all matches
  const getAllMatches = (value) => {
    setFilterCourses(value);
    if (value.trim().length === 0) {
      getAllCourses();
    } else {
      axios.get(`http://localhost:5000/csfcourses/findAllMatchs/${value}`).then((res) => {
        setAvailableCourses(res.data);
      });
    }
  };

  // Search courses
  /*
 <TextField
                      fullWidth
                      value={filterCourses}
                      onChange={(event) => getAllMatches(event.target.value)}
                      placeholder={`Search Course`}
                      sx={{ width: '80%', marginLeft: '10px' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                    />


*/

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack gap={'20px'} flexDirection="row">
          <Stack gap={'20px'}>
            <TextField
              id="outlined-basic"
              label="Type first name"
              variant="outlined"
              value={firstname}
              onChange={(event) => setfirstname(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Type second name"
              variant="outlined"
              value={secondname}
              onChange={(event) => setsecondname(event.target.value)}
            />

            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">field</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={field}
                  label="Age"
                  onChange={(event) => setfield(event.target.value)}
                >
                  {availabeCourses.map((element, index) => {
                    return (
                      <MenuItem key={index} value={element.field}>
                        {element.field}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <TextField
              id="outlined-basic"
              label="Type phonenumber"
              variant="outlined"
              value={phonenumber}
              onChange={(event) => setphonenumber(event.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Type email"
              variant="outlined"
              value={email}
              onChange={(event) => setemail(event.target.value)}
            />
          </Stack>
          <Stack gap={'20px'}>
            <TextField
              id="outlined-basic"
              label="Type adress"
              variant="outlined"
              value={adress}
              onChange={(event) => setadress(event.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Type city"
              variant="outlined"
              onChange={(event) => setcity(event.target.value)}
            />
            <input type="file" name="course document" onChange={(event) => setcoursedocument(event.target.files[0])} />
            <input type="file" name="CV" onChange={(event) => setcv(event.target.files[0])} />
            <Button onClick={handleAddInstructor}>Add Instructor</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
