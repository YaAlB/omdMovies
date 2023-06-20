import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {useRoute} from '@react-navigation/native';

import RatingAnimation from '../component/RatingAnimation';
import img from '../images/icons/index';
import constants from '../styles/constants';

const Detail = () => {
  const route = useRoute();
  const {movie}: any = route.params;

  const imdbRating: number | undefined =
    parseInt(movie.imdbRating, 10) / 2 ?? undefined;

  return (
    <View style={styles.container}>
      <Image
        source={movie.Poster !== 'N/A' ? {uri: movie.Poster} : img.MoviePoster}
        style={styles.poster}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.year}>{movie.Year}</Text>
        {imdbRating && <RatingAnimation rating={imdbRating} />}
        <Text style={styles.director}>Director: {movie.Director}</Text>
        <Text style={styles.plot}>Plot: {movie.Plot}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  poster: {
    width: 240,
    height: 320,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: constants.space.small,
    textAlign: 'center',
  },
  year: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  plot: {
    fontSize: 16,
    marginBottom: constants.space.small,
  },
  director: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: constants.space.small,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 5,
  },
  ratingScale: {
    fontSize: 16,
    color: '#888',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default Detail;
