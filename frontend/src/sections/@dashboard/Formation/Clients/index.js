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

// ----------------------------------------------------------------------
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

const TABLE_HEAD = [];

for (let i = 0; i < clientAttributes.length; i += 1) {
  TABLE_HEAD.push({ id: clientAttributes[i], label: clientAttributes[i], align: 'left' });
}

TABLE_HEAD.push({ id: 'action', label: 'action', align: 'left' });
// ----------------------------------------------------------------------

export default function Clients() {
  const API_ENDPOINT = 'http://localhost:5000';

  const [clientsList, setClientsList] = useState([]);

  const [open, setOpenModal] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [searchType, setSearchType] = useState('');

  const LinkToId = PATH_DASHBOARD.user.clientsId;

  // get all client list
  const getAllclients = () => {
    axios.get('http://localhost:5000/csfclients').then((res) => setClientsList(res.data));
  };

  useEffect(() => {
    getAllclients();
  }, []);

  console.log(clientsList);

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
    const deleteRow = clientsList.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = clientsList.filter((row) => !selected.includes(row.id));
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
    (!clientsList?.length && !!filterName) ||
    (!clientsList?.length && !!filterStatus) ||
    (!clientsList?.length && !!filterService) ||
    (!clientsList?.length && !!filterEndDate) ||
    (!clientsList?.length && !!filterStartDate);

  const getLengthByStatus = (status) => clientsList.filter((item) => item.status === status).length;

  // get all matches
  const getAllMatches = (value) => {
    setFilterName(value);
    if (value.trim().length === 0) {
      getAllclients();
    } else {
      axios.get(`http://localhost:5000/csfclients/findAllMatchs/${value}`).then((res) => {
        setClientsList(res.data);
      });
    }
  };

  // add Client
  const AddClient = (clientData) => {
    console.log(clientData);
    axios
      .post('http://localhost:5000/csfclients/add', clientData)
      .then((res) => {
        getAllclients();
      })
      .catch((e) => console.log('error', e));
  };
  // delete client
  const deleteClient = (id) => {
    axios.delete(`http://localhost:5000/csfclients/${id}`).then((res) => {
      getAllclients();
    });
  };

  // update client
  const updateClient = (id, newClientData) => {
    console.log(id, newClientData);
    axios
      .post(`http://localhost:5000/csfclients/update/${id}`, newClientData)
      .then((res) => {
        getAllclients();
      })
      .catch((e) => console.log(e));
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
          New Client
        </Button>
        <Modal open={open} handleClose={CloseModal} onAddClient={AddClient} />

        <EditModal open={openEdit} handleClose={CloseEditModal} onEditClient={updateClient} id={editedId} />

        <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
          <Divider />
          <Stack flexDirection="row" sx={{ padding: '10px' }}>
            <TextField
              fullWidth
              value={filterName}
              onChange={(event) => getAllMatches(event.target.value)}
              placeholder="Search Client"
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
                  rowCount={clientsList?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      clientsList.map((row) => row.id)
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
                  rowCount={clientsList?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      clientsList.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {clientsList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <TableRow key={row._id}>
                        <TableCell>
                          <Iconify icon={'akar-icons:arrow-up-right'} onClick={() => navigate(LinkToId(row._id))} />
                        </TableCell>

                        {clientAttributes.map((element, index) => {
                          return <TableCell key={index}>{`${row[element] === null ? '' : row[element]}`}</TableCell>;
                        })}
                        <TableCell>
                          <Iconify
                            icon={'ep:delete'}
                            sx={{ marginRight: '10px', cursor: 'pointer', fontSize: '20px', color: 'error.dark' }}
                            onClick={() => deleteClient(row._id)}
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

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, clientsList?.length)} />

                  <TableNoData id="check" isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={clientsList === undefined ? 0 : clientsList.length}
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
