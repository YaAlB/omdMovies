import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  SafeAreaView,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';

import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import img from '../images/icons/index';
import constants from '../styles/constants';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export interface Movies {
  imdbID: string;
  Poster: string | undefined;
  Title: string;
  Year: string;
}

export interface MovieDetails {
  imdbRating: string | undefined;
  Poster: Movies['Poster'];
  Title: Movies['Title'];
  Year: Movies['Year'];
  Director: string;
  Plot: string;
}

const Home = () => {
  const navigation = useNavigation();
  const API = 'https://www.omdbapi.com/?';
  const omdbapiKey = '4e9060ae';

  const [movies, setMovies] = useState<Movies[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const flatListRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMovies = async () => {
    try {
      const storageKey = `${searchText}-${filterYear}-${page}`;
      const cachedData = await AsyncStorage.getItem(storageKey);

      if (cachedData) {
        const fetchedMovies = JSON.parse(cachedData);
        setMovies(fetchedMovies);
      } else {
        setPage(1);

        const response = await axios.get(
          `${API}s=${encodeURIComponent(
            searchText,
          )}&y=${filterYear}&page=${page}&apikey=${omdbapiKey}`,
        );

        const fetchedMovies = response.data.Search || [];
        if (response.data.Response === 'True') {
          setMovies(fetchedMovies);
        } else {
          setError(response.data.Error);
        }

        // Cache the fetched movies data
        await AsyncStorage.setItem(storageKey, JSON.stringify(fetchedMovies));
      }
      if (page > 1) {
        // Scroll back to the top when loading more movies
        flatListRef.current?.scrollToOffset({offset: 0, animated: true});
      }
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
    } catch (error) {
      console.error(error);
      setMovies([]);
      setError('An error occurred while fetching movies.');
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // Fetch movies whenever the page changes

  const navigateToDetails = async (movie: Movies) => {
    try {
      const response = await axios.get(
        `${API}i=${movie.imdbID}&apikey=${omdbapiKey}`,
      );

      if (response.data.Response === 'True') {
        const movieDetails: MovieDetails = response.data;
        setError(null);
        navigation.navigate('Details', {movie: movieDetails});
      } else {
        setError(response.data.Error);
      }
      // eslint-disable-next-line no-catch-shadow, @typescript-eslint/no-shadow
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching movie details.');
    }
  };

  const renderMovieItem = ({item}: ListRenderItemInfo<Movies>) => (
    <TouchableOpacity onPress={() => navigateToDetails(item)}>
      <View style={styles.movieItemContainer}>
        <Image
          source={item.Poster !== 'N/A' ? {uri: item.Poster} : img.MoviePoster}
          style={styles.movieImage}
        />
        <View style={styles.movieTextContainer}>
          <Text style={styles.movieTitle}>{item.Title}</Text>
          <Text style={styles.movieYear}>{item.Year}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter movie title"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
        <TextInput
          style={styles.yearInput}
          placeholder="Year"
          value={filterYear}
          onChangeText={text => setFilterYear(text)}
          keyboardType="numeric"
        />
        <Button title="Search" onPress={fetchMovies} disabled={!searchText} />
      </View>

      {error ? (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}

      <FlatList
        ref={flatListRef}
        data={movies}
        keyExtractor={item => item.imdbID}
        renderItem={item => renderMovieItem(item)}
      />

      {movies.length > 0 && (
        <View
          style={{
            alignItems: 'center',
          }}>
          <Button title="Load More" onPress={handleLoadMore} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: constants.space.small,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    flex: 1,
    height: constants.height.small,
    borderWidth: 1,
    borderColor: colors.grey,
    marginRight: constants.space.small,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  yearInput: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: colors.grey,
    marginRight: constants.space.small,
    paddingHorizontal: constants.space.small,
    backgroundColor: colors.white,
  },
  movieItemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: constants.space.small,
  },
  movieImage: {
    width: 240,
    height: 320,
    borderRadius: 10,
  },
  movieTextContainer: {
    marginTop: constants.space.small,
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: fonts.size.large,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  movieYear: {
    fontSize: 16,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: constants.space.small,
  },
  error: {
    fontSize: fonts.size.large,
    fontWeight: 'bold',
    color: colors.error,
  },
});

export default Home;
