import { useApolloClient } from '@apollo/client';
import { Redirect } from 'react-router';

import { useAuth } from '../../contexts/authContext';
import { removeAllCookies, signout } from '../../utils';

const Logout = () => {
  const client = useApolloClient();
  const { data } = useAuth();

  if (process.browser && data) {
    signout(client);
  }

  removeAllCookies();

  return <Redirect to="/home" />;
};

export default Logout;
