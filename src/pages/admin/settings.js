import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { SiteSettings, AdminToggles } from '../../sections/@dashboard/user/account';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import React from 'react';


// ----------------------------------------------------------------------

UserAccount.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [

    {
      value: 'general',
      icon: <Iconify icon={'bytesize:settings'} width={20} height={20} />,
      component: <SiteSettings />,
    },

    {
      value: 'switches',
      icon: <Iconify icon={'clarity:switch-line'} width={20} height={20} />,
      component: <AdminToggles />,
    },
   
  
  ];

  return (

    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="User: Account Settings">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Site General Settings"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Admin', href: PATH_ADMIN.admin.dashboard },
                { name: 'Site Settings' },
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
