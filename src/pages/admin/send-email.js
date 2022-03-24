// @mui
import { Container } from '@mui/material';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { SendEmailNewForm } from '../../sections/@dashboard/blog';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import React from 'react';


// ----------------------------------------------------------------------

AlertNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AlertNewPost(props) {
  const { themeStretch } = useSettings();
  console.log(props)

  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="Send Bulk Email: Email Users">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Send Email to Users"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Admin', href: PATH_ADMIN.admin.dashboard },
                { name: 'Send Bulk Emails' },
              ]}
            />

            <SendEmailNewForm />
          </Container>
        </Page>
    </RoleBasedGuard>
  );
}
