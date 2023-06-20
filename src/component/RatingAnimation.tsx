import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const RatingAnimation = ({rating}: any) => {
  const [animatedRating, setAnimatedRating] = useState(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (animatedRating < rating - 1) {
        setAnimatedRating(prevRating => prevRating + 0.1);
      } else {
        clearInterval(animationInterval);
      }
    }, 100);

    return () => {
      clearInterval(animationInterval);
    };
  }, [animatedRating, rating]);

  return (
    <View style={{flexDirection: 'row'}}>
      {[...Array(Math.floor(animatedRating))].map((_, index) => (
        <Text key={index} style={{fontSize: 20, color: 'gold'}}>
          ⭐️
        </Text>
      ))}
      {animatedRating % 1 !== 0 && (
        <Text style={{fontSize: 20, color: 'gold'}}>⭐️</Text>
      )}
    </View>
  );
};

export default RatingAnimation;
