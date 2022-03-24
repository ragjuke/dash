import Iconify from '../../components/Iconify';
import { PATH_DASHBOARD, PATH_ADMIN } from '../../routes/paths';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';

// next
import NextLink from 'next/link';

// @mui
import { Grid, Box, Container, Typography, Button, Card, CardHeader, Link } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  AnalyticsWidgetSummary,
} from '../../sections/@dashboard/general/analytics';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import React from 'react';


// ----------------------------------------------------------------------

GeneralAnalytics.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();

  const [transData, setTransData] = useState({});
  const [adminTransData, setAdminTransData] = useState({});
  const [transactions, setTransactions] = useState([]);


  useEffect(() => {
    axios
      .get('api/user/transaction/data')
      .then((response) => {
        setTransData(response.data);
        // console.log(response.data);

      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('api/admin/transaction/data')
      .then((response) => {
        setAdminTransData(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('api/transaction/mine/all')
      .then(({ data: { data: trans } }) => {
        setTransactions(trans);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="General: Analytics">
          <Container maxWidth={themeStretch ? false : 'xl'}>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Hi, Welcome back ADMIN
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <AnalyticsWidgetSummary title="Total Deposit" total={adminTransData.total_deposit} icon={'emojione:money-bag'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AnalyticsWidgetSummary title="Total Withdrawal" total={adminTransData.total_withdraw} color="info" icon={'emojione-v1:money-with-wings'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AnalyticsWidgetSummary
                  title="Balance in System"
                  total={adminTransData.total_deposit - adminTransData.total_withdraw}
                  color="warning"
                  icon={'flat-color-icons:money-transfer'}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AnalyticsWidgetSummary title="Deposit last 30 days" total={adminTransData.total_deposit_thirty} color="error" icon={'emojione-v1:money-bag'} />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <Card>
                  <CardHeader title="Investments Control" subheader="Manage all investment settings here" />
                  <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    
                    <NextLink href={PATH_ADMIN.admin.transactions} passHref>
                      <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" >
                        All Transactions
                      </Button>
                    </NextLink>

                    <NextLink href={PATH_ADMIN.admin.withdrawals} passHref>
                      <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" >
                        All Withdrawals
                      </Button>
                    </NextLink>

                    <NextLink href={PATH_ADMIN.admin.packages} passHref>
                      <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" >
                        All Packages
                      </Button>
                    </NextLink>
                  </Box>
                </Card>            
              </Grid>


              <Grid item xs={12} md={6} lg={6}>
                <Card>
                  <CardHeader title="User Management" subheader="Manage all user settings here" />
                  <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    
                    <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" 
                      href={PATH_ADMIN.admin.users}
                      >
                      Manage Users
                    </Button>

                    <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" 
                      href={PATH_ADMIN.admin.kyc}
                      >
                      Manage KYC
                    </Button>

                    <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" 
                      href={PATH_ADMIN.admin.sendEmail}
                      >
                      Send Email
                    </Button>
                  </Box>
                </Card>            
              </Grid>



              <Grid item xs={12} md={6} lg={6}>
                <Card>
                  <CardHeader title="Payment Management" subheader="Manage all payment settings here" />
                  <Box sx={{ p: 3, pb: 1 }} dir="ltr">

                      <NextLink href={PATH_ADMIN.admin.gateways} passHref>
                          <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" >
                            Edit Payment Gateways
                          </Button>
                      </NextLink>

                      <NextLink href={PATH_ADMIN.admin.addresses} passHref>
                          <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" >
                            Deposit Addresses
                          </Button>
                      </NextLink>
                  </Box>
                
                  <CardHeader title="Site Settings" subheader="General site control" />
                  <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    
                    <NextLink href={PATH_ADMIN.admin.settings} passHref>
                        <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" >
                          Edit Site Settings
                        </Button>
                    </NextLink>

                    {/* <NextLink href={PATH_ADMIN.admin.settingsP2p} passHref>
                        <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" >
                          Edit P2P Settings
                        </Button>
                    </NextLink> */}
                  </Box>
                </Card>         

              </Grid>



              <Grid item xs={12} md={6} lg={6}>
                <Card>
                  <CardHeader title="Content Management" subheader="Manage all content here" />
                  <Box sx={{ p: 3, pb: 1 }} dir="ltr">


                    <NextLink href={PATH_ADMIN.admin.news} passHref>
                        <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" >
                          Blogs Content
                        </Button>
                    </NextLink>

                    <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" 
                      href={PATH_ADMIN.admin.pages}
                      >
                      Pages Content
                    </Button>

                    <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" 
                      href={PATH_ADMIN.admin.alerts}
                      >
                      Alerts Content
                    </Button>

                    <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" 
                      href={PATH_ADMIN.admin.emailTemplates}
                      >
                      Edit Email Templates
                    </Button>

                    {/* <Button fullWidth size="large" color="inherit" startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />} sx={{ fontSize: 14, mb: 2 }} variant="contained" 
                      href={PATH_ADMIN.admin.support}
                      >
                      View Support Tickets
                    </Button> */}
                  </Box>
                </Card>            
              </Grid>


            </Grid>
          </Container>
        </Page>
    </RoleBasedGuard>
  );
}
