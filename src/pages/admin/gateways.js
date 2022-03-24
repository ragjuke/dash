// @mui
import { Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_ADMIN } from '../../routes/paths';
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
import { AdminGatewayCard } from '../../sections/@dashboard/user/cards';
// react
import { useEffect, useState } from 'react';
// Axios
import axios from '../../utils/axios';
import RoleBasedGuard from 'src/guards/RoleBasedGuard';
import React from 'react';


// ----------------------------------------------------------------------

GatewayCards.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------



export default function GatewayCards() {
  const { themeStretch } = useSettings();
  const [gateways, setGateways] = useState([]);


  useEffect(() => {
    axios
      .get(`/api/gateway`)
      .then(({ data }) => {
        // console.log(data);
        setGateways(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <RoleBasedGuard accessibleRoles="ROLE_ADMIN">
        <Page title="Package Gateways">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading="Gateways"
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Admin', href: PATH_ADMIN.admin.dashboard },
                { name: 'Gateways' },
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
              {gateways.map((pack) => (
                <AdminGatewayCard key={pack.id} packageitem={{ 
                  id: pack.id, name: pack.name, image: pack.img, fixed: pack.fixed_fee, status: pack.status? true : false,
                  valone: pack.val1, valtwo: pack.val2, valthree: pack.val3, minimum: pack.min, percent: pack.perc_fee, exchange: pack.exchange, currency: pack.currency, maximum: pack.max
                }} />
              ))}

            </Box>
          </Container>
        </Page>
    </RoleBasedGuard>
  );
}
