import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Image } from '@mui/material';

import logoImg from '../components/logo.png'
import React from 'react';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx }, ref) => {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;


  // const logo = <Box component="img" src={logoImg} sx={{ width: 40, height: 40, ...sx }} />;
  const logo = <Box component="img" src="/logo/logo_single.svg" sx={{ width: 40, height: 40, ...sx }} />;

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href="/">{logo}</NextLink>;
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
