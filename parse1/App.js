import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import CircularProgressBar from './screens/CircularProgressBar';
import AppScreen from './AppScreen';
import { db } from './components/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData } from './api';
const tg = typeof window !== 'undefined' && window.Telegram ? window.Telegram.WebApp : null;
function App() {
  useEffect(() => {
    if (tg) {
      tg.ready();
    }
  }, []);

  const onClose = () => {
    if (tg) {
      tg.close();
    }
  };
  const [progress, setProgress] = useState(0);
  const [isProgressComplete, setIsProgressComplete] = useState(false);

  const [quizData, setQuizData] = useState([]);
  useEffect(() => {
    const getDataa = async () => {
      try {
        const result = await fetchData('tax');
        setQuizData(result);
      } catch (error) {
        console.error(error);
      }
    };
    getDataa();
  }, []);
  console.log(quizData)


  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsProgressComplete(true);
          return prev;
        }
      });
    }, 50);
   
    return () => clearInterval(interval);
  }, []);

  if (!isProgressComplete) {
    return (
      <View style={styles.container}>
        <CircularProgressBar progress={progress} size={200} strokeWidth={20} />
        <Button title="Close" onPress={onClose}></Button>
      </View>
    );
  }

  return <AppScreen />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.8,
    backgroundColor: 'rgba(30, 0, 0, 0.8)',
  },
});


export default App;