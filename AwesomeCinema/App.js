/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  createAppContainer,
  createSwitchNavigator,
} from '@react-navigation/native';

import SplashScreen from 'react-native-splash-screen';

import {navigationRef} from './src/helpers/navigationRef';
import MovieListScreen from './src/screens/MovieListScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import MovieDisplayDatesScreen from './src/screens/MovieDisplayDatesScreen';
import AuthScreen from './src/screens/AuthScreen';
import ChoosePlaceScreen from './src/screens/ChoosePlaceScreen';
import ScanTicketScreen from './src/screens/ScanTicketScreen';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as MovieProvider} from './src/context/MovieContext';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';

const Stack = createStackNavigator();
LogBox.ignoreAllLogs(disable)


// const switchNavigator = createStackNavigator({
//   MovieList: MovieListScreen,
//   MovieDetails: MovieDetailsScreen,
// });

const App = () => {
  //Hide Splash screen on app load.
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieList"
        component={MovieListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieDisplayDates"
        component={MovieDisplayDatesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChoosePlace"
        component={ChoosePlaceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentSuccess"
        component={PaymentSuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScanTicket"
        component={ScanTicketScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView behavior={'height'} style={{flex: 1}}>
        <AuthProvider>
          <MovieProvider>
            <NavigationContainer ref={navigationRef}>
              <App />
            </NavigationContainer>
          </MovieProvider>
        </AuthProvider>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
