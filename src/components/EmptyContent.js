import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
//
import Image from './Image';
import React from 'react';


// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 2),
}));

// ----------------------------------------------------------------------

EmptyContent.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.string,
  amount: PropTypes.string,
};

export default function EmptyContent({ title, description, img, address, amount, ...other }) {
  return (
    <RootStyle {...other}>
      <Image
        disabledEffect
        visibleByDefault
        alt="empty content"
        src={img || 'https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_content.svg'}
        sx={{ height: 240, width: "auto", mb: 3 }}
      />

      <Typography variant="h6" gutterBottom>
        Deposit <span style={{ color: 'red', fontWeight: '500' }}>{amount} BTC</span> to <span style={{ color: 'red', fontWeight: '500' }}>{address}</span> on the BTC network.
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}
