import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground, ScrollView, Linking } from 'react-native';
import { fetchData, createData, updateData, deleteData, executeQuery } from '../api';
import CustomReward from './CustomReward';

const QuestPage = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [kingId, setKingId] = useState(null);
  const [questId, setQuestId] = useState(null);
  const [lastClickedTime1, setLastClickedTime1] = useState('0000-00-00 00:00:00');
  const [lastClickedTime2, setLastClickedTime2] = useState('0000-00-00 00:00:00');
  const [lastClickedTime3, setLastClickedTime3] = useState('0000-00-00 00:00:00');
  const [lastClickedTime4, setLastClickedTime4] = useState('0000-00-00 00:00:00');
  const [lastClickedTime5, setLastClickedTime5] = useState('0000-00-00 00:00:00');
  const [lastClickedTime6, setLastClickedTime6] = useState('0000-00-00 00:00:00');
  const [lastClickedTime0, setLastClickedTime0] = useState('0000-00-00 00:00:00');

  const [buttonDisabled1, setButtonDisabled1] = useState(true);
  const [buttonDisabled2, setButtonDisabled2] = useState(true);
  const [buttonDisabled3, setButtonDisabled3] = useState(true);
  const [buttonDisabled4, setButtonDisabled4] = useState(true);
  const [buttonDisabled5, setButtonDisabled5] = useState(true);
  const [buttonDisabled6, setButtonDisabled6] = useState(true);
  const [buttonDisabled0, setButtonDisabled0] = useState(true);
  const [showAlert, setShowAlert] = useState(false);


  const handleOpenAlert = () => {
    setShowAlert(true);
    
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const fetchDataPeriodically = async () => {
    try {
      const kingData = await fetchData('king');
      if (kingData && kingData.length > 0) {
        setTotalCoins(kingData[0].totalCoins);
        setKingId(kingData[0].id);
      }
  
      const questData = await fetchData('quest');
      if (questData && questData.length > 0) {
        setLastClickedTime0(questData[0].lastClickedTime0);
        setLastClickedTime1(questData[0].lastClickedTime1);
        setLastClickedTime2(questData[0].lastClickedTime2);
        setLastClickedTime3(questData[0].lastClickedTime3);
        setLastClickedTime4(questData[0].lastClickedTime4);
        setLastClickedTime5(questData[0].lastClickedTime5);
        setLastClickedTime6(questData[0].lastClickedTime6);

        setQuestId(questData[0].id);
      } else {
        console.log('No data in quest table. Creating new entry...');
        const newTimestamp = new Date().toISOString();
        const newQuestData = await createData('quest', {
          lastClickedTime0: newTimestamp,
          lastClickedTime1: newTimestamp,
          lastClickedTime2: newTimestamp,
          lastClickedTime3: newTimestamp,
          lastClickedTime4: newTimestamp,
          lastClickedTime5: newTimestamp,
          lastClickedTime6: newTimestamp,
        });
        setLastClickedTime0(newTimestamp);
        setLastClickedTime1(newTimestamp);
        setLastClickedTime2(newTimestamp);
        setLastClickedTime3(newTimestamp);
        setLastClickedTime4(newTimestamp);
        setLastClickedTime5(newTimestamp);
        setLastClickedTime6(newTimestamp);

  
        setQuestId(newQuestData.id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataPeriodically();
    const intervalId = setInterval(fetchDataPeriodically, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (kingId && questId) {
      const lastClicked0 = new Date(lastClickedTime0).getTime();
      const lastClicked1 = new Date(lastClickedTime1).getTime();
      const lastClicked2 = new Date(lastClickedTime2).getTime();
      const lastClicked3 = new Date(lastClickedTime3).getTime();
      const lastClicked4 = new Date(lastClickedTime4).getTime();
      const lastClicked5 = new Date(lastClickedTime5).getTime();
      const lastClicked6 = new Date(lastClickedTime6).getTime();
      const currentTime = Date.now();
      const timeDifference0 = currentTime - lastClicked0;
      const timeDifference1 = currentTime - lastClicked1;
      const timeDifference2 = currentTime - lastClicked2;
      const timeDifference3 = currentTime - lastClicked3;
      const timeDifference4 = currentTime - lastClicked4;
      const timeDifference5 = currentTime - lastClicked5;
      const timeDifference6 = currentTime - lastClicked6;

      setButtonDisabled0(timeDifference0 < 24 * 60 * 60 * 1000);
      setButtonDisabled1(timeDifference1 < 24 * 60 * 60 * 1000);
      setButtonDisabled2(timeDifference2 < 24 * 60 * 60 * 1000);
      setButtonDisabled3(timeDifference3 < 24 * 60 * 60 * 1000);
      setButtonDisabled4(timeDifference4 < 24 * 60 * 60 * 1000);
      setButtonDisabled5(timeDifference5 < 24 * 60 * 60 * 1000);
      setButtonDisabled6(timeDifference6 < 24 * 60 * 60 * 1000);

    }
  }, [kingId, questId,lastClickedTime0, lastClickedTime1, lastClickedTime2, lastClickedTime3, lastClickedTime4, lastClickedTime5, lastClickedTime6]);


  const handlePress0 = async () => {
    try {
      await Linking.openURL('https://www.instagram.com/savv0y/')
        .then(async () => {
          setButtonDisabled0(true); // Disable the button after successfully opening the link
  
          // Ensure kingId and questId are available before updating
          if (kingId && questId) {
            // Update total coins
            await updateData('king', kingId, { totalCoins: totalCoins + 1000 });
            setTotalCoins(totalCoins + 1000);
  
            // Update lastClickedTime
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            const newTimestamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
                          
            await updateData('quest', questId, { lastClickedTime0: newTimestamp });
            setLastClickedTime0(newTimestamp);
          } else {
            console.error('King ID or Quest ID is missing.');
          }
        })
        .catch(error => {
          console.error('Failed to open link: ', error);
        });
    } catch (error) {
      console.error('Error in handlePress:', error);
    }
  };
  
  const handlePress1 = async () => {
    try {
      await Linking.openURL('https://www.instagram.com/qqq/')
        .then(async () => {
          setButtonDisabled1(true); // Disable the button after successfully opening the link
  
          // Ensure kingId and questId are available before updating
          if (kingId && questId) {
            // Update total coins
            await updateData('king', kingId, { totalCoins: totalCoins + 1000 });
            setTotalCoins(totalCoins + 1000);
  
            // Update lastClickedTime
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            const newTimestamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
                          
            await updateData('quest', questId, { lastClickedTime1: newTimestamp });
            setLastClickedTime1(newTimestamp);
          } else {
            console.error('King ID or Quest ID is missing.');
          }
        })
        .catch(error => {
          console.error('Failed to open link: ', error);
        });
    } catch (error) {
      console.error('Error in handlePress:', error);
    }
  };

  const handlePress2 = async () => {
    try {
      await Linking.openURL('https://www.instagram.com/nnn__/')
        .then(async () => {
          setButtonDisabled2(true); // Disable the button after successfully opening the link
  
          // Ensure kingId and questId are available before updating
          if (kingId && questId) {
            // Update total coins
            await updateData('king', kingId, { totalCoins: totalCoins + 1000 });
            setTotalCoins(totalCoins + 1000);
  
            // Update lastClickedTime
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            const newTimestamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
                          
            await updateData('quest', questId, { lastClickedTime2: newTimestamp });
            setLastClickedTime2(newTimestamp);
          } else {
            console.error('King ID or Quest ID is missing.');
          }
        })
        .catch(error => {
          console.error('Failed to open link: ', error);
        });
    } catch (error) {
      console.error('Error in handlePress:', error);
    }
  };

  const handlePress3 = async () => {
    try {
      await Linking.openURL('https://www.instagram.com/savv0y/')
        .then(async () => {
          setButtonDisabled3(true); // Disable the button after successfully opening the link
  
          // Ensure kingId and questId are available before updating
          if (kingId && questId) {
            // Update total coins
            await updateData('king', kingId, { totalCoins: totalCoins + 1000 });
            setTotalCoins(totalCoins + 1000);
  
            // Update lastClickedTime
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            const newTimestamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
                          
            await updateData('quest', questId, { lastClickedTime3: newTimestamp });
            setLastClickedTime3(newTimestamp);
          } else {
            console.error('King ID or Quest ID is missing.');
          }
        })
        .catch(error => {
          console.error('Failed to open link: ', error);
        });
    } catch (error) {
      console.error('Error in handlePress:', error);
    }
  };

  const handlePress4 = async () => {
    try {
      await Linking.openURL('https://www.instagram.com/savv0y/')
        .then(async () => {
          setButtonDisabled4(true); // Disable the button after successfully opening the link
  
          // Ensure kingId and questId are available before updating
          if (kingId && questId) {
            // Update total coins
            await updateData('king', kingId, { totalCoins: totalCoins + 1000 });
            setTotalCoins(totalCoins + 1000);
  
            // Update lastClickedTime
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            const newTimestamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
                          
            await updateData('quest', questId, { lastClickedTime4: newTimestamp });
            setLastClickedTime4(newTimestamp);
          } else {
            console.error('King ID or Quest ID is missing.');
          }
        })
        .catch(error => {
          console.error('Failed to open link: ', error);
        });
    } catch (error) {
      console.error('Error in handlePress:', error);
    }
  };

  const handlePress5 = async () => {
    try {
      await Linking.openURL('https://www.instagram.com/savv0y/')
        .then(async () => {
          setButtonDisabled5(true); // Disable the button after successfully opening the link
  
          // Ensure kingId and questId are available before updating
          if (kingId && questId) {
            // Update total coins
            await updateData('king', kingId, { totalCoins: totalCoins + 1000 });
            setTotalCoins(totalCoins + 1000);
  
            // Update lastClickedTime
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            const newTimestamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
                          
            await updateData('quest', questId, { lastClickedTime5: newTimestamp });
            setLastClickedTime5(newTimestamp);
          } else {
            console.error('King ID or Quest ID is missing.');
          }
        })
        .catch(error => {
          console.error('Failed to open link: ', error);
        });
    } catch (error) {
      console.error('Error in handlePress:', error);
    }
  };

  const handlePress6 = async () => {
    try {
      await Linking.openURL('https://www.instagram.com/savv0y/')
        .then(async () => {
          setButtonDisabled6(true); // Disable the button after successfully opening the link
  
          // Ensure kingId and questId are available before updating
          if (kingId && questId) {
            // Update total coins
            await updateData('king', kingId, { totalCoins: totalCoins + 1000 });
            setTotalCoins(totalCoins + 1000);
  
            // Update lastClickedTime
            const currentDate = new Date();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');
            const newTimestamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
                          
            await updateData('quest', questId, { lastClickedTime6: newTimestamp });
            setLastClickedTime6(newTimestamp);
          } else {
            console.error('King ID or Quest ID is missing.');
          }
        })
        .catch(error => {
          console.error('Failed to open link: ', error);
        });
    } catch (error) {
      console.error('Error in handlePress:', error);
    }
  };


  useEffect(() => {
    const fetchLastClickedTime = async () => {
      try {
        const questData = await fetchData('quest');
        if (questData && questData.length > 0) {
          const lastClickedTime0FromDB = questData[0].lastClickedTime0;
          const lastClickedTime1FromDB = questData[0].lastClickedTime1;
          const lastClickedTime2FromDB = questData[0].lastClickedTime2;
          const lastClickedTime3FromDB = questData[0].lastClickedTime3;
          const lastClickedTime4FromDB = questData[0].lastClickedTime4;
          const lastClickedTime5FromDB = questData[0].lastClickedTime5;
          const lastClickedTime6FromDB = questData[0].lastClickedTime6;


          const currentTime = Date.now();
          const timeDifference0 = currentTime - new Date(lastClickedTime0FromDB).getTime();
          const timeDifference1 = currentTime - new Date(lastClickedTime1FromDB).getTime();
          const timeDifference2 = currentTime - new Date(lastClickedTime2FromDB).getTime();
          const timeDifference3 = currentTime - new Date(lastClickedTime3FromDB).getTime();
          const timeDifference4 = currentTime - new Date(lastClickedTime4FromDB).getTime();
          const timeDifference5 = currentTime - new Date(lastClickedTime5FromDB).getTime();
          const timeDifference6 = currentTime - new Date(lastClickedTime6FromDB).getTime();

          if (timeDifference0 < 24 * 60 * 60 * 1000) {
            setButtonDisabled0(true);
          } else {
            setButtonDisabled0(false);
          }
          if (timeDifference1 < 24 * 60 * 60 * 1000) {
            setButtonDisabled1(true);
          } else {
            setButtonDisabled1(false);
          }
          if (timeDifference2 < 24 * 60 * 60 * 1000) {
            setButtonDisabled2(true);
          } else {
            setButtonDisabled2(false);
          }
          if (timeDifference3 < 24 * 60 * 60 * 1000) {
            setButtonDisabled3(true);
          } else {
            setButtonDisabled3(false);
          }
          if (timeDifference4 < 24 * 60 * 60 * 1000) {
            setButtonDisabled4(true);
          } else {
            setButtonDisabled4(false);
          }
          if (timeDifference5 < 24 * 60 * 60 * 1000) {
            setButtonDisabled5(true);
          } else {
            setButtonDisabled5(false);
          }
          if (timeDifference6 < 24 * 60 * 60 * 1000) {
            setButtonDisabled6(true);
          } else {
            setButtonDisabled6(false);
          }
         
        }
      } catch (error) {
        console.error('Error fetching last clicked time:', error);
      }
    };
  
    fetchLastClickedTime();
  }, []);
  
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
        <TouchableOpacity onPress={handleOpenAlert} 
     style={[styles.button]}>
        <ImageBackground source={require('../assets/31.png')} style={styles.imageBackground}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>Daily Rewards</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <CustomReward
          visible={showAlert}
            onClose={() => setShowAlert(false)}
            message={''}
          />
        
        <TouchableOpacity onPress={handlePress0} disabled={buttonDisabled0}
        style={[styles.button, buttonDisabled0 && styles.disabledButton]}>

          <ImageBackground source={require('../assets/31.png')} style={styles.imageBackground}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text}>Join Shah Coin Channel</Text>
              <Text style={styles.text1}> 
                <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />
                1000
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
                <TouchableOpacity onPress={handlePress1} disabled={buttonDisabled1}
                style={[styles.button, buttonDisabled1 && styles.disabledButton]}>
          <ImageBackground source={require('../assets/30.png')} style={styles.imageBackground}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>Follow Shah Coin on X</Text>
            <Text style={styles.text1}> 
              <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />
              1000
            </Text>
          </View>
          </ImageBackground>
</TouchableOpacity>
        <TouchableOpacity onPress={handlePress2} disabled={buttonDisabled2}
                style={[styles.button, buttonDisabled2 && styles.disabledButton]}>


          <ImageBackground source={require('../assets/28.png')} style={styles.imageBackground}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>Join Shah Coin Discord</Text>
            <Text style={styles.text1}> 
              <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />
              1000
            </Text>
          </View>
          </ImageBackground>
          </TouchableOpacity>
        <TouchableOpacity onPress={handlePress3} disabled={buttonDisabled3}
                style={[styles.button, buttonDisabled3 && styles.disabledButton]}>

          <ImageBackground source={require('../assets/27.png')} style={styles.imageBackground}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>Subscribe Shah Coin on YouTube</Text>
            <Text style={styles.text1}> 
              <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />
              1000
            </Text>
          </View>
          </ImageBackground>
          </TouchableOpacity>
        <TouchableOpacity onPress={handlePress4} disabled={buttonDisabled4}
                style={[styles.button, buttonDisabled4 && styles.disabledButton]}>

          <ImageBackground source={require('../assets/26.png')} style={styles.imageBackground}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>Follow Shah Coin on Twitch</Text>
            <Text style={styles.text1}> 
              <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />
              1000
            </Text>
          </View>
          </ImageBackground>
          </TouchableOpacity>
        <TouchableOpacity onPress={handlePress5} disabled={buttonDisabled5}
                style={[styles.button, buttonDisabled5 && styles.disabledButton]}>

          <ImageBackground source={require('../assets/25.png')} style={styles.imageBackground}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.text, { color: 'white' }]}>Follow Shah Coin on Instagram</Text>
            <Text style={styles.text1}> 
              <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />
              1000
            </Text>
          </View>
          </ImageBackground>
          </TouchableOpacity>
        <TouchableOpacity onPress={handlePress6} disabled={buttonDisabled6}
                style={[styles.button, buttonDisabled6 && styles.disabledButton]}>

          <ImageBackground source={require('../assets/29.png')} style={styles.imageBackground}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>Follow Shah Coin on Reddit</Text>
            <Text style={styles.text1}> 
              <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />
              1000
            </Text>
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
  },
  scrollContainer: {
    alignItems: 'center', // Center the content horizontally
  },
  centeredImage: {
    width: 130,
    height: 19,
  },
  coinImage: {
    width: 20,
    height: 20,
    marginTop: -5,
  },
  disabledButton: {
    opacity: 0.5, 
  },
  
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: "center",
    alignItems: 'center',
    padding: 5,
    paddingTop: 15,
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
  profileImage: {
    marginTop: 15,
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  profileName: {
    fontSize: 18,
    marginTop: 10,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  text: {
    color: 'white', // Set text color to white
    fontSize: 15,
    marginLeft: 80,
  },
  text1: {
    color: 'white', // Set text color to white
    fontSize: 12,
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginRight: 45, // Adjust to position within the image
  },
});

export default QuestPage;
