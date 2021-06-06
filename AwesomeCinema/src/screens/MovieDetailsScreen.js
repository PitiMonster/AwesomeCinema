import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {LinearGradient} from 'expo-linear-gradient';

import Genres from '../components/Genres';
import Rating from '../components/Rating';
import { COLORS } from '../constants';

// komponent wyświetlający szczegóły o jednym filmie
const MovieDetailsScreen = ({route, navigation}) => {
  const item = route.params?.item ?? null;
  const {width, height} = Dimensions.get('window');
  return (
    <View style={{flex: 1, width: width, height: height}}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        style={styles.container}>
        <View style={styles.container}>
          <BackgroundImage
            source={{uri: item.backdrop}}
            style={{
              width,
              height: height * 0.5,
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
            {
              paddingHorizontal: 30,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <Text style={styles.title}>{item.title}</Text>
          <Rating rating={item.rating} fontSize={22} iconSize={20} />
          <Genres genres={item.genres} fontSize={14} />
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('MovieDisplayDates', {item});
        }}>
        <Text style={styles.buttonText}>Zarezerwuj bilet</Text>
      </TouchableOpacity>
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
  description: {
    marginTop: 10,
    fontSize: 15,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.red,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});

export default MovieDetailsScreen;
