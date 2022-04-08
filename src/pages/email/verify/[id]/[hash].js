import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../../routes/paths';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
// sections
import { ResetPasswordDoubleForm } from '../../../../sections/auth/reset-password';
// assets
import { SentIcon } from '../../../../assets';
import { useRouter } from 'next/router';
import React from 'react';
import axios from '../../../../utils/axios'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

ResetPassword.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const router = useRouter();
  
  const { id, hash } = router.query;

  console.log(window.location.pathname + ' ' + id + ' '+ hash);

const [logged, setLogged] = useState('0');

  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const apiPath = `${process.env.HOST_API_KEY}/email/verify?expires=${id}&signature=${hash}`;

  useEffect(() => {
    console.log(apiPath);
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.get(apiPath).then(response => {
            console.log(response.status);
            
        }).catch((error) => {
            console.log(error.response);
            if (error.response != undefined && error.response.data.message == 'Unauthenticated.'){
                setLogged('1');
                // Display an info toast with no title
                
            }
        });
    });
      
}, []);

  return (
    <Page title="Change Password" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {logged == 1 ? (
              <>
                <Typography variant="h3" paragraph>
                  You are Logged Out
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Login to your Account and try visiting the verification link again.
                </Typography>

                <NextLink href={PATH_AUTH.login} passHref>
                  <Button fullWidth size="large" sx={{ mt: 1 }}>
                    Login
                  </Button>
                </NextLink>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Account Successfully Verified
                </Typography>
                <Typography>
                  <br />
                  You can now login.
                </Typography>

                <NextLink href={PATH_AUTH.login} passHref>
                  <Button size="large" variant="contained" sx={{ mt: 5 }}>
                    Dashboard
                  </Button>
                </NextLink>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
