import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import Layout from '../../layouts';

// routes
import { PATH_AUTH } from '../../routes/paths';
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
  const {push} = useRouter();
  const router = useRouter();
  
  const { ref } = router.query;

  setTimeout(()=>{
    push(`${PATH_AUTH.register}?ref=${ref}`);
    // location.reload();
  }, 
    1000);


  return (
      <>
      Redirecting...
      </>
  );
}
