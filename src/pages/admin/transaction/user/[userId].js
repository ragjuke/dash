import React from 'react';

import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';

// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Stack,
} from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import DataNotFound from '../../../../components/DataNotFound';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import { TransListHead, TransListToolbar } from '../../../../sections/@dashboard/user/list';

// Axios
import axios from '../../../../utils/axios';
import { transPointer } from 'src/utils/funcs';
import { fDateTime } from 'src/utils/formatTime';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tx_id', label: '', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'balance', label: 'Balance', alignRight: false },
  { id: 'fee', label: 'Fee', alignRight: false },
  // { id: 'type', label: 'Trn. Type', alignRight: false },
  { id: 'created_at', label: 'Date', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

TransList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function TransList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const router = useRouter();
  const { userId } = router.query;

  const [allTrans, setAllTrans] = useState([]);
  const [transList, setTransList] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('all');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {

    setLoadingData(true);

    axios
    .get(`/api/user-transactions/${userId}/${filterName}?page=${page}`)
      .then(({ data }) => {

        setTimeout( () => {
          setAllTrans(data);
          setTransList(data.data);
          setRowsPerPage(data.per_page);
          //Remove Loading
          setLoadingData(false);
          // console.log(data);


        }, 300)

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
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
          <Page title="Transactions: List">
            <Container maxWidth={themeStretch ? false : 'lg'}>
              <HeaderBreadcrumbs
                heading={`Single User Transaction List`}
                links={[
                  { name: 'Dashboard', href: PATH_DASHBOARD.root },
                  { name: 'Transactions', href: PATH_DASHBOARD.transactions.list },
                  { name: 'List' },
                ]}
                action={
                  <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={0.5}>
                    
                        <Button size="small" variant="contained" color='info' startIcon={<Iconify icon={'bx:border-all'} />} onClick={e=> changeFilter(e, 'all')} >All</Button>
                        <Button size="small" variant="contained" color='success' startIcon={<Iconify icon={'cil:money'} />} onClick={e=> changeFilter(e, 'deposit')} > Deposit </Button>
                        <Button size="small" variant="contained" color='error' startIcon={<Iconify icon={'bx:money-withdraw'} />} onClick={e=> changeFilter(e, 'withdraw')} > Withdrawal </Button>
                        <Button size="small" variant="contained" color='warning' startIcon={<Iconify icon={'emojione-monotone:money-bag'} />} onClick={e=> changeFilter(e, 'bonus')} > Bonus </Button>
                        <Button size="small" variant="contained" color='success' startIcon={<Iconify icon={'fa6-solid:money-bill'} />} onClick={e=> changeFilter(e, 'lend')} > Investment </Button>
                    </Stack>
                }
              />

              <Card>
                <TransListToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />

                <Scrollbar>
                  <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                      <TransListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        rowCount={allTrans.total}
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

                        {transList?.map((row) => {
                          
                          const { user, id, description, amount, fee, balance, type, created_at } = row;


                          return (
                            <TableRow
                            hover
                            key={id}
                          >
                            <TableCell align="left">{transPointer(type)}</TableCell>
                            <TableCell align="left">{description} - <span style={{ color: 'red' }}>({user.username})</span> </TableCell>
                            <TableCell align="left">

                                    <Label
                                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                      color={
                                        (type > 0 && type <= 10) ? 'success' :
                                        (type > 10 && type <21) ? 'error' :
                                        'success'
                                        }
                                    >
                                        ${amount}
                                    </Label> 
                              </TableCell>
                            <TableCell align="left">${balance}</TableCell>
                            <TableCell align="left">${fee}</TableCell>
                            <TableCell align="left">{fDateTime(created_at)}</TableCell>
                          </TableRow>
                          );
                        })}

                      </TableBody>
                      
                      {allTrans.total == 0 && (
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
                  count={allTrans.total}
                  rowsPerPage={rowsPerPage}
                  page={page == 0 ? page : page-1}
                  onPageChange={(e, page) => setPage(page+1)}
                />
              </Card>
            </Container>
          </Page>
    </RoleBasedGuard>
  );
}

// ----------------------------------------------------------------------


