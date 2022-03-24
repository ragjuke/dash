import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';

import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node,
};



export default function RoleBasedGuard({ accessibleRoles, children }) {
  const { user } = useAuth();

  // console.log(user);
  const useCurrentRole = () => {
  // Logic here to get current user role
  const userRole = user.roles;
  if(userRole == null){
    return ["MEMBER"]
  }
  return userRole;
};

const currentRole = useCurrentRole();

  if (!currentRole.includes(accessibleRoles)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
