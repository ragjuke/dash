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

  return (
    <Avatar
      src={user?.profile_photo_url == 'https://ui-avatars.com/api/?name=&color=7F9CF5&background=EBF4FF' ? 'user.username' : user?.profile_photo_url}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
