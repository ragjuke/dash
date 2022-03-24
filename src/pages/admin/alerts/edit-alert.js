// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { AlertEditPostForm } from '../../../sections/@dashboard/blog';

import { useRouter } from 'next/router';

// Axios
import axios from '../../../utils/axios';
import { useState, useEffect } from 'react';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import React from 'react';

// ----------------------------------------------------------------------

AlertEditPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AlertEditPost(props) {
  const { themeStretch } = useSettings();

  // Pull Router Data
  const router = useRouter()
  const { id } = router.query

  const [alertData, setAlertData] = useState({});


  useEffect(() => {

    axios
    .get(`/api/alert/${id}`)
      .then(({ data }) => {
        console.log(data);
        setAlertData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="Alert: Edit Alert">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Edit a post"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Alert', href: PATH_DASHBOARD.blog.root },
                { name: 'Edit Alert' },
              ]}
            />

{ alertData && alertData.body &&
            <AlertEditPostForm data={alertData} id={id} />
}
          </Container>
        </Page>
    </RoleBasedGuard>
      
  );
}
