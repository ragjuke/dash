// @mui
import { Container } from '@mui/material';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { AlertNewPostForm } from '../../../sections/@dashboard/blog';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import React from 'react';


// ----------------------------------------------------------------------

AlertNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AlertNewPost() {
  const { themeStretch } = useSettings();

  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
          <Page title="Alert: New Alert">
            <Container maxWidth={themeStretch ? false : 'lg'}>
              <HeaderBreadcrumbs
                heading="Create a new Alert Notification"
                links={[
                  { name: 'Dashboard', href: PATH_DASHBOARD.root },
                  { name: 'Alert', href: PATH_ADMIN.admin.alerts },
                  { name: 'New Alert' },
                ]}
              />

              <AlertNewPostForm />
            </Container>
          </Page>
    </RoleBasedGuard>
  );
}
