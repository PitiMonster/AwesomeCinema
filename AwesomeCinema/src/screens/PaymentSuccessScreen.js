import React, {useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Fragment,
} from 'react-native';
import {Context as MovieContext} from '../context/MovieContext';
import {Context as AuthContext} from '../context/AuthContext';

import * as Constants from '../constants';

// ekran wyświetlany gdy użytkownik zakupi bilet
const PaymentSuccessScreen = ({navigation}) => {
  const {toMovieList, clearData} = useContext(MovieContext);
  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.successText}>Udało się!</Text>
        <Text style={styles.infoText}>Twój bilet znajduje się na emailu</Text>
      </View>
      <Image
        source={require('../../assets/photo/fajny_pies.png')}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.filledButton} onPress={() => logout()}>
          <Text style={[styles.buttonText, {color: 'white'}]}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => toMovieList(clearData)}>
          <Text style={[styles.buttonText, {color: Constants.COLORS.red}]}>
            Repertuar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  successText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  filledButton: {
    backgroundColor: Constants.COLORS.red,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 3,
  },
  outlineButton: {
    borderColor: Constants.COLORS.red,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 22,
    textAlign: 'center',
  },
});

export default PaymentSuccessScreen;
