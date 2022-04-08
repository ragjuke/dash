// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';
import React from 'react';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user, siteSettings } = useAuth();
  {console.log(process.env.REACT_APP_API_URL+process.env.REACT_APP_USE_PHOTO+user?.profile_photo_path)}
  return (
    <Avatar
      src={user?.profile_photo_url == 'https://ui-avatars.com/api/?name=&color=7F9CF5&background=EBF4FF' ? 'user.username' : process.env.REACT_APP_API_URL+process.env.REACT_APP_USE_PHOTO+user?.profile_photo_path}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>

    
  );


}
