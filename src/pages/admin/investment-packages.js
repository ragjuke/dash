// @mui
import { Container, Box } from '@mui/material';
// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userCards } from '../../_mock';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { AdminPackageCard } from '../../sections/@dashboard/user/cards';
// react
import { useEffect, useState } from 'react';
// Axios
import axios from '../../utils/axios';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
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
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
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
                <AdminPackageCard key={pack.id} packageitem={{ 
                  id: pack.id, name: pack.title, image: pack.img, run: pack.run, bonus: pack.bonus, status: pack.status? true : false,
                  description: pack.description, minimum: pack.min, percent: pack.percent, time: pack.time_hours, maximum: pack.max
                  }} />
              ))}

            </Box>
          </Container>
        </Page>
    </RoleBasedGuard>
  );
}
