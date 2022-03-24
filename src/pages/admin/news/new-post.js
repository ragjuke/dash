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
import { BlogNewPostForm } from '../../../sections/@dashboard/blog';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import React from 'react';

// ----------------------------------------------------------------------

BlogNewPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();

  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="Blog: New Post">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Create a new post"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Blogs', href: PATH_ADMIN.admin.news },
                { name: 'New Post' },
              ]}
            />

            <BlogNewPostForm />
          </Container>
        </Page>
    </RoleBasedGuard>
  );
}
