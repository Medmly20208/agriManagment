/*   import React, { useEffect, useState } from 'react';

// axios
import axios from 'axios';

// mui material
import { Box } from '@mui/material';

const Employees = (props) => {
  const [EmployeesList, setEmployeesList] = useState([]);

  const API_END_POINT = 'http://localhost:5000';

  // get all employees by client id
  const getAllEmployeesByClientId = () => {
    axios.get(`${API_END_POINT}/employees/${props.clientId}`).then((result) => setEmployeesList(result.data));
  };

  useEffect(() => {
    getAllEmployeesByClientId();
  }, []);

  console.log(EmployeesList);

  return <Box>Employees {props.clientId}</Box>;
};

export default Employees; */

import sumBy from 'lodash/sumBy';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  TextField,
  InputAdornment,
  TableCell,
  TableRow,
} from '@mui/material';

// axios
import axios from 'axios';

// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// hooks
import useTabs from '../../../../../hooks/useTabs';
import useSettings from '../../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../../hooks/useTable';
// _mock_
import { _invoices } from '../../../../../_mock';
// components
import Page from '../../../../../components/Page';
import Iconify from '../../../../../components/Iconify';
import Scrollbar from '../../../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../../../components/table';
// sections
import InvoiceAnalytic from '../../../invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../../invoice/list';

// Add cousre Modal
import Modal from './Modal';

// edit Modal
import EditModal from './EditModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstname', label: 'firstname', align: 'left' },
  { id: 'lastname', label: 'lastname', align: 'left' },
  { id: 'title', label: 'title', align: 'left' },
  { id: 'action', label: 'action', align: 'left' },
];

// ----------------------------------------------------------------------

export default function Employees(props) {
  const [employeesList, setEmployeesList] = useState([]);

  const [open, setOpenModal] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const API_END_POINT = 'http://localhost:5000';

  // get all Employees list by client id
  const getAllEmployees = () => {
    axios.get(`${API_END_POINT}/employees/${props.clientId}`).then((res) => setEmployeesList(res.data));
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const theme = useTheme();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [editedId, setEditedId] = useState();

  const [tableData, setTableData] = useState(_invoices);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const handleDeleteRows = (selected) => {
    const deleteRows = employeesList.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const denseHeight = dense ? 56 : 76;

  const isNotFound =
    (!employeesList?.length && !!filterName) ||
    (!employeesList?.length && !!filterStatus) ||
    (!employeesList?.length && !!filterService) ||
    (!employeesList?.length && !!filterEndDate) ||
    (!employeesList?.length && !!filterStartDate);

  // add Employee
  const AddEmployee = (firstname, lastname, title, clientid) => {
    axios
      .post(`${API_END_POINT}/employees/add`, {
        firstname,
        lastname,
        title,
        clientid,
      })
      .then((res) => {
        getAllEmployees();
      });
  };
  // delete Employee
  const deleteCourse = (id) => {
    axios.delete(`${API_END_POINT}/employees/${id}`).then((res) => {
      getAllEmployees();
    });
  };
  // edit Employee
  const updateEmployee = (firstname, lastname, title, id) => {
    axios
      .post(`${API_END_POINT}/employees/updateemployee/${id}`, {
        firstname,
        lastname,
        title,
      })
      .then((res) => {
        getAllEmployees();
      });
  };

  const OpenModal = () => {
    setOpenModal(true);
  };

  const CloseModal = () => {
    setOpenModal(false);
  };

  const OpenEditModal = (id) => {
    setEditedId(id);
    setOpenEdit(true);
  };
  const CloseEditModal = () => setOpenEdit(false);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Button
          onClick={OpenModal}
          variant="contained"
          startIcon={<Iconify icon={'eva:plus-fill'} />}
          sx={{ marginBottom: '30px' }}
        >
          New Employee
        </Button>

        <Modal open={open} handleClose={CloseModal} onAddEmployee={AddEmployee} />

        <EditModal open={openEdit} handleClose={CloseEditModal} onUpdateourse={updateEmployee} id={editedId} />

        <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
          <Divider />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={employeesList?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      employeesList.map((row) => row.id)
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Delete">
                        <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={employeesList?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      employeesList.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {employeesList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <TableRow key={row._id}>
                        <TableCell />
                        <TableCell>{row.firstname}</TableCell>
                        <TableCell>{row.lastname}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>
                          <Iconify
                            icon={'ep:delete'}
                            sx={{ marginRight: '10px', cursor: 'pointer', fontSize: '20px', color: 'error.dark' }}
                            onClick={() => deleteCourse(row._id)}
                          />
                          <Iconify
                            icon={'clarity:edit-solid'}
                            sx={{ marginRight: '10px', cursor: 'pointer', fontSize: '20px', color: 'primary.dark' }}
                            onClick={() => OpenEditModal(row._id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, employeesList?.length)}
                  />

                  <TableNoData id="check" isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={employeesList === undefined ? 0 : employeesList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
