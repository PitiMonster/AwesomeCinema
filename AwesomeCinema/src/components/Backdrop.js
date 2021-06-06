import React from 'react';
import {View, FlatList, Dimensions, Image, Animated} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.72;
const BACKDROP_HEIGHT = height * 0.6;

/**
 * komponent wyświetlający listę obrazków za elementem listy - filmu
 * @param {*} movies - lista filmów
 * @param {*} scrollX - zmienna animacji
 */
const Backdrop = ({movies, scrollX}) => {
  return (
    <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
      <FlatList
        data={movies}
        keyExtractor={item => item.id + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={({item, index}) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [-width, 0],
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: 'absolute',
                width,
                transform: [{translateX}],
                height,
                overflow: 'hidden',
              }}>
              <Image
                source={{uri: item.backdrop}}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  );
};

export default Backdrop;
