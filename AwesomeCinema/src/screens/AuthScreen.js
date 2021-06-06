import React, {useState, useContext} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import AuthForm from '../components/AuthForm';
import {Context as AuthContext} from '../context/AuthContext';

import LoadingIndicator from '../components/LoadingIndicator';

// ekran wyświetlany użytkonwikowi gdy się autoryzuje
const AuthScreen = () => {
  const [authType, setAuthType] = useState('sign-in');
  const {register, login, state} = useContext(AuthContext);

  // funkcja wywołana przy logowaniu
  const signIn = async (email, password) => {
    // send data to API
    await login(email, password, email);
    // navigation.navigate('MovieList');
  };

  // funkcja wywołana przy rejestracji
  const signUp = async (email, password, password2) => {
    // send data to API
    await register(email, password, password2, email);
    setAuthType('sign-in');
  };

  // formularz do logowania
  const signInForm = (
    <AuthForm
      headerText={'Hi Cinema Lover!'}
      type={authType}
      buttonText={'Sign in'}
      changeAuthForm={() => setAuthType('sign-up')}
      onButtonPress={(username, password) => signIn(username, password)}
    />
  );

  //formularz do rejestracji
  const signUpForm = (
    <AuthForm
      headerText={'Join us!'}
      type={authType}
      buttonText={'Sign up'}
      changeAuthForm={() => setAuthType('sign-in')}
      onButtonPress={async (username, password, password2) =>
        await signUp(username, password, password2)
      }
    />
  );

  // w zależności od tego jaki jest stan zmiennej authType wyświetlamy różne formularze
  return (
    <View style={styles.container}>
      {state.loading && <LoadingIndicator />}
      <Image
        source={require('../../assets/photo/cinema_auth.png')}
        style={styles.image}
      />
      {authType === 'sign-in' ? signInForm : signUpForm}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '45%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default AuthScreen;
