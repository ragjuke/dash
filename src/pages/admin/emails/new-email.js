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
import { EmailNewPostForm } from '../../../sections/@dashboard/blog';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import React from 'react';

// ----------------------------------------------------------------------

EmailNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EmailNewPost() {
  const { themeStretch } = useSettings();

  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="Email: New Template">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Create a new Email Templates"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Email', href: PATH_ADMIN.admin.emailTemplates },
                { name: 'New Email Template' },
              ]}
            />

            <EmailNewPostForm />
          </Container>
        </Page>
    </RoleBasedGuard>
  );
}
