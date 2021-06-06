import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// komponent wyświetlający gatunki filmów
export default function Genres({genres, fontSize}) {
  return (
    <View style={styles.genres}>
      {genres.map(genre => {
        return (
          <View key={genre} style={styles.genre}>
            <Text style={[styles.genreText, {fontSize}]}>{genre}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 4,
  },
  genre: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#777',
    marginRight: 4,
    marginBottom: 4,
    color: '#777',
  },
  genreText: {
    color: '#777',
  },
});
