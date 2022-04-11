import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
import Login from '../pages/auth/login';
// components
import LoadingScreen from '../components/LoadingScreen';
import Verify from '../pages/auth/verify';
import Suspended from '../pages/suspended';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized, isEmailTwoFA, user, siteSettings } = useAuth();

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      push(requestedLocation);
    }
  }, [pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if(isAuthenticated && isEmailTwoFA){
    return <Verify />;
  }

   // Chek for Banned Users
   if(isAuthenticated){
    if(user.banned == 1){
      console.log('Your account has been suspended');
     //  return `<h3>Your account has been suspended by site admin. Contact ${siteSettings.email} for further details</h3>`;
      return <Suspended/>
    }
   }
   

  // if (!isAuthenticated) {
  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

 


  // if (isEmailTwoFA){
  //   return <Verify />;
  // }

  return <>{children}</>;
}
