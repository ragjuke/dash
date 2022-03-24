import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordDoubleForm } from '../../sections/auth/reset-password';
// assets
import { SentIcon } from '../../assets';
import { useRouter } from 'next/router';
import React from 'react';

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
  
  const { resetToken } = router.query;


  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Page title="Change Password" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
              <>
                <Typography variant="h3" paragraph>
                  Update Your Password
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Kindly enter matching passwords below
                </Typography>

                <ResetPasswordDoubleForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} token={resetToken} />

                <NextLink href={PATH_AUTH.login} passHref>
                  <Button fullWidth size="large" sx={{ mt: 1 }}>
                    Back
                  </Button>
                </NextLink>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Your password has been successfully updated.
                </Typography>
                <Typography>
                  <br />
                  You can now login.
                </Typography>

                <NextLink href={PATH_AUTH.login} passHref>
                  <Button size="large" variant="contained" sx={{ mt: 5 }}>
                    Back
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
