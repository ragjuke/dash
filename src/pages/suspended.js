import { m } from 'framer-motion';
import React from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { PageNotFoundIllustration } from '../assets';

import useAuth from '../hooks/useAuth';



// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

PageSuspended.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PageSuspended() {
  const { siteSettings } = useAuth();

  return (
    <Page title="Suspended" sx={{ height: 1 }}>
      <RootStyle>
        <Container component={MotionContainer}>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <m.div variants={varBounce().in}>
              <Typography variant="h3" paragraph>
                Suspended!
              </Typography>
            </m.div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, your account has been suspended by site admin. Contact {siteSettings.email} for further details.
            </Typography>
            {/* <m.div variants={varBounce().in}>
              <PageNotFoundIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
            </m.div> */}
            {/* <NextLink href="/">
              <Button size="large" variant="contained">
                Go to Home
              </Button>
            </NextLink> */}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
