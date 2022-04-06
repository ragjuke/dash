import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Step, Stepper, Container, StepLabel, StepConnector, Card, CardHeader, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCart, createBilling } from '../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections

import axios from '../../../utils/axios';
import {axios as realxios} from 'axios';

import { fDateTime } from 'src/utils/formatTime';

import React from 'react';

// ----------------------------------------------------------------------

const STEPS = ['Input amount in USD', 'Generate payment address', 'Make deposit'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Iconify icon={'eva:checkmark-fill'} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
          }}
        />
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

EcommerceCheckout.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceCheckout() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const { cart, billing, activeStep } = checkout;
  const [allAlerts, setAllAlerts] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  
  
  useEffect(() => {

       // Update the Alert Notification for each User
       axios
       .patch('/api/user/update/profile', {alert: 0})
       .then(( response ) => {
         console.log('Alert Status Updated');
       })
       .catch((e) => { console.log('Error')
       });



  }, []);


  useEffect(() => {

    setLoadingData(true);

    axios
    .get(`/api/alert`)
      .then(({ data }) => {
          setAllAlerts(data.data);
          setLoadingData(false);
          console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  return (
    <Page title="Alerts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Admin Notification Alerts"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'User',
              href: PATH_DASHBOARD.general.app,
            },
            { name: 'Alerts' },
          ]}
        />

        <Grid container justifyContent='flex-start'>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
           
          </Grid>
        </Grid>

        <Grid item xs={12} md={12}>

                    {allAlerts?.map((row) => {

                            return (

                                <Card sx={{ mb: 3 }} key={row.id}>
                                  <CardHeader
                                    title={
                                      <Typography variant="h6">
                                        {row.title}
                                        <Typography component="span" sx={{ color: 'text.secondary' }}>
                                          &nbsp;({fDateTime(row.created_at)} )
                                        </Typography>
                                      </Typography>
                                    }
                                    sx={{ mb: '3px' }}
                                  />
                                  <Typography sx={{ padding: '20px', borderTop: '1px dotted #E33' }}>
                                      {<div dangerouslySetInnerHTML={{ __html: `${row.body}` }} />}
                                  </Typography>

                                </Card>
                            );
                    })}




        
      </Grid>

        
      </Container>
    </Page>
  );
}
