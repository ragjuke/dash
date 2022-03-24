import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
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
  Stack,
} from '@mui/material';
import React from 'react';

// routes
import { PATH_DASHBOARD, PATH_ADMIN } from '../../../routes/paths';
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
import { TransListHead, TransListToolbar, UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user/list';
import Image from '../../../components/Image';


// Axios
import axios from '../../../utils/axios';
import { fDateTime } from 'src/utils/formatTime';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user', label: 'User', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'last_login', label: 'Last Login', alignRight: false },
  { id: 'ban', label: 'Ban', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'date', label: 'Date Joined', alignRight: false },
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
  const [filterName, setFilterName] = useState('zzxxallxxzz');
  const [loadingData, setLoadingData] = useState(true);
  const [menuSetData, setMenuSetData] = useState(false);

  useEffect(() => {

    setLoadingData(true);

    axios
    .get(`/api/admin/users/${filterName}?page=${page}`)
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


  const changeFilter = (e, filter)=>{
    e.preventDefault();
    setFilterName(filter);
    setPage('1');
}

  // const isNotFound = !filteredUsers.length && Boolean(filterName);
  const isNotFound = true;


  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="Users: List">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="All Users List"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Admin', href: PATH_ADMIN.admin.users },
                { name: 'User\'s List' },
              ]}
              action={
                <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={0.5}>
                      <Button size="small" variant="contained" color='info' startIcon={<Iconify icon={'bx:border-all'} />} onClick={e=> changeFilter(e, 'zzxxallxxzz')} >All</Button>
                      <Button size="small" variant="contained" color='success' startIcon={<Iconify icon={'clarity:email-solid-alerted'} />} onClick={e=> changeFilter(e, 'zzxxemail-verifiedxxzz')} > Email Ver. </Button>
                      <Button size="small" variant="contained" color='success' startIcon={<Iconify icon={'ic:round-paid'} />} onClick={e=> changeFilter(e, 'zzxxpaidxxzz')} > Paid </Button>
                      <Button size="small" variant="contained" color='info' startIcon={<Iconify icon={'noto:free-button'} />} onClick={e=> changeFilter(e, 'zzxxfreexxzz')} > Free </Button>
                      <Button size="small" variant="contained" color='error' startIcon={<Iconify icon={'el:ban-circle'} />} onClick={e=> changeFilter(e, 'zzxxbannedxxzz')} > Banned </Button>
                      <Button size="small" variant="contained" color='info' startIcon={<Iconify icon={'academicons:open-access'} />} onClick={e=> changeFilter(e, 'zzxxubbannedxxzz')} > Unbanned </Button>
                      <Button size="small" variant="contained" color='error' startIcon={<Iconify icon={'ri:admin-fill'} />} onClick={e=> changeFilter(e, 'zzxxsuperxxzz')} > Admins </Button>
                      
                  </Stack>
              }
            />

            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                changeFilter={changeFilter}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
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
                            {menuSetData && (<TableRow>
                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>

                                  <div Name="dot-carousel" style={{ margin: "0 auto" }}></div>
                                  <h4 sx={{ color: 'red' }}><span sx={{ color: 'red' }}>wait, request is being processed...</span></h4>
                                  
                                </TableCell>
                              </TableRow>
                            )}
                      {transList?.map((row) => {
                        
                        const { id, fname, lname, username, email, last_seen, country, tracked_country, banned, ver_status, profile_photo_url, created_at } = row;

                        return (
                          <TableRow
                            hover
                            key={id}
                          >
                            <TableCell align="left">
                            <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  flexShrink: 0,
                                  display: 'flex',
                                  borderRadius: 1.5,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: 'background.neutral',
                                }}
                              >
                                <Image src={profile_photo_url} alt={username} sx={{ width: 24, height: 24 }} />
                              </Box>  
                            </TableCell>
                            <TableCell align="left">{username} - {fname} {lname}</TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{country}</TableCell>
                            <TableCell align="left">{last_seen} from {tracked_country!=null && tracked_country}</TableCell>
                            <TableCell align="left">
                                <Label
                                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                  color={(banned == 1 && 'error') || 'success'}
                                >
                                  {banned == 1 ? 'Banned' : 'Free' }
                                </Label>
                            </TableCell>
                            <TableCell align="left">
                                <Label
                                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                  color={(ver_status == 0 && 'error') || 'success'}
                                >
                                  {ver_status == 1 ? 'Active' : 'Inactive' }
                                </Label>
                            </TableCell>
                            <TableCell align="left">{fDateTime(created_at)}</TableCell>

                            <TableCell align="right">
                              <UserMoreMenu onDelete={() => console.log('Delete')} userName={username} id={id} editPath={PATH_ADMIN.admin.alertEdit} emailPath={PATH_ADMIN.admin.sendEmail} loading={setMenuSetData}/>
                            </TableCell>
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


