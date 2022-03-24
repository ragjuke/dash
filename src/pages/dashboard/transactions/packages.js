// @mui
import { Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_ADMIN } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userCards } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { PackageCard } from '../../../sections/@dashboard/user/cards';
// react
import { useEffect, useState } from 'react';
// Axios
import axios from '../../../utils/axios';

import React from 'react';



// ----------------------------------------------------------------------

PackageCards.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------



export default function PackageCards() {
  const { themeStretch } = useSettings();
  const [packages, setPackages] = useState([]);


  useEffect(() => {
    axios
      .get(`/api/package`)
      .then(({ data }) => {
        // console.log(data);
        setPackages(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <Page title="Invesment Packages">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Packages"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Admin', href: PATH_ADMIN.admin.dashboard },
            { name: 'Packages' },
          ]}
        />

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {packages.map((pack) => (
            <PackageCard key={pack.id} packageitem={{ 
              id: pack.id, name: pack.title, cover: pack.img, 
              description: pack.description, minimum: pack.min, percent: `${pack.percent}% in ${pack.time_hours/24} days`, avatarUrl: "https:///", maximum: pack.max
             }} />
          ))}

        </Box>
      </Container>
    </Page>
  );
}
