import { useContext, createContext } from 'react';

import { useQuery, useMutation } from '@apollo/client';

import FullPageSpinner from '../components/FullPageSpinner';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../graphql/mutations';
import { ME_QUERY } from '../graphql/queries';

const AuthContext = createContext();

const AuthProvider = (props) => {
  const { loading, data } = useQuery(ME_QUERY);

  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);
  const [logout] = [() => {}]; // clear the token in localStorage and the user data

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{ data: data.me, login, logout, register }}
      {...props}
    />
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
