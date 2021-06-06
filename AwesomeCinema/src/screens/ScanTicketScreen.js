import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Modal,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import {Context as AuthContext} from '../context/AuthContext';
import {Context as MovieContext} from '../context/MovieContext';

import * as Constants from '../constants';

// ekran umożliwiający zeksanowanie skanerem biletu przez pracownika
const ScanTicketScreen = ({params}) => {
  const authCtx = useContext(AuthContext);
  const {state, scanTicket, clearScannedTicket} = useContext(MovieContext);

  const [isModal, setIsModal] = useState(false);
  const [scannedText, setScannedText] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    if (state.scannedTicket) setIsModal(true);
  }, [state.scannedTicket]);

  const handleScanCode = data => {
    try {
      setScannedText('');
      data = JSON.parse(data);
      scanTicket(data.ticket_id, data.hash);
    } catch (e) {
      console.log('Scanning error catch ', e);
    }
  };

  const closeModal = () => {
    clearScannedTicket();
    setIsModal(false);
    inputRef?.current?.focus();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/photo/scan_screen_bg.png')}
        style={styles.image}>
        <TouchableOpacity style={styles.logoutBtn} onPress={authCtx.logout}>
          <Text style={styles.logoutText}>Wyloguj</Text>
        </TouchableOpacity>
      </ImageBackground>
      <TextInput
        style={styles.input}
        value={scannedText}
        onChangeText={handleScanCode}
        showSoftInputOnFocus={false}
        autoFocus={true}
        ref={inputRef}
      />
      <Modal visible={isModal} transparent={true} animationType="slide">
        <TouchableOpacity style={styles.backdrop} onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>Nazwa: </Text>
              <Text style={styles.value}>
                {state.scannedTicket?.movie_name.split(' ')[0]}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>Data: </Text>
              <Text style={styles.value}>
                {state.scannedTicket?.date.slice(0, 16)}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>Miejsce: </Text>
              <Text style={styles.value}>
                {state.scannedTicket?.seat_number}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.label}>Email: </Text>
              <Text style={styles.value}>
                {state.scannedTicket?.owner_email}
              </Text>
            </View>
            <TouchableOpacity style={styles.filledBtnCont} onPress={closeModal}>
              <Text style={styles.filledBtnText}>Okej</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  logoutBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    borderBottomColor: Constants.COLORS.red,
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  logoutText: {
    fontSize: 16,
  },
  input: {
    display: 'none',
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#000000cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  filledBtnCont: {
    alignSelf: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: Constants.COLORS.red,
    borderRadius: 5,
    marginTop: 30,
  },
  filledBtnText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ScanTicketScreen;
