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

// useFormik
import { useFormik } from 'formik';

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

const clientAttributes = [
  'name',
  'juridiqueforme',
  'threeactivities',
  'activityfield',
  'adress',
  'fax',
  'phone',
  'email',
  'bankname',
  'bankaccountnumber',
  'creationdate',
  'icenumber',
  'patente',
  'identificationfiscal',
  'rcnumber',
  'cnssnumber',
  'chiffreaffireone',
  'fullnametrainingmanager',
  'titletrainingmanager',
  'fullnamelegalmanager',
  'titlelegalmanager',
  'numberofexecutives',
  'numberofemployees',
  'numberofworkers',
  'totalnumber',
  'iscompanyalreadybenefitedlastthreeyears',
  'cnssaffiliationregion',
  'personalphonenumber',
];

const NumericClientAtrribute = [
  'numberofexecutives',
  'numberofemployees',
  'numberofworkers',
  'totalnumber',
  'chiffreaffireone',
];

export default function BasicModal(props) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(7);

  const initialValues = {};

  clientAttributes.forEach((element) => {
    initialValues[element] = '';
  });

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    onSubmit: (values) => {
      props.onEditClient(props.id, values);
    },
  });

  const onNext = () => {
    setStartIndex((state) => state + 7);
    setEndIndex((state) => state + 7);
  };

  const onPrevious = () => {
    setStartIndex((state) => state - 7);
    setEndIndex((state) => state - 7);
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={'20px'} flexDirection="row" flexWrap={'wrap'}>
            {clientAttributes.slice(startIndex, endIndex).map((attribute, index) => {
              const type = NumericClientAtrribute.includes(attribute);

              return (
                <TextField
                  key={index}
                  label={attribute}
                  name={attribute}
                  variant="outlined"
                  type={type ? 'number' : 'text'}
                  onChange={formik.handleChange}
                  value={formik.values.attribute}
                />
              );
            })}
            {endIndex === 28 && (
              <Button type="submit" variant="contained">
                update Client
              </Button>
            )}
          </Stack>
        </form>
        <Box sx={{ marginTop: '10px' }}>
          <Button
            onClick={onPrevious}
            disabled={startIndex === 0}
            startIcon={<Iconify icon={'akar-icons:arrow-left'} style={{ fontSize: '14px' }} />}
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={endIndex === 28}
            endIcon={<Iconify icon={'akar-icons:arrow-right'} style={{ fontSize: '14px' }} />}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
