import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';

const AboutPage = ({ navigation }) => {
  return (
    <ImageBackground 
    source={require('../assets/background.png')} 
    style={styles.background}
  >
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
      <Image source={require('../assets/56.png')} style={styles.image} />

        <Text style={styles.text}>
          Hello King!
          {"\n\n"}
          It's a great pleasure to have you on board.
          {"\n\n"}
          What is Shahcoin?
          {"\n\n"}
          Shah means King in Persian language, which means you are here to mine your coins as a King in your kingdom.
          {"\n\n"}
          By mining your coins, you will be able to enrich your treasury to build your empire before launching the game and earn more.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('KING')}>
          <ImageBackground source={require('../assets/52.png')} style={styles.imageBackground}>
            <Text style={styles.buttonText}></Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 120,
    width: '100%',
    height: '50%',
    marginBottom: 40,

  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: "center",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    backgroundColor: 'rgba(30, 0, 0, 0.8)',
    justifyContent: 'center'
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    marginTop: 12,
    width: 160,
    height: 40,
    justifyContent: 'center',
    resizeMode: 'contain', // Added to ensure image fits within container
  },
  text: {
    color: 'beige',
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 16,
  },
  buttonText: {
    color: 'beige',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AboutPage;
