import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Stack
} from '@mui/material';
import React from 'react';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import DataNotFound from '../../../components/DataNotFound';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { InvListHead, InvListToolbar } from '../../../sections/@dashboard/user/list';

// Axios
import axios from '../../../utils/axios';
import { fDateTime } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'wd_id', label: 'Withdraw ID', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'address', label: 'BTC Address', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'created_at', label: 'Date', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

InvList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function InvList() {
  const theme = useTheme();

  const toReceive = (deposit, percentage)=>{
    let total = deposit + ((deposit*percentage)/100);
    return total;
}

  const { themeStretch } = useSettings();

  const [allInv, setAllInv] = useState([]);
  const [invList, setInvList] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('all');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {

    setLoadingData(true);

    axios
    .get(`/api/withdraws/mine/${filterName}?page=${page}`)
      .then(({ data }) => {

        // setTimeout( () => {
          setAllInv(data);
          setInvList(data.data);
          setRowsPerPage(data.per_page);
          //Remove Loading
          setLoadingData(false);
          // console.log(data);


        // }, 5000)

      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, filterName]);


  const changeFilter = (e, filter)=>{
    e.preventDefault();
    setFilterName(filter);
    setPage('1');
}

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');



  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  // const isNotFound = !filteredUsers.length && Boolean(filterName);
  const isNotFound = true;


  return (
    <Page title="Withdrawals: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Withdrawals List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Transactions', href: PATH_DASHBOARD.transactions.list },
            { name: 'Investments' },
          ]}
          action={
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={0.5}>
                  <Button size="small" variant="contained" color='info' startIcon={<Iconify icon={'bx:border-all'} />} onClick={e=> changeFilter(e, 'all')} >All</Button>

                  <Button size="small" variant="contained" color='success' startIcon={<Iconify icon={'carbon:task-complete'} />} onClick={e=> changeFilter(e, 'paid')} > Paid </Button>
                  <Button size="small" variant="contained" color='warning' startIcon={<Iconify icon={'carbon:pending'} />} onClick={e=> changeFilter(e, 'unpaid')} > Pending </Button>
              </Stack>
          }
        />

        <Card>
          <InvListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            title="Withdrawals List"
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <InvListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={allInv.total}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />

                  {loadingData && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>

                            <div className="dot-carousel" style={{ margin: "0 auto" }}></div>
                            <h3>Loading Data...</h3>
                            
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                
                <TableBody>

                  {invList?.map((row) => {
                    
                    const { wd_id, id, detail, amount, status, created_at } = row;

                    return (
                      <TableRow
                        hover
                        key={id}
                      >
                        <TableCell align="left">{wd_id}</TableCell>
                        <TableCell align="left">${amount}</TableCell>
                        <TableCell align="left">{detail}</TableCell>
                        <TableCell align="left">
                               <Label
                                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                  color={(status == 0 && 'warning') || 'success'}
                                >
                                    {status==0 ? 'Pending' : 'Paid' }
                                </Label>
                        </TableCell>
                        <TableCell align="left">{fDateTime(created_at)}</TableCell>
                        {/* <TableCell align="left">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={(status === 'banned' && 'error') || 'success'}
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}

                        {/* <TableCell align="right">
                          <UserMoreMenu onDelete={() => handleDeleteUser(id)} userName={name} />
                        </TableCell> */}
                      </TableRow>
                    );
                  })}

                </TableBody>
                
                {allInv.total == 0 && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <DataNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
              
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={allInv.total}
            rowsPerPage={rowsPerPage}
            page={page == 0 ? page : page-1}
            onPageChange={(e, page) => setPage(page+1)}
          />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------


