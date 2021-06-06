import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  Animated,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';

import {Context as MovieContext} from '../context/MovieContext';

// import {getMovies} from '../api/tmdbAPI';
import Genres from '../components/Genres';
import Rating from '../components/Rating';
import Backdrop from '../components/Backdrop';
import Loading from '../components/Loading';
import SearchBar from 'react-native-searchbar';
import {COLORS} from '../constants';

const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

// wyświetlenie listy filmów
const MovieListScreen = ({navigation}) => {
  const {getMovies, state, clearData} = useContext(MovieContext);

  const [movies, setMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const searchBar = useRef(null);

  useEffect(() => {
    clearData();
  }, [state.hallData]);

  useEffect(() => {
    clearData();
  }, []);

  // pobranie danych o filmach
  useEffect(() => {
    clearData();

    const fetchData = async () => {
      getMovies();
    };

    if (state.movies.length === 0) {
      fetchData(movies);
    } else {
      const movies = state.movies;
      // dodanie left-spacer i right-spacer na początek i koniec listy, aby nie dało się przewinąć filmów za bardzo do boku
      setMovies([{id: 'left-spacer'}, ...movies, {id: 'right-spacer'}]);
      setSearchMovies([{id: 'left-spacer'}, ...movies, {id: 'right-spacer'}]);
    }
  }, [state.movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  // obsługa wyszukiwania
  const handleSearchResults = results => {
    const searchList = movies
      .slice(1, -1)
      .filter(movie =>
        movie.title.toLowerCase().includes(results.toLowerCase()),
      );
    setSearchMovies([{id: 'left-spacer'}, ...searchList, {id: 'right-spacer'}]);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar hidden />
      <Backdrop movies={searchMovies} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={searchMovies}
        keyExtractor={item => item.id}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}) => {
          if (!item.poster) {
            return <View style={{width: SPACER_ITEM_SIZE}} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          // przesunięcie aktualnie wyśrodkowanego elementu w dół o 50 i każdego dalej o 50 w dół bardziej
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
          });
          return (
            <TouchableOpacity
              style={{width: ITEM_SIZE}}
              onPress={() => navigation.navigate('MovieDetails', {item})}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 34,
                  transform: [{translateY}],
                }}>
                <Image source={{uri: item.poster}} style={styles.posterImage} />
                <Text style={{fontSize: 24}} numberOfLines={1}>
                  {item.title}
                </Text>
                <Rating rating={item.rating} fontSize={14} iconSize={12} />
                <Genres genres={item.genres} fontSize={9} />
                <Text style={{fontSize: 12}} numberOfLines={3}>
                  {item.description}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
      {!isSearching && (
        <Icon
          raised
          reverse
          name="search"
          type="EvilIcons"
          color={COLORS.red}
          size={20}
          containerStyle={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
            padding: 0,
          }}
          onPress={() => {
            if (isSearching) {
              searchBar.current.hide();
              setIsSearching(false);
            } else {
              searchBar.current.show();
              setIsSearching(true);
            }
          }}
        />
      )}
      <SearchBar
        ref={searchBar}
        data={movies}
        handleSearch={handleSearchResults}
        onHide={() => setIsSearching(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

export default MovieListScreen;
