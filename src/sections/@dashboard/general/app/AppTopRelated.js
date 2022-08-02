import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Card, Rating, CardHeader, Typography, Stack, Divider } from '@mui/material';
// utils
import { fCurrency, fShortenNumber } from '../../../../utils/formatNumber';
import NextLink from 'next/link'
import { PATH_DASHBOARD } from 'src/routes/paths';
// _mock_
import { _appRelated } from '../../../../_mock';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { fDateTime } from 'src/utils/formatTime';

// ----------------------------------------------------------------------

export default function AppTopRelated({ refdata }) {
  // console.log(refdata)
  // const {}

  return (
    <Card>
      <CardHeader title="My Referrals" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {refdata=='You Do Not Have Any Referrals' ? 'You Do Not Have Any Referrals' : refdata.slice(0, 3).map((usr) => (
            <ApplicationItem key={usr.id} usr={usr} />
          ))}
        </Stack>
      </Scrollbar>
      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <NextLink href={PATH_DASHBOARD.user.profile+'?tab=referrals'} passHref>
          <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View All
          </Button>
        </NextLink>
        
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

ApplicationItem.propTypes = {
  app: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    review: PropTypes.number,
    // shortcut: PropTypes.string,
    // system: PropTypes.string,
  }),
};

function ApplicationItem({ usr }) {
  const theme = useTheme();
  const { fname, lname, username, balance, profile_photo_url, last_seen } = usr;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.neutral',
        }}
      >
        <Image src={profile_photo_url} alt={username} sx={{ width: 24, height: 24 }} />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 160 }}>
        <Typography variant="subtitle2">{fname} {lname}</Typography>
        <Stack direction="row" alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
          
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color='success'
          >
            Balance: {fCurrency(balance)}
          </Label>
        </Stack>
      </Box>

      <Stack alignItems="flex-end" sx={{ pr: 3 }}>
        Last Seen
        <Typography variant="caption" sx={{ mt: 0.5, color: 'text.secondary' }}>
          { fDateTime(Date.parse(last_seen.replace(/[-]/g,'/'))) }

        </Typography>
      </Stack>
    </Stack>
  );
}
