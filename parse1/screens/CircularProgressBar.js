// screens/CircularProgressBar.js

import React from 'react';
import { View, Text, StyleSheet, ImageBackground} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgressBar = ({ progress, size, strokeWidth }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <ImageBackground 
    source={require('../assets/background.png')} 
    style={styles.background}
  >
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#a86641"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#D8B28F"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`${progress}%`}</Text>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: "center",
    alignItems: 'center',
    padding: 5,
    paddingTop:15,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    backgroundColor: 'rgba(30, 0, 0, 0.8)',
    justifyContent: 'center'
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#D8B28F',
  },
});

export default CircularProgressBar;
