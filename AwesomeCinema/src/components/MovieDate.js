import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants';

import {navigate} from '../helpers/navigationRef';

// komponent będący elementem listy z temrinarzem grania filmu
const MovieDate = ({item}) => {
  const generateHours = hours =>
    hours.map((hour, index) => (
      <TouchableOpacity
        key={`${hour.hour}-${index}`}
        onPress={() =>
          navigate('ChoosePlace', {screeningId: hour.screeningId})
        }>
        <Text style={{color: '#333', margin: 5, fontSize: 16}}>
          {hour.hour}
        </Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{item.day}</Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {generateHours(item.hours)}
      </View>
      <View style={styles.dividor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    justifyContent: 'flex-start',
  },
  dateText: {
    fontSize: 22,
    color: COLORS.yellow,
  },
  dividor: {
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default MovieDate;
