import { forwardRef } from 'react';
import PropTypes from 'prop-types';
// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
import React from 'react';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | ${process.env.REACT_APP_WEB_APP_NAME}`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
