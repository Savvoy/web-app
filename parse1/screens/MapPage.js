import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, ImageBackground } from 'react-native';

export default function MapPage({navigation}){
  return (
    <ImageBackground 
    source={require('../assets/background.png')} 
    style={styles.background}
  >
    <View style={styles.container}>
      {/* <Text style={{color:'white'}} onPress={()=> navigation.navigate('KING')}>KING</Text> */}
      <View style={styles.row}>
        <Text style={{color: 'white'}}>
          <Image source={require('../assets/48.png')} style={{width: 300, height: 300}} />
        </Text>
      </View>
    </View>

    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the full screen
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',
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
  },

});