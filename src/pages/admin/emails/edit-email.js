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
import { EmailEditPostForm } from '../../../sections/@dashboard/blog';
import React from 'react';

import { useRouter } from 'next/router'

// Axios
import axios from '../../../utils/axios';
import { useState, useEffect } from 'react';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';


// ----------------------------------------------------------------------

EmailEditPost.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EmailEditPost(props) {
  const { themeStretch } = useSettings();

  // Pull Router Data
  const router = useRouter()
  const { id } = router.query

  const [emailData, setEmailData] = useState({});


  useEffect(() => {

    axios
    .get(`/api/email/${id}`)
      .then(({ data }) => {
        console.log(data);
        setEmailData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="Email Template: Edit Email">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Edit an Email Template"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Email', href: PATH_DASHBOARD.blog.root },
                { name: 'Edit Email Template' },
              ]}
            />

{ emailData && emailData.body &&
            <EmailEditPostForm data={emailData} id={id} />
}
          </Container>
        </Page>
    </RoleBasedGuard>
    
  );
}
