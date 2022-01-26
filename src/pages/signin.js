import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import { UserForm } from '../components/UserForm';

const SIGNIN_USER = gql`
  mutation signIp($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

export const SignIn = props => {
  useEffect(() => {
    document.title = 'Sign In - Notedly';
  });

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    }
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signIn" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};
