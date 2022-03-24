import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriendsRef,
} from '../../../sections/@dashboard/user/profile';
import React from 'react';

import axios from '../../../utils/axios';
// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

UserProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserProfile() {
    // Pull Router Data
    const router = useRouter()
    const { uid } = router.query


  const { themeStretch } = useSettings();
  // const { user, siteSettings } = useAuth();
  const [user, setUser] = useState([]);

  const [currentTab, setCurrentTab] = useState('referrals');

// Set UserTab Variable
  useEffect(() => {
    axios.get(`/api/user/${uid}`).then(r=>{
      setUser(r.data);
      console.log(r.data);
  });
    
  }, []);



  const [findFriends, setFindFriends] = useState('');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'referrals',
      icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
      component: <ProfileFriendsRef friends={_userFriends} findFriends={findFriends} onFindFriends={handleFindFriends} user={user} />,
    },
    // {
    //   value: 'gallery',
    //   icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
    //   component: <ProfileGallery gallery={_userGallery} />,
    // },
  ];

  // console.log(_userAbout);

  return (
    <Page title="User: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.fname + ' ' + user?.lname || '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover user={user} /> {/* the Cover */}

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
