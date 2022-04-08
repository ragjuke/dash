import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object,
};

export default function ProfileAbout({ user }) {
  const { quote, country, email, level_name, referrer_name, level } = user;

  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{quote}</Typography>

        <Stack direction="row">
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body2">
            Lives in &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {country}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'carbon:skill-level-advanced'} />
          <Typography variant="body2">Level: {level_name}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'fa6-solid:people-group'} />
          <Typography variant="body2">Downline Count: {level?.members} members</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'bxs:user-detail'} />
          <Typography variant="body2">Referred by: {referrer_name}</Typography>
        </Stack>


        {/* <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            {role} at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'ic:round-business-center'} />
          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Stack> */}
      </Stack>
    </Card>
  );
}
