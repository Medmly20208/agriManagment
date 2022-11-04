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
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useTabs from '../../../../hooks/useTabs';
import useSettings from '../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';
// _mock_
import { _invoices } from '../../../../_mock';
// components
import Page from '../../../../components/Page';
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../../components/table';
// sections
import InvoiceAnalytic from '../../invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../invoice/list';

// Add cousre Modal
import Modal from './Modal';

// edit Modal
import EditModal from './EditModal';

// SELECT
import Select from './Select';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'all',
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development',
];

const TABLE_HEAD = [
  { id: 'firstName', label: 'firstName', align: 'left' },
  { id: 'secondName', label: 'secondName', align: 'left' },
  { id: 'field', label: 'field', align: 'left' },
  { id: 'phonenumber', label: 'phonenumber', align: 'left' },
  { id: 'email', label: 'email', align: 'left' },
  { id: 'adress', label: 'adress', align: 'left' },
  { id: 'city', label: 'city', align: 'left' },
  { id: 'coursedocument', label: 'coursedocument', align: 'left' },
  { id: 'cv', label: 'cv', align: 'left' },
  { id: 'Action', label: 'Action', align: 'left' },
];

// ----------------------------------------------------------------------

export default function Courses() {
  const API_ENDPOINT = 'http://localhost:5000';

  const [instructorsList, setInstructorsList] = useState([]);

  const [open, setOpenModal] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [searchType, setSearchType] = useState('');

  // get all isntructors list
  const getAllInstructors = () => {
    axios.get('http://localhost:5000/csfinstructors').then((res) => setInstructorsList(res.data));
  };

  useEffect(() => {
    getAllInstructors();
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

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterService = (event) => {
    setFilterService(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = instructorsList.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = instructorsList.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.edit(id));
  };

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const denseHeight = dense ? 56 : 76;

  const isNotFound =
    (!instructorsList?.length && !!filterName) ||
    (!instructorsList?.length && !!filterStatus) ||
    (!instructorsList?.length && !!filterService) ||
    (!instructorsList?.length && !!filterEndDate) ||
    (!instructorsList?.length && !!filterStartDate);

  const getLengthByStatus = (status) => instructorsList.filter((item) => item.status === status).length;

  const getTotalPriceByStatus = (status) =>
    sumBy(
      instructorsList.filter((item) => item.status === status),
      'totalPrice'
    );

  const getPercentByStatus = (status) => (getLengthByStatus(status) / instructorsList.length) * 100;

  // get all matches
  const getAllMatches = (value) => {
    setFilterName(value);
    if (value.trim().length === 0) {
      getAllInstructors();
    } else {
      axios.get(`http://localhost:5000/csfinstructors/findAllMatchs/${searchType}/${value}`).then((res) => {
        setInstructorsList(res.data);
      });
    }
  };

  // add Instructor
  const AddInstructor = (instructorData) => {
    const { firstname, secondname, field, phonenumber, email, adress, city, coursedocument, cv } = instructorData;

    console.log(instructorData);

    const formData = new FormData();
    const values = {
      firstname,
      secondname,
      field,
      phonenumber,
      email,
      adress,
      city,
      cv,
      coursedocument,
    };

    Object.keys(values).forEach((key) => formData.append(key, values[key]));

    axios.post('http://localhost:5000/csfinstructors/add', formData).then((res) => {
      getAllInstructors();
    });
  };
  // delete Instructor
  const deleteCourse = (id) => {
    axios.delete(`http://localhost:5000/csfinstructors/${id}`).then((res) => {
      getAllInstructors();
    });
  };
  // edit Instructor
  const updateInstructor = (id, newInstructorData) => {
    const { firstname, secondname, field, phonenumber, email, adress, city, coursedocument, cv } = newInstructorData;
    axios
      .post(`http://localhost:5000/csfinstructors/update/${id}`, {
        firstname,
        secondname,
        field,
        phonenumber,
        email,
        adress,
        city,
        coursedocument,
        cv,
      })
      .then((res) => {
        getAllInstructors();
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
    <Page title="Invoice: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Button
          onClick={OpenModal}
          variant="contained"
          startIcon={<Iconify icon={'eva:plus-fill'} />}
          sx={{ marginBottom: '30px' }}
        >
          New Instructor
        </Button>
        <Modal open={open} handleClose={CloseModal} onAddInstructor={AddInstructor} />

        <EditModal open={openEdit} handleClose={CloseEditModal} onEditInstructor={updateInstructor} id={editedId} />

        <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
          <Divider />
          <Stack flexDirection="row" sx={{ padding: '10px' }}>
            <Select value={searchType} setValue={setSearchType} />
            <TextField
              fullWidth
              value={filterName}
              onChange={(event) => getAllMatches(event.target.value)}
              placeholder={`Search Instructor by ${searchType}`}
              sx={{ width: '80%', marginLeft: '10px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={instructorsList?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      instructorsList.map((row) => row.id)
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
                  rowCount={instructorsList?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      instructorsList.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {instructorsList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <TableRow key={row._id}>
                        <TableCell />
                        <TableCell>{row.firstname}</TableCell>
                        <TableCell>{row.secondname}</TableCell>
                        <TableCell>{row.field}</TableCell>
                        <TableCell>{row.phonenumber}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.adress}</TableCell>
                        <TableCell>{row.city}</TableCell>
                        <TableCell align="center">
                          <a href={`http://localhost:5000/${row.coursedocument}`} target="_blank" rel="noreferrer">
                            <Iconify icon={'arcticons:files'} sx={{ fontSize: '20px', color: 'primary.dark' }} />
                          </a>
                        </TableCell>
                        <TableCell align="center">
                          <a href={`http://localhost:5000/${row.cv}`} target="_blank" rel="noreferrer">
                            <Iconify icon={'arcticons:files'} sx={{ fontSize: '20px', color: 'primary.dark' }} />
                          </a>
                        </TableCell>
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
                    emptyRows={emptyRows(page, rowsPerPage, instructorsList?.length)}
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
              count={instructorsList === undefined ? 0 : instructorsList.length}
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
