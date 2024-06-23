import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Button, ImageBackground, Tabs } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './components/config';

import KING from "./screens/HomePage";
import INVITE from "./screens/InvitePage";
import MAP from "./screens/MapPage";
import TAX from "./screens/TaxPage";
import QUEST from "./screens/QuestPage";
import BOOST from "./screens/BoostPage";
import { createStackNavigator } from '@react-navigation/stack';
import ABOUT from './screens/AboutPage'; 

const HomeName = 'KING'
const InviteName = 'INVITE'
const MapName = 'MAP'
const QuestName = 'QUEST'
const TaxName = 'TAX'
const BoostName = 'BOOST'
const AboutName = 'ABOUT'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppScreen() {

  return (
    
    <NavigationContainer>
    <Tab.Navigator
      initialRouteName={AboutName}
      screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size, backgroundColor,}) => {
        let iconName;
        let rn = route.name;
        
        if (rn === HomeName) {
          iconName = (
            <ImageBackground source={require('./assets/1.png')} style={[styles.imageBackground, focused && styles.focusedImage]}
            >
             
            </ImageBackground>
          );

        } else if (rn === InviteName) {
          iconName = (
            <ImageBackground source={require('./assets/2.png')} style={[styles.imageBackground, focused && styles.focusedImage]}>
             
            </ImageBackground>
          );
          

        } else if (rn === TaxName) {
          iconName = (
            <ImageBackground source={require('./assets/3.png')} style={[styles.imageBackground, focused && styles.focusedImage]}>
             
            </ImageBackground>
          );
        }else if (rn === QuestName) {
          iconName = (
            <ImageBackground source={require('./assets/4.png')} style={[styles.imageBackground, focused && styles.focusedImage]}>
             
            </ImageBackground>
          );
        }else if (rn === MapName) {
          iconName = (
            <ImageBackground source={require('./assets/6.png')} style={[styles.imageBackground, focused && styles.focusedImage]}>
             
            </ImageBackground>
          );
        }else if (rn === BoostName) {
          iconName = (
            <ImageBackground source={require('./assets/6.png')} style={[styles.imageBackground, focused && styles.focusedImage]}>
             
            </ImageBackground>
          );
        }else if (rn === AboutName) {
          iconName = (
            <ImageBackground source={require('./assets/6.png')} style={[styles.imageBackground, focused && styles.focusedImage]}>
             
            </ImageBackground>
          );
        }


        // You can return any component that you like here!
        return iconName;
      },
      
      tabBarActiveTintColor: '#deaf79',
          tabBarInactiveTintColor: 'white',
          tabBarLabelStyle: {
            paddingBottom: 10,
          },
          tabBarStyle: {
            display: 'flex',
          },
    })}
    
    >

    <Tab.Screen name={HomeName} component={KING}  
    options={{ 
      // headerShown: false,
      headerTitle: '',
      tabBarStyle: { shadowColor: '#000',
      shadowOpacity: 0.8,
      backgroundColor: 'rgba(30, 0, 0, 0.8)'} ,
      headerStyle: { backgroundColor: 'rgba(30, 0, 0, 0.8)' ,shadowColor: '#000',
      shadowOpacity: 0.8},
      headerTintColor: '#deaf79', 
      
    }} 
    />
    <Tab.Screen name={InviteName} component={INVITE} options={{ 
      headerTitle: '',
      tabBarStyle: { shadowColor: '#000',
      shadowOpacity: 0.8,
      backgroundColor: 'rgba(30, 0, 0, 0.8)'} ,
      headerStyle: { backgroundColor: 'rgba(30, 0, 0, 0.8)' ,
      shadowColor: '#000',
      shadowOpacity: 0.8,},
      
      headerTintColor: '#deaf79',
    }} />
    <Tab.Screen name={TaxName} component={TAX} options={{ 
      headerTitle: '',
      tabBarStyle: { shadowColor: '#000',
      shadowOpacity: 0.8,
      backgroundColor: 'rgba(30, 0, 0, 0.8)'} ,
      headerStyle: { backgroundColor: 'rgba(30, 0, 0, 0.8)' ,shadowColor: '#000',
      shadowOpacity: 0.8,},
      headerTintColor: '#deaf79',
     
    }} />
    <Tab.Screen name={QuestName} component={QUEST} options={{ 
      headerTitle: '',
      tabBarStyle: { shadowColor: '#000',
      shadowOpacity: 0.8,
      backgroundColor: 'rgba(30, 0, 0, 0.8)'} ,
      headerStyle: { backgroundColor: 'rgba(30, 0, 0, 0.8)' ,shadowColor: '#000',
      shadowOpacity: 0.8,},
      headerTintColor: '#deaf79',
     
    }} />
    <Tab.Screen name={MapName} component={MAP} options={{ 
      headerTitle: '',
      tabBarStyle: { shadowColor: '#000',
      shadowOpacity: 0.8,
      backgroundColor: 'rgba(30, 0, 0, 0.8)'} ,
      headerStyle: { backgroundColor: 'rgba(30, 0, 0, 0.8)' ,shadowColor: '#000',
      shadowOpacity: 0.8,},
      headerTintColor: '#deaf79',
     
    }} />
    
          <Tab.Screen name={BoostName} component={BOOST} options={{ 
          headerTitle: '',

          tabBarStyle: { shadowColor: '#000',
          shadowOpacity: 0.8,
          backgroundColor: 'rgba(30, 0, 0, 0.8)'} ,
          headerStyle: { backgroundColor: 'rgba(30, 0, 0, 0.8)' ,shadowColor: '#000',
          shadowOpacity: 0.8,},
          headerTintColor: '#deaf79',
          tabBarButton: () => null,
          tabBarVisible: false,


        }} />    

        <Tab.Screen name={AboutName} component={ABOUT} options={{ 
          headerTitle: '',

          tabBarStyle: { shadowColor: '#000',
          shadowOpacity: 0.8,
          backgroundColor: 'rgba(30, 0, 0, 0.8)'} ,
          headerStyle: { backgroundColor: 'rgba(30, 0, 0, 0.8)' ,shadowColor: '#000',
          shadowOpacity: 0.8,},
          headerTintColor: '#deaf79',
          tabBarButton: () => null,
          tabBarVisible: false,


        }} />    

  </Tab.Navigator>


       
    </NavigationContainer>
  );
}

export default AppScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: "center",
    alignItems: 'center',
    width:'100%',
    padding: 5,
    paddingTop:15,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    backgroundColor: 'rgba(30, 0, 0, 0.8)',
  },

  pageContainer: {
    alignSelf: "center",
    alignItems: 'center',
    width:'100%',
    padding: 5,
    paddingTop:15,
    
  },
  imageBackground: {
    width:70,
    height:70,
    justifyContent: 'center',
    alignSelf:'center',
  },
  focusedImage: {
    shadowColor: '#ffe4c4',
    shadowOpacity: 2.8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 5, // For Android
  },


});

function mixColors(color1, color2) {
  // Convert hex colors to RGB
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  // Mix the colors
  const mixedColor = {
    r: (rgb1.r + rgb2.r) / 2,
    g: (rgb1.g + rgb2.g) / 2,
    b: (rgb1.b + rgb2.b) / 2,
  };

  // Convert mixed RGB color back to hex
  const mixedHex = rgbToHex(mixedColor.r, mixedColor.g, mixedColor.b);

  return mixedHex;
}

// Helper function to convert hex color to RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

// Helper function to convert RGB to hex color
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}