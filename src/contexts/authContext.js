import { useContext, createContext } from 'react';

import { useQuery } from '@apollo/client';

import FullPageSpinner from '../components/FullPageSpinner';
import { ME_QUERY } from '../graphql/queries';

const AuthContext = createContext();

const AuthProvider = (props) => {
  const { loading, data } = useQuery(ME_QUERY);

  if (loading) {
    return <FullPageSpinner />;
  }

  return <AuthContext.Provider value={{ data: data ? data.me : undefined }} {...props} />;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
