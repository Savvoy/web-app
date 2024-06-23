import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';


const InvitePage = () => {
  const handleInviteFriends = () => {
    // Implement your logic here for inviting friends
    console.log("Inviting friends...");
  };
  
  return (
    <ImageBackground 
    source={require('../assets/background.png')} 
    style={styles.background}
  >
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={require('../assets/profile.jpeg')} style={[styles.profileImage, {width: 50, height: 50}]} />
        <Text style={styles.profileName}>Somayah Ali</Text>
        <Image source={require('../assets/53.png')} style={styles.centeredImage} />

      <Text style={[styles.text,{alignSelf:'center',marginTop:20, fontSize:25}]}>INVITE FRIENDS!</Text>
      <Text style={[styles.text,{alignSelf:'center', marginBottom:20, fontSize:9}]}>You and your friend will receive rewards</Text>
      
      <ImageBackground source={require('../assets/43.png')} style={styles.imageBackground}>
        <View style={{marginLeft:90}}>
            <Text style={{color:'white', fontSize:15, marginBottom:5,}}>Invite a friend</Text>
            <Text style={{color:'#D8B28F', fontSize:10}}>$5,000 FOR YOU AND YOUR FRIEND</Text>
        </View>
      </ImageBackground>
      <ImageBackground source={require('../assets/41.png')} style={styles.imageBackground}>
        <View style={{marginLeft:90}}>
            <Text style={{color:'white', fontSize:15, marginBottom:5,}}>Invite a friend with Telegram Premium</Text>
            <Text style={{color:'#D8B28F', fontSize:10}}>$25,000 FOR YOU AND YOUR FRIEND</Text>
        </View>
      </ImageBackground>

      <Text style={[styles.text,{marginTop:25, marginBottom:10}]}>  LIST OF YOUR FRIENDS (2)</Text>
      <ImageBackground source={require('../assets/42.png')} style={styles.imageBackground}>
          <View style={{marginLeft:90}}>
              <Text style={{color:'white', fontSize:15,}}>SAMI RAHMANI</Text>
          </View>
        </ImageBackground>

            <ImageBackground source={require('../assets/42.png')} style={styles.imageBackground}>
        <View style={{marginLeft:90}}>
        <Text style={{color:'white', fontSize:15,}}>SOMAYAH ALI</Text>
        </View>
      </ImageBackground>


      <TouchableOpacity onPress={handleInviteFriends}>
      <ImageBackground source={require('../assets/44.png')} style={styles.imageBackground}>
        <View style={{marginLeft:90}}>
        <Text style={styles.buttonText}>Invite Friends</Text>
        </View>
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
    paddingTop:15,
   
  },
  scrollContainer: {
    alignItems: 'center', // Center the content horizontally
  },
  centeredImage: {
    width: 130,
    height: 19,
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
  imageBackground: {
    width: '100%',
    aspectRatio: 45 / 9, // You can adjust the aspect ratio as needed
    justifyContent: 'center',
    marginBottom: 10, // Adjust the margin between each image
  },
  text: {
    color: 'white', // Set text color to white
    fontSize: 15,
    marginLeft:80
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignSelf:'center'
  },
  profileName: {
    fontSize: 18,
    marginTop: 10,
    color: 'white',
    marginBottom:15,
    alignSelf:'center'
  },
  logos: {
    width: 60,
    height: 65,
    alignSelf: 'flex-start' // Align the logos to the left side of the rectangle
  },
  text: {
    color: 'white', // Set text color to white
    marginLeft: 10, // Add some space between the logo and text
    fontSize: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  rectangle: {
    width: '100%', // Take up 100% width of the page
    aspectRatio: 6, // You can adjust the aspect ratio as needed
    backgroundColor: '#812820', // Background color of the rectangle
    borderRadius: 100, // Border radius for rounded corners
    marginBottom: 10,
    flexDirection: 'row', // Align logo and text horizontally
    alignItems: 'center' // Align logo and text vertically
  },
  rectangle1: {
    width: '100%', // Take up 100% width of the page
    aspectRatio: 6, // You can adjust the aspect ratio as needed
    backgroundColor: '#D8B28F', // Background color of the rectangle
    borderRadius: 100, // Border radius for rounded corners
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    alignSelf:'center',
    marginRight:60,
  }
});

export default InvitePage;
