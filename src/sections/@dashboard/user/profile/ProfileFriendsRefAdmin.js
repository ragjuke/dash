import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Card, Link, Avatar, IconButton, Typography, InputAdornment } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import SocialsButton from '../../../../components/SocialsButton';
import SearchNotFound from '../../../../components/SearchNotFound';
import { useState, useEffect } from 'react';

import axios from '../../../../utils/axios';

import {PATH_DASHBOARD, PATH_ADMIN} from '../../../../routes/paths';
import NextLink from 'next/link';


// ----------------------------------------------------------------------

ProfileFriends.propTypes = {
  friends: PropTypes.array,
  findFriends: PropTypes.string,
  onFindFriends: PropTypes.func,
};

export default function ProfileFriends({ friends, findFriends, onFindFriends, user }) {

  const [myfriends, setMyFriends] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {

    if(user != undefined && user.length != 0){

      console.log(user)

        setLoadingData(true);

        axios
        .get(`/api/user/ref/${user.id}`)
          .then(({ data }) => {

              setMyFriends(data);
              //Remove Loading
              setLoadingData(false);
              console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        }



  }, []);


  // const friendFiltered = applyFilter(friends, findFriends);
  const friendFiltered = myfriends;

  const isNotFound = friendFiltered.length === 0;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Referrals
      </Typography>

      <Typography variant="h6" sx={{ mb: 3, color: 'red' }}>
        "{user.username}" was referred by: {user?.referrer_name}
      </Typography>

      {/* <InputStyle
        stretchStart={240}
        value={findFriends}
        onChange={(event) => onFindFriends(event.target.value)}
        placeholder="Find friends..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 5 }}
      /> */}

        <Grid container spacing={3}>

        {myfriends !== 'You Do Not Have Any Referrals' ? friendFiltered.map((friend) => (
          <Grid key={friend.id} item xs={12} md={4}>
            <FriendCard friend={friend} /> 
          </Grid>
        )) :
        <Box sx={{ padding: '20px', border: '1px solid #888', margin: '20px' }}><h3>No Referrals</h3></Box>
        }
        </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findFriends} />
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

FriendCard.propTypes = {
  friend: PropTypes.object,
};

function FriendCard({ friend }) {
  const { id, lname, fname, username, email, country, profile_photo_url } = friend;
  // console.log(friend)

  return (
    <Card
      sx={{
        py: 5,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >

      { profile_photo_url == 'https://ui-avatars.com/api/?name=&color=7F9CF5&background=EBF4FF' ?
      <Avatar alt={username} src={username} sx={{ width: 64, height: 64, mb: 3 }} /> :
      <Avatar alt={username} src={profile_photo_url} sx={{ width: 64, height: 64, mb: 3 }} />
      }
      {/* <Link variant="subtitle1" color="text.primary" href={`${PATH_DASHBOARD.user.ref}/?uid=${id}`}>  */}
      <Link variant="subtitle1" color="text.primary" href={`${PATH_ADMIN.admin.userRoot}/${id}`}> 
            {fname} {lname} ({username})
      </Link>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        {email}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        From: {country}
      </Typography>

      {/* <SocialsButton initialColor /> */}

      <NextLink href={`${PATH_DASHBOARD.chat.new}?uid=${id}&username=${username}`} passHref>
        <IconButton sx={{ top: 8, right: 8, position: 'absolute' }} >
            <Iconify icon={'ant-design:message-filled'} width={20} height={20} />
        </IconButton>
      </NextLink>


    </Card>
  );
}
// ----------------------------------------------------------------------

function applyFilter(array, query) {
  if (query) {
    return array.filter((friend) => friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return array;
}
