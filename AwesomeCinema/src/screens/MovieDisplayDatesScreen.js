import React, {useEffect, useContext, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';

import {BackgroundImage} from 'react-native-elements/dist/config';
import {LinearGradient} from 'expo-linear-gradient';

import {Context as MovieContext} from '../context/MovieContext';

import MovieDate from '../components/MovieDate';
import Loading from '../components/Loading';

// gruopwanie otrzymanych dat
// klucz to dzień
// wartość to lista godzin odegrania seansu w danym dniu
const createGroupedDatesList = screenings => {
  let dateArray = screenings[0].date.split(' ');
  let day = dateArray[0].replace(/\d{4}\//g, '');
  let hours = [{hour: dateArray[1], screeningId: screenings[0].id}];

  let currDay;

  const result = [];

  for (let i = 1; i < screenings.length; i++) {
    dateArray = screenings[i].date.split(' ');
    currDay = dateArray[0].replace(/\d{4}\//g, '');

    if (currDay === day) {
      hours.push({hour: dateArray[1], screeningId: screenings[i].id});
    } else {
      const dict = {day, hours};
      result.push(dict);
      day = currDay;
      hours = [{hour: dateArray[1], screeningId: screenings[i].id}];
    }
  }
  return result;
};

// ekran wyświetlający godziny i dni konkretnego seansu
const MovieDisplayDatesScreen = ({route, navigation}) => {
  const item = route.params?.item ?? null;
  const {width, height} = Dimensions.get('window');
  const {state, getScreenings, clearData} = useContext(MovieContext);

  const [screenings, setScreenings] = useState([]);

  // pobranie godzin odegrania seansu z serwera
  useEffect(() => {
    const fetchData = async () => {
      getScreenings(item.id);
    };
    if (state.screenings.length === 0) {
      fetchData();
    } else {
      setScreenings(state.screenings);
    }
  }, [state.screenings]);

  if (screenings.length === 0) {
    return <Loading />;
  }

  return (
    <View style={{flex: 1, width: width, height: height}}>
      <View style={styles.container}>
        <BackgroundImage
          source={{uri: item.backdrop}}
          style={{
            width,
            height: height * 0.7,
            flex: 1,
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'white']}
          style={{
            height: height * 0.3,
            width,
            position: 'absolute',
            bottom: 0,
          }}
        />
      </View>
      <View
        style={[
          styles.container,
          {alignItems: 'center', justifyContent: 'center'},
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.reservation}>Daty seansów</Text>
        <FlatList
          data={createGroupedDatesList(state.screenings)}
          keyExtractor={item => item.day}
          renderItem={({item}) => <MovieDate item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reservation: {
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
  },
});

export default MovieDisplayDatesScreen;
