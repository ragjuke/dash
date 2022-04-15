import { sentenceCase } from 'change-case';
import React from 'react';

import { useState, useEffect } from 'react';
import {useSnackbar} from 'notistack'
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
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../routes/paths';
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
import { KycMoreMenu, TransListHead, TransListToolbar, WdMoreMenu } from '../../sections/@dashboard/user/list';

// Axios
import axios from '../../utils/axios';
import { fDateTime } from 'src/utils/formatTime';
import LoadingButton from 'src/theme/overrides/LoadingButton';
import Link from 'src/theme/overrides/Link';
import {kycName} from '../../utils/funcs'
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'user', label: 'User', alignRight: false },
  { id: 'doc_typ', label: 'Doc Type', alignRight: false },
  { id: 'document', label: 'Document', alignRight: false },
  { id: 'submitted', label: 'Submitted', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false },
];

// ----------------------------------------------------------------------

TransList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function TransList() {

  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();


  const { themeStretch } = useSettings();

  const [allTrans, setAllTrans] = useState([]);
  const [transList, setTransList] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('all');
  const [loadingData, setLoadingData] = useState(true);
  const [menuSetData, setMenuSetData] = useState(false);


  useEffect(() => {

    setLoadingData(true);

    axios
    .get(`/api/kyc/${filterName}?page=${page}`)
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

  // const isNotFound = !filteredUsers.length && Boolean(filterName);
  const isNotFound = true;


  const verifyAll = (e) => {
    setIsLoading(true);

    e.preventDefault();
          axios
            .post('/api/kyc/verify-all', [])
            .then((response) => {
              console.log(response.data);
              enqueueSnackbar('All KYC\'s Approved Succesfully!');
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error.response.data);
            });

          
  };


  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="KYC: List">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="All User KYCs List"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Admin', href: PATH_ADMIN.admin.withdrawals },
                { name: 'KYC List' },
              ]}
              action={
                
                  <Button variant="contained" startIcon={<Iconify icon={'akar-icons:money'} />} onClick={e => verifyAll(e)} disabled={isLoading} >
                    Verify All Pending KYCs
                  </Button>
                
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

                            {menuSetData && (<TableRow>
                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>

                                  <div Name="dot-carousel" style={{ margin: "0 auto" }}></div>
                                  <h4 sx={{ color: 'red' }}><span sx={{ color: 'red' }}>wait, request is being processed...</span></h4>
                                  
                                </TableCell>
                              </TableRow>
                            )}

                      {transList?.map((row) => {
                        
                        const { id, user, user_id, front, back, type, number, status, created_at } = row;

                        return (
                          <TableRow
                            hover
                            key={id}
                          >
                            <TableCell align="left">{user?.fname} {user?.lname} ({user?.username})</TableCell>
                            <TableCell align="left">{kycName(type)}</TableCell>
                            <TableCell align="left">  
                                  <NextLink href={`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_USE_PHOTO}/${front}`} passHref>
                                  {/* <NextLink href={`front}`} passHref> */}
                                  <a target="_blank">          
                                    <Typography sx={{ paddingRight: "10px", cursor: "pointer" }}>Front </Typography>
                                  </a>
                                  </NextLink>
                                  <NextLink href={`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_USE_PHOTO}/${back}`} passHref>
                                  {/* <NextLink href={`{back}`} passHref> */}
                                    <a target="_blank">          
                                        <Typography sx={{ paddingRight: "10px", cursor: "pointer" }}>Rear</Typography>
                                    </a>
                                  </NextLink>

                                  {/* <NextLink href={back} passHref> */}
                                    {/* <Link sx={{ typography: 'body2', display: 'inline-flex', fontSize: 13 }}>Rear</Link> */}
                                  {/* </NextLink> */}
                            </TableCell>
                            <TableCell align="left">{number}</TableCell>
                            <TableCell align="left">
                                <Label
                                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                  color={(status === 1 ? 'success' : status === 2 ? 'error' :  'warning')}
                                >
                                  {status === 1 ? 'Approved' : status === 2 ? 'Rejected' : 'Pending' }
                                </Label>
                            </TableCell>

                            <TableCell align="right">
                              <KycMoreMenu id={user_id} loading={setMenuSetData} />
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


