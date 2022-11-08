import React, { useState } from 'react';

// material ui
import { TextField, Box, Button, Typography, Modal, Stack } from '@mui/material';

// REACT ROUTER
import { useParams } from 'react-router';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [title, setTitle] = useState('');

  const params = useParams();

  const handleAddEmployee = () => {
    props.onAddEmployee(firstname, lastname, title, params.id);
    props.handleClose();
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack gap={'20px'}>
          <TextField
            id="outlined-basic"
            label="Type first name"
            variant="outlined"
            value={firstname}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Type last name"
            variant="outlined"
            value={lastname}
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Type title"
            variant="outlined"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <Button onClick={handleAddEmployee}>Add Employee</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
