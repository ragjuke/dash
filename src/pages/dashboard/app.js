// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Modal, Typography, Button } from '@mui/material';
import {useState, useEffect} from 'react';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// next
import NextLink from 'next/link';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import { styled } from '@mui/material/styles';

import { FormProvider, RHFTextField } from '../../components/hook-form';
import axios from '../../utils/axios';
import React from 'react';



// sections
import {
  // AppWidget,
  AppWelcome,
  // AppNewInvoice,
  // AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  // AppCurrentPackage,
  AppFiatCurrencies,
  // AppWidgetUSD,
} from '../../sections/@dashboard/general/app';
import Label from 'src/components/Label';
import { PATH_ADMIN, PATH_DASHBOARD } from 'src/routes/paths';
import { LoadingButton } from '@mui/lab';
import AppCopyRef from 'src/sections/@dashboard/general/app/AppCopyRef';

const OverlayStyle = styled('div')(({ theme }) => ({
  // ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  // ...cssStyles().bgBlur({ blur: 2, color: '#005249' }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

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



// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user, ref, txn, txnData } = useAuth();

  // console.log(user)
  const theme = useTheme();
  const { themeStretch } = useSettings();
const [allAlerts, setAllAlerts] = useState(false);
const [isMarking, setIsMarking] = useState(false);

// console.log(btcTicker);

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const markRead = (e) => {
    setIsMarking(true);
    console.log('Marking as Read');
    // Update the Alert Notification for each User
    axios
    .patch('/api/user/update/profile', {alert: 0})
    .then(( response ) => {
      console.log('Alert Status Updated');
    })
    .catch((e) => { console.log('Error')
    });
    
    setIsMarking(false);
    handleClose();
  }

  // Pull Alerts
  useEffect(() => {
    axios
    .get(`/api/alert`)
      .then(({ data }) => {
          setAllAlerts(data.data);
          // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Open Alert Modal
  useEffect(() => {

  if(user.alert > 0){
    setOpen(true);
  }

}, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={8}>
              {user?.kyc == 0 && 

                    <Label color="primary" sx={{ ml: 1 }}>
                        <h3>Upload KYC Document. 
                        <NextLink href={PATH_DASHBOARD.general.kycUpdate} passHref>Verify Now</NextLink>
                        </h3>
                    </Label>
              }

              {user?.alert > 0 && 

              <Label color="warning" sx={{ ml: 1 }}>
                  <h3>New Broadcast from Admin! 
                  <NextLink href={PATH_DASHBOARD.general.alerts} passHref>Click to read.</NextLink>
                  </h3>
              </Label>
              }
          </Grid>
          
          <Grid item xs={12} md={12}>
            <AppWelcome displayName={user?.username} />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid> */}

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Balance"
              percent={parseFloat(2.6)}
              total={Number.parseInt(user?.balance)}
              chartColor={theme.palette.primary.main}
              chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Deposit"
              percent={txnData?.last_deposit}
              total={txnData?.total_deposit}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Withdrawals"
              percent={-0.1}
              total={txnData?.completed_withdraw}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            {/* <AppCurrentPackage txnData={txnData} /> */}
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewInvoice txnData={txn?.data} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated refdata={ref} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppFiatCurrencies />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppCopyRef user={user} />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              {/* <AppWidgetUSD title="Team Deposit" total={user.level.amount} icon={'dashicons:money-alt'} chartData={ ((user.level.amount/user.level_amount)*100).toFixed(2) } /> */}
              {/* <AppWidget title="Total Downline Referrals" total={user.level.members} icon={'eva:person-fill'} color="warning" chartData={ ((user.level.members/user.level_max)*100).toFixed(2) } /> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>






      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-title" variant="h6" component="h2" color="red">
              {!!allAlerts && <div dangerouslySetInnerHTML={{ __html: `${allAlerts[0].title}` }} />}
          </Typography>

          <Typography sx={{ padding: '10px' }}>
                {!!allAlerts && <div dangerouslySetInnerHTML={{ __html: `${allAlerts[0].body}` }} />}
          </Typography>

          <LoadingButton variant="outlined" onClick={e=> markRead(e)} loading={isMarking}>Mark as Read</LoadingButton>
           
        </Box>
      </Modal>


    </Page>
  );
}

const CoinTicker = () =>{

  return (
    <div style={{height: '560px', backgroundColor: '#FFFFFF', overflow: 'hidden', boxSizing: 'border-box', border: '1px solid #56667F', borderRadius: '4px', textAlign: 'right', lineHeight: '14px', fontSize: '12px', fontFeatureSettings: 'normal', textSizeAdjust: '100%', boxShadow: 'inset 0 -20px 0 0 #56667F', padding: '0px', margin: '0px', width: '100%'}}><div style={{height: '540px', padding: '0px', margin: '0px', width: '100%'}}><iframe src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505" width="100%" height="536px" scrolling="auto" marginWidth={0} marginHeight={0} frameBorder={0} border={0} style={{border: 0, margin: 0, padding: 0, lineHeight: '14px'}} /></div><div style={{color: '#FFFFFF', lineHeight: '14px', fontWeight: 400, fontSize: '11px', boxSizing: 'border-box', padding: '2px 6px', width: '100%', fontFamily: 'Verdana, Tahoma, Arial, sans-serif'}}><a href="https://coinlib.io" target="_blank" rel="noreferrer" style={{fontWeight: 500, color: '#FFFFFF', textDecoration: 'none', fontSize: '11px'}}>Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>
  );
}
