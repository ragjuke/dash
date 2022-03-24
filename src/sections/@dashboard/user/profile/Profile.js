import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfileFollowInfo from './ProfileFollowInfo';
import { AccountGeneral } from '../../../@dashboard/user/account';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile({ user, posts }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo user={user} />
          <ProfileAbout user={user} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <AccountGeneral />
        </Stack>
      </Grid>
    </Grid>
  );
}
