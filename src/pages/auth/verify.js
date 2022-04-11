// next
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Link, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
import axios from '../../utils/axios';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { VerifyCodeForm } from '../../sections/auth/verify-code';
import React, { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';

import { useRouter } from 'next/router';
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';



// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

VerifyCode.getLayout = function getLayout(page) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function VerifyCode() {
  const router = useRouter();


  useEffect(() => {
    // document.getElementById('sendCode').click();
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const { logout } = useAuth();
  const isMountedRef = useIsMountedRef();


  const [isSending, setIsSending] = useState(false);
  const [counter, setCounter] = useState(0);

  const [time, setTime] = useState(60)
  const [disabled, setDisabled] = useState(false)

  const reduceTime = () => {
    let countTime = time;
    const interval = setInterval(()=>{
      console.log(countTime)
      if(countTime == 1){
        clearInterval(interval);
        setDisabled(false);
      }
      setTime(time=> time - 1)
      countTime--;
    }, 1000);

    
  }

  const sendUserCode = async () => {

    setIsSending(true);

    const response = await axios.post('/api/user/session/send-email');
    enqueueSnackbar('Verification Code Sent!', {variant: 'success'});
    setDisabled(true);
    reduceTime();
    setCounter(counter+1);
    setIsSending(false);

  }

  const handleLogout = async () => {
    try {
      await logout();
      router.replace(PATH_AUTH.login);

      if (isMountedRef.current) {
        // handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title="Verify" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {/* <NextLink href={PATH_AUTH.login} passHref> */}
              <Button
                size="small"
                startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} width={20} height={20} />}
                sx={{ mb: 3 }}
                onClick={handleLogout}
              >
                Back
              </Button>
            {/* </NextLink> */}

            <Typography variant="h3" paragraph>
              Please check your email!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            { counter == 0 ? 'Click Send Code to have a 6-digit confirmation code sent to your email.' : 'We have emailed a 6-digit confirmation code to your email for verification.' }
              
            </Typography>

            <Box sx={{ mt: 5, mb: 3 }}>
              <VerifyCodeForm />
            </Box>

            <Typography variant="body2" align="center">
              Don’t have a code? &nbsp;
              <LoadingButton variant="subtitle2" underline="none" onClick={(e) => {sendUserCode(); }} sx={{ cursor: 'pointer' }} loading={isSending} disabled={disabled} id="sendCode">
                { counter == 0 ? 'Send Code' : <>Resend code {time !=0 && `in ${time}` }</> }
              </LoadingButton>
            </Typography>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}