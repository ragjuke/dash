import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD,PATH_ADMIN } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userFeeds, _userFriends, _userGallery, _userFollowers, _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import {
  Activations,
  FundAccount,
  Referrer,
  AdminUserAccount,
  AdminUserToggles
} from '../../../sections/@dashboard/user/account';

import { useRouter } from 'next/router';
import axios from '../../../utils/axios';
import { ProfileFriendsRefAdmin } from 'src/sections/@dashboard/user/profile';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';

import React from 'react';


// ----------------------------------------------------------------------

UserAccount.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserAccount() {

  const { themeStretch } = useSettings();

  const router = useRouter();
  const { userId } = router.query;

  const [userEdit, setUserEdit] = useState([]);
  const [findFriends, setFindFriends] = useState('');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };



  useEffect(() => {
    axios
    .get(`/api/user/${userId}`)
    .then((response) => {
      // console.log(response.data);
      setUserEdit(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);


  const [currentTab, setCurrentTab] = useState('fund_account');

  const ACCOUNT_TABS = [

    {
      value: 'user_account',
      icon: <Iconify icon={'carbon:user-avatar-filled-alt'} width={20} height={20} />,
      component: <AdminUserAccount user={userEdit} />,
    },

    {
      value: 'fund_account',
      icon: <Iconify icon={'icon-park:funds'} width={20} height={20} />,
      component: <FundAccount user={userEdit}/>,
    },

    {
      value: 'activations',
      icon: <Iconify icon={'clarity:switch-line'} width={20} height={20} />,
      component: <AdminUserToggles user={userEdit} />,
    },
    {
      value: 'referrer',
      icon: <Iconify icon={'clarity:users-outline-alerted'} width={20} height={20} />,
      component: <Referrer user={userEdit} />,
    },
    {
      value: 'referrals',
      icon: <Iconify icon={'ph:users-four-light'} width={20} height={20} />,
      component: <ProfileFriendsRefAdmin friends={_userFriends} findFriends={findFriends} onFindFriends={handleFindFriends} user={userEdit} />,
    },
  
  ];

  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
      <Page title="User: Edit Account Settings">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={`Edit User (${userEdit.fname}) Account`}
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'User', href: PATH_DASHBOARD.user.root },
              { name: 'Account Edit' },
            ]}
          />

          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => setCurrentTab(value)}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
              <Tab disableRipple key="sixth" label={capitalCase('Transactions')} icon={<Iconify icon={'icon-park-outline:transaction-order'} width={20} height={20} />} value={"Transactions"} onClick={e=>{ window.location.href = PATH_ADMIN.admin.singleTransaction+'/'+userId }} />
          </Tabs>

          <Box sx={{ mb: 5 }} />

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Container>
      </Page>
    </RoleBasedGuard>
    
  );
}
