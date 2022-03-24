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
import { PageNewPostForm } from '../../../sections/@dashboard/blog';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import React from 'react';

// ----------------------------------------------------------------------

PageNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function PageNewPost() {
  const { themeStretch } = useSettings();

  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="Page: New Page">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Create a new Page"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Pages', href: PATH_ADMIN.admin.pages },
                { name: 'New Page' },
              ]}
            />

            <PageNewPostForm />
          </Container>
        </Page>
    </RoleBasedGuard>
  );
}
