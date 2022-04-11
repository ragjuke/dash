import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Step, Stepper, Container, StepLabel, StepConnector, Stack } from '@mui/material';
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
import {
  Withdraw
} from '../../../sections/@dashboard/e-commerce/checkout';

import axios from '../../../utils/axios';
import React from 'react';
import NextLink from 'next/link';


// ----------------------------------------------------------------------

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

  const isMountedRef = useIsMountedRef();

  const { checkout } = useSelector((state) => state.product);

  const { cart, billing, activeStep } = checkout;

  const [btcPrice, setBtcPrice] = useState([]);


  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  return (
    <Page title="Withdraw Fund">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Withdraw"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Transactions',
              href: PATH_DASHBOARD.transactions.list,
            },
            { name: 'Withdraw' },
          ]}

          action={
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={0.5}>
                <NextLink href={PATH_DASHBOARD.transactions.withdrawals} passHref>
                  <Button size="small" variant="contained" color='error' startIcon={<Iconify icon={'carbon:task-complete'} />} > View all withdrawals </Button>
                </NextLink>
              </Stack>
          }

        />

        <Withdraw />
        
      </Container>
    </Page>
  );
}
