import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

// komponent wyświetlający ocenę filmu w postaci gwiazdek
export default function Rating({rating, fontSize, iconSize}) {
  const filledStars = Math.floor(rating / 2);
  // wypełniamy listę nazwami typów ikon, które później mapujemy na obiekty tych ikon
  const maxStars = Array(5 - filledStars).fill('staro');
  const r = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={styles.rating}>
      <Text style={[styles.ratingNumber, {fontSize}]}>{rating}</Text>
      {r.map((type, index) => {
        return (
          <Icon
            key={index}
            type="antdesign"
            name={type}
            size={iconSize}
            color="tomato"
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumber: {marginRight: 4, fontFamily: 'Menlo', fontSize: 14},
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
});
