import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import {useSnackbar} from 'notistack'
import React from 'react';

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
  Box,
  Stack,
  Modal
} from '@mui/material';
import { LoadingButton, Masonry } from '@mui/lab';


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
import { TransListHead, TransListToolbar, WdMoreMenu } from '../../sections/@dashboard/user/list';

// Axios
import axios from '../../utils/axios';
import { fDateTime } from 'src/utils/formatTime';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
// import LoadingButton from 'src/theme/overrides/LoadingButton';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tx_id', label: 'Trn. ID', alignRight: false },
  { id: 'details', label: 'Username', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'actions', label: 'Actions', alignRight: false },
];

// ----------------------------------------------------------------------

TransList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function TransList() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '15px',
    p: 4,
    textAlign: 'center'
};

  const [isLoading, setIsLoading] = useState(false);
  const [isPaying, setisPaying] = useState(false);
  
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);


  const { themeStretch } = useSettings();

  const [allTrans, setAllTrans] = useState([]);
  const [transList, setTransList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState('all');
  const [loadingData, setLoadingData] = useState(true);
  const [menuSetData, setMenuSetData] = useState(false);

  useEffect(() => {

    setLoadingData(true);

    axios
    .get(`/api/admin/withdraws/${filterName}?page=${page}`)
      .then(({ data }) => {

        // setTimeout( () => {
          setAllTrans(data);
          // console.log(data.data)
          setTransList(data.data);
          setRowsPerPage(data.per_page);
          //Remove Loading
          setLoadingData(false);
          console.log(data);


        // }, 300)

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


const payUser = (e, id, address, amount, reference) => {
  // setisPaying(true);
  e.target.disabled = true;
// console.log('clicked '+id)
//   return;

  let data = {
    id: id,
    address: address,
    amount: amount,
    reference: reference,
  };

  axios.get('/sanctum/csrf-cookie').then((response) => {
    axios
      .post(`/api/admin/auto-pay-alfacoin`, data)
      .then((response) => {
        const { data } = response;
        if (data === 'paid') {
          enqueueSnackbar('Payment Sent'); //Commented out for now
          // setisPaying(false);
        } else {
          enqueueSnackbar('An Error Occured!');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};


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


  const payAll = (e) => {
    setIsLoading(true);

    e.preventDefault();
          // axios
          //   .post('/api/admin/withdraw-mass', [])
          //   .then((response) => {
          //     console.log(response.data);
          //     enqueueSnackbar('All Payments Made Succesfully!');
          //     setIsLoading(false);
          //   })
          //   .catch((error) => {
          //     console.log(error.response.data);
          //   });

          // Click all Buttons manually
         let btnArray = document.getElementsByClassName("paybtn");
         for(var a=0; a<btnArray.length;a++){ 
          btnArray[allTrans].click();
          // setTimeout(()=>{btnArray[0].click(); }, 3000)
          // setTimeout(()=>{btnArray[1].click(); }, 3000)
        }

    setIsLoading(true);
    setOpen(false);

        

          
  };


  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
          <Page title="Withdrawal: List">
            <Container maxWidth={themeStretch ? false : 'lg'}>
              <HeaderBreadcrumbs
                heading="All User Withdrawals List"
                links={[
                  { name: 'Dashboard', href: PATH_DASHBOARD.root },
                  { name: 'Admin', href: PATH_ADMIN.admin.withdrawals },
                  { name: 'Withdrawals List' },
                ]}
                action={
                  
                    

                          <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={0.5}>

                              <Button variant="contained" color='success' startIcon={<Iconify icon={'akar-icons:money'} />} onClick={e => setOpen(true)} >
                                Pay All Users
                              </Button>
                              <Button size="small" variant="contained" color='info' startIcon={<Iconify icon={'bx:border-all'} />} onClick={e=> changeFilter(e, 'all')} >All</Button>
                              <Button size="small" variant="contained" color='info' startIcon={<Iconify icon={'emojione-monotone:money-bag'} />} onClick={e=> changeFilter(e, 'paid')} > Paid Withdrawals </Button>
                              <Button size="small" variant="contained" color='error' startIcon={<Iconify icon={'bx:money-withdraw'} />} onClick={e=> changeFilter(e, 'unpaid')} > UnPaid Withdrawals</Button>
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

                                  <div Name="dot-carousel" style={{ margin: "0 auto" }}></div>
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
                          
                          const { wd_id, id, user, detail, amount, status, created_at } = row;

                          return (
                            <TableRow
                              hover
                              key={id}
                            >
                              <TableCell align="left">{wd_id}
                                  <Label
                                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                    color={(status == 0 && 'warning') || 'success'}
                                  >
                                    {status == 0 ? 'Unpaid' : 'Paid' }
                                  </Label>
                              </TableCell>
                              <TableCell align="left">
                                {user?.fname} {user?.lname} - ({user?.username})</TableCell>
                              <TableCell align="left">
                                  <Label
                                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                    color={(status == 0 && 'warning') || 'success'}
                                  >
                                    ${amount}
                                  </Label>
                              </TableCell>
                              <TableCell align="left">{detail}</TableCell>
                              <TableCell align="left">{ fDateTime( created_at )}</TableCell>
                              {/* <TableCell align="left">
                                <Label
                                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                  color={(status === 'banned' && 'error') || 'success'}
                                >
                                  {sentenceCase(status)}
                                </Label>
                              </TableCell> */}

                              <TableCell align="right">
                                {status == 0 &&  
                                  <button className="paybtn" onClick={e=> { payUser(e, id, detail, amount, wd_id);}} >Pay User</button>
                                }
                                <WdMoreMenu id={id} detail={detail} amount={amount} wd_id={wd_id} loading={setMenuSetData} />
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



            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-title" variant="h6" component="h2" color="red">
              Are You Sure You Want to Pay All Pending Users on this Page?
          </Typography>

          <Typography sx={{ padding: '10px' }}>
                
          </Typography>

          <LoadingButton variant="outlined" onClick={e=> payAll(e)} loading={isLoading}>Pay All</LoadingButton>
           
        </Box>
      </Modal>



          </Page>
    </RoleBasedGuard>
    
  );
}

// ----------------------------------------------------------------------


