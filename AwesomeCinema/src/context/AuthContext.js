import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import {navigate} from '../helpers/navigationRef';

import {BASE_URL} from '../constants';

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const ERROR = 'ERROR';
const LOADING = 'LOADING';

// reducer, który obsługuje akcje związane z autoryzacją użytkownika
// przetrzyuje on aktualne dane tego contextu
const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.payload.token,
        username: action.payload.username,
        errMsg: '',
      };
    case LOGOUT:
      return {token: null, username: '', errMsg: ''};
    case LOADING:
      return {...state, loading: action.payload.loading};
    case ERROR:
      return {...state, errMsg: action.payload};
    default:
      return state;
  }
};

const login = dispatch => async (username, password) => {
  dispatch({type: LOADING, payload: {loading: true}});
  await fetch(`${BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password, email: username}),
  })
    .then(response => response.json())
    .then(async response => {
      const token = response.key;
      // // zapisanie 'token' oraz 'username' w pamięci urządzenia
      // // aby umożliwić automatyczne logowanie
      await AsyncStorage.setItem('token', token);
      // await AsyncStorage.setItem('username', usrname);
      dispatch({type: LOGIN, payload: {token}});
      isStaff();
    })
    .catch(error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      dispatch({
        type: ERROR,
        payload: error,
      });
    });
  dispatch({type: LOADING, payload: {loading: false}});
};
const register = dispatch => async (email, password1, password2) => {
  dispatch({type: LOADING, payload: {loading: true}});
  await fetch(`${BASE_URL}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username: email, password1, password2, email}),
  })
    .then(response => JSON.stringify(response))
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: ERROR,
        payload: error?.response?.data?.error,
      });
    });
  dispatch({type: LOADING, payload: {loading: false}});
};

const logout = dispatch => async () => {
  // usunięcie danych użytkownika z urządzenia
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('username');
  dispatch({type: LOGOUT});
  navigate('Auth');
};

const isStaff = async () => {
  const token = await AsyncStorage.getItem('token');
  await fetch(`${BASE_URL}/cinema/is_staff`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(response => {
      // jeśli loguje się pracownik przekierowanie do ekranu skanowania biletu
      // jeśli to klient to do listy filmów
      if (response.is_staff) navigate('ScanTicket');
      else navigate('MovieList');
    })
    .catch(error => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    });
};

// stworzenie i eksport Provider i Context dające dostęp do powyższych funkcji i danych
export const {Provider, Context} = createDataContext(
  authReducer,
  {login, logout, register},
  {token: null, username: '', errMsg: '', loading: false},
);
