import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';

// komponent używany do wskazania ładowania danych gdy zmianiane ekrany
const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#ff2f00" />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
