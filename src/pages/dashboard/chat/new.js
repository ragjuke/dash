// @mui
import { Container } from '@mui/material';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { SendDMNewForm } from '../../../sections/@dashboard/blog';
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
    <Page title="Send Private Message to User">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Send Private Message to User"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Send Chat' },
          ]}
        />

        <SendDMNewForm />
      </Container>
    </Page>
  );
}
