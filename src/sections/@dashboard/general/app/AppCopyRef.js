import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, CardHeader, Typography, Stack, Button } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// _mock_
import { _appInstalled } from '../../../../_mock';
import { PATH_DASHBOARD } from 'src/routes/paths';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { RHFTextField } from 'src/components/hook-form';
import CopyClipboard from 'src/components/CopyClipboard';

// ----------------------------------------------------------------------

const ItemBlockStyle = styled((props) => <Stack direction="row" alignItems="center" {...props} />)({
  minWidth: 72,
  flex: '1 1',
});

const ItemIconStyle = styled(Iconify)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(0.5),
  color: theme.palette.text.disabled,
}));

// ----------------------------------------------------------------------

export default function AppCopyRef({user}) {

  return (
    <Card>
      <CardHeader title="Referral Link" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          <CopyClipboard value={`https://localhost:5002/ref/${user.username}`} />
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

CountryItem.propTypes = {
  country: PropTypes.shape({
    android: PropTypes.number,
    flag: PropTypes.string,
    name: PropTypes.string,
    windows: PropTypes.number,
  }),
};

function CountryItem({ country }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <ItemBlockStyle sx={{ minWidth: 120 }}>
        <Image disabledEffect alt={country.name} src={country.flag} sx={{ width: 28, mr: 1 }} />
        <Typography variant="subtitle2">{country.name}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={'ant-design:android-filled'} />
        <Typography variant="body2">{fShortenNumber(country.android)}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={'ant-design:windows-filled'} />
        <Typography variant="body2">{fShortenNumber(country.windows)}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle sx={{ minWidth: 88 }}>
        <ItemIconStyle icon={'ant-design:apple-filled'} />
        <Typography variant="body2">{fShortenNumber(country.windows)}</Typography>
      </ItemBlockStyle>
    </Stack>
  );
}
