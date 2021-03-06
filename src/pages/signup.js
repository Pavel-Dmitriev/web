import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { UserForm } from '../components/UserForm';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

export const SignUp = props => {
  const client = useApolloClient();

  //Добавляем хук мутации
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    // Когда мутация завершена, выводим в консоль JSON Web Token
    onCompleted: data => {
      // Сохраняем токен
      localStorage.setItem('token', data.signUp);
      // Обновляем локальный кеш
      client.writeData({ data: { isLoggedIn: true } });
      // Перенаправляем пользователя на домашнюю страницу
      props.history.push('/');
    }
  });
  useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};
