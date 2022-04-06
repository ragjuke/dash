import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '../../../../assets';
// next
import NextLink from 'next/link';
import { PATH_ADMIN, PATH_DASHBOARD } from 'src/routes/paths';
import useAuth from '../../../../hooks/useAuth';
import { useState, useEffect } from 'react';


// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string,
};

export default function AppWelcome({ displayName }) {
  const { user, siteSettings } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false)
  const userRole = user.roles;


    // Check Admin Status
    useEffect(() => {

      if(userRole != null){
        if(userRole.includes('ROLE_ADMIN')){
          setIsAdmin(true);
        } 
      }
    
    }, []);


  





  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h4">
          You are Welcome back,
          <br /> 
            {!displayName ? '...' : displayName}!
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          {`${siteSettings.tagline}`}
        </Typography>

        <NextLink href={PATH_DASHBOARD.transactions.deposit} passHref>
            <Button variant="contained" style={{ margin: "5px" }}>Deposit</Button>
        </NextLink>
        <NextLink href={PATH_DASHBOARD.transactions.withdraw} passHref>
            <Button variant="contained" style={{ margin: "5px" }}>Withdraw</Button>
        </NextLink>

        {isAdmin &&
          <NextLink href={PATH_ADMIN.admin.dashboard} passHref><Button variant="contained" style={{ margin: "5px" }}>Admin</Button></NextLink>
        }

      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' },
        }}
      />
    </RootStyle>
  );
}
