import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Stack,
} from '@mui/material';
import React from 'react';


// routes
import { PATH_DASHBOARD, PATH_ADMIN } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import DataNotFound from '../../components/DataNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { DepListHead, DepListToolbar } from '../../sections/@dashboard/user/list';

// Axios
import axios from '../../utils/axios';
import { fDateTime } from 'src/utils/formatTime';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tx_id', label: 'Username', alignRight: false },
  { id: 'description', label: 'Gen. Address', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'btc_amount', label: 'BTC Amount', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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

  const [allTrans, setAllTrans] = useState([]);
  const [transList, setTransList] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('all');
  const [loadingData, setLoadingData] = useState(true);
  

  useEffect(() => {

    setLoadingData(true);

    axios
    .get(`/api/deposits/${filterName}?page=${page}`)
      .then(({ data }) => {

        setTimeout( () => {
          setAllTrans(data);
          setTransList(data.data);
          setRowsPerPage(data.per_page);
          //Remove Loading
          setLoadingData(false);
          console.log(data);
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
        <Page title="Generated Addresses: List">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Generated Addresses List"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Admin', href: PATH_ADMIN.admin.dashboard },
                { name: 'Generated Addresses List' },
              ]}
              action={
                  <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={0.5}>
                      <Button size="small" variant="contained" color="info" startIcon={<Iconify icon={'bx:border-all'} />} onClick={e=> changeFilter(e, 'all')}>All</Button>

                      <Button size="small" variant="contained" color="success" startIcon={<Iconify icon={'carbon:task-complete'} />} sx={{ margin: '10px 0' }} onClick={e=> changeFilter(e, 'complete')} > Complete </Button>
                      <Button size="small" variant="contained" color="warning" startIcon={<Iconify icon={'carbon:pending'} />} sx={{ margin: '10px 0' }} onClick={e=> changeFilter(e, 'pending')} > Pending </Button>

                  </Stack>
              }
            />

            <Card>
              <DepListToolbar
                numSelected={selected.length}
                filterName={filterName}
                changeFilter={changeFilter}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <DepListHead
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
                        
                        const { user, id, address, amount, btc_amount, status, created_at } = row;

                        return (
                          <TableRow
                            hover
                            key={id}
                          >
                            <TableCell align="left">{user.username}</TableCell>
                            <TableCell align="left">{address}</TableCell>
                            <TableCell align="left">${amount}</TableCell>
                            <TableCell align="left">{btc_amount}</TableCell>
                            <TableCell align="left">
                                  <Label
                                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                    color={status == 0 ? 'warning' : 'success'}
                                  >
                                      {status==0 ? 'Pending' : 'Completed'}
                                  </Label>
                              
                            </TableCell>
                            <TableCell align="left"> {fDateTime(created_at)}</TableCell>
                            {/* <TableCell align="left">
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color={(status === 'banned' && 'error') || 'success'}
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell> */}
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


