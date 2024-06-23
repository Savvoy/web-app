import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Easing, ImageBackground, TextInput, Button, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { fetchData, createData, updateData, deleteData, executeQuery } from '../api';

const formatNumberWithCommas = (number) => {
  if (number > 1000) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return number.toString();
  }
}

function HomePage({ navigation, route }) {

  const [totalCoins, setTotalCoins] = useState(1000);
  const [energy, setEnergy] = useState(1000);
  const [profit, setProfit] = useState(0);
  const [energy1, setEnergy1] = useState(1000);
  const [level, setLevel] = useState(1);
  const [coinup, setCoinup] = useState('5K');
  const [rank, setRank] = useState('Bronze');
  const [skillBarWidth, setSkillBarWidth] = useState(0);
  const [energyBonusApplied, setEnergyBonusApplied] = useState(false);
  const secondsPerCoin = 60; // Define secondsPerCoin here
  const animation = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const [tap, setTap] = useState(0);
  const [kingId, setKingId] = useState(null); // Define kingId here
  const [quizData, setQuizData] = useState([]);
  const [editingItems, setEditingItems] = useState([]); // Track edits for all items
  const [editModalVisible, setEditModalVisible] = useState(false);


  useEffect(() => {
    const fetchDataPeriodically = async () => {
      try {
        const result = await fetchData('king');
        setQuizData(result);
  
        if (result && result.length > 0) {
          setTotalCoins(result[0].totalCoins);
          setKingId(result[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    // Fetch data immediately on mount
    fetchDataPeriodically();
  
    // Set interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchDataPeriodically, 1000);
  
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const addCoins = async () => {
    try {
      // Fetch the current totalCoins and energy from the database
      const result = await fetchData('king');
      if (result && result.length > 0) {
        const currentTotalCoins = result[0].totalCoins;
        const currentEnergy = result[0].energy;
        const levell = result[0].levell;
        const tapp = result[0].tap;

  
        // Check if there's enough energy to perform the operation
        if (currentEnergy >= levell) {
          // Calculate the new totalCoins and energy
          const newTotalCoins = currentTotalCoins + levell + tapp;
          const newEnergy = currentEnergy - levell - tapp;
          const newTap = tapp;
  
          // Update the data in the MySQL database
          let data = { totalCoins: newTotalCoins, energy: newEnergy, tap: newTap };
          await updateData('king', kingId, data);
  
          // Update the local state
          setTotalCoins(newTotalCoins);
          setEnergy(newEnergy);
          setTap(newTap);
  
          // Animate the level
          Animated.timing(animation, {
            toValue: levell + tapp,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(() => {
            animation.setValue(0); // Reset animation value
          });
        } else {
          // Handle case when there's not enough energy
          console.log("Not enough energy to perform this action.");
        }
      } else {
        console.error("No data found in the 'king' table.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  
  useEffect(() => {
    const fetchAndUpdateEnergy = async () => {
      try {
        // Fetch the current energy from the database
        const result = await fetchData('king');
        if (result && result.length > 0) {
          const currentEnergy = result[0].energy;
          const currentEnergy1 = result[0].energy1;
          const levell = result[0].levell;
          const currentTap = result[0].tap;

  
          if (currentEnergy < currentEnergy1) {
            // Update energy based on the current energy, energy1, and level
            const updatedEnergy = Math.min(currentEnergy + levell + currentTap, currentEnergy1);
  
            // Update the database with the latest energy value
            await updateData('king', kingId, { energy: updatedEnergy });
  
            // Update local state with the fetched energy
            setEnergy(updatedEnergy);
            setEnergy1(currentEnergy1);
            setLevel(levell);
            setTap(tap);
          } else {
            clearInterval(interval); // Stop the interval if energy reaches energy1
          }
        } else {
          console.error("No data found in the 'king' table.");
          clearInterval(interval); // Stop the interval if no data is found
        }
      } catch (error) {
        console.error('Error updating energy in MySQL: ', error);
        clearInterval(interval); // Stop the interval on error
      }
    };
  
    // Fetch and update energy initially
    fetchAndUpdateEnergy();
  
    // Set up the periodic task to update energy
    const interval = setInterval(fetchAndUpdateEnergy, 1000); // Adjust interval as needed
  
    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [kingId, energy, energy1, level]);
  
  useEffect(() => {
    let elapsedTime = 0;
    let secondsForOneProfit = 3600 / profit;
  
    const updateTotalCoins = async () => {
      try {
        const result = await fetchData('king');
        if (result && result.length > 0) {
          const totalCoins = result[0].totalCoins || 0;
          const fetchedProfit = result[0].profit || 0;
          setTotalCoins(totalCoins);
          setProfit(fetchedProfit); // Update the profit state
          secondsForOneProfit = 3600 / fetchedProfit; // Update secondsForOneProfit
          return fetchedProfit;
        } else {
          console.log("No data found for totalCoins.");
          return 0;
        }
      } catch (error) {
        console.error("Error getting data:", error);
        return 0;
      }
    };
    const interval = setInterval(async () => {
      const fetchedProfit = await updateTotalCoins(); // Fetch and update the profit
  
      elapsedTime++;


      if (elapsedTime >= secondsForOneProfit && fetchedProfit > 0) {
        try {
          const result = await fetchData('king');
          if (result && result.length > 0) {
            const currentTotalCoins = result[0].totalCoins || 0;
            const newTotalCoins = currentTotalCoins + 1;
            let data = { totalCoins: newTotalCoins };
            await updateData('king', result[0].id, data);
            setTotalCoins(newTotalCoins);
          }
        } catch (error) {
          console.error("Error updating totalCoins:", error);
        }
  
        elapsedTime = 0; // Reset elapsed time
      }
    }, 1000);
  
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [profit]);
  

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        // Fetch the required data from the 'king' table in your MySQL database
        const result = await fetchData('king');
  
        if (result && result.length > 0) {
          const currentTotalCoins = result[0].totalCoins;
          let newLevel = level;
          let newEnergy1 = energy1;
          let newEnergy = energy;
          let newCoinup = coinup;
          let newRank = rank;
          let newEnergyBonusApplied = energyBonusApplied;
  
          // Define your level data here
          const levelData = [
            { level: 1, coinsNeeded: 0, newCoinup: '5K', energy1: 1000, rank: 'Bronze' },
            { level: 2, coinsNeeded: 5000, newCoinup: '25K', energy1: 1500, rank: 'Silver' },
            { level: 3, coinsNeeded: 25000, newCoinup: '100K', energy1: 2000, rank: 'Gold' },
            { level: 4, coinsNeeded: 100000, newCoinup: '1M', energy1: 2500, rank: 'Platinum' },
            { level: 5, coinsNeeded: 1000000, newCoinup: '2M', energy1: 3000, rank: 'Diamond' },
            { level: 6, coinsNeeded: 2000000, newCoinup: '10M', energy1: 3500, rank: 'Epic' },
            { level: 7, coinsNeeded: 10000000, newCoinup: '50M', energy1: 2500, rank: 'Legendary' },
            { level: 8, coinsNeeded: 50000000, newCoinup: '100M', energy1: 4500, rank: 'Master' },
            { level: 9, coinsNeeded: 100000000, newCoinup: '100M+', energy1: 5000, rank: 'Grandmaster' },
          ];
  
          // Iterate through the level data to determine the new level
          for (const data of levelData) {
            if (currentTotalCoins >= data.coinsNeeded && newLevel < data.level) {
              newLevel = data.level;
              newEnergy1 = data.energy1;
              newCoinup = data.newCoinup;
              newRank = data.rank;
              newEnergy += 500;
              newEnergyBonusApplied = true;
            }
          }
  
          // Ensure that energy does not exceed energy1
          if (newEnergy > newEnergy1) {
            newEnergy = newEnergy1;
          }
  
          // Update the database and local state if there's a change in level
          if (newLevel !== level) {
            let dataToUpdate = {
              levell: newLevel,
              energy1: newEnergy1,
              energy: newEnergy,
              coinup: newCoinup,
              rankk: newRank,
              energyBonusApplied: newEnergyBonusApplied,
            };
            
            // Update the 'king' table in your MySQL database
            await updateData('king', result[0].id, dataToUpdate);
  
            // Update the local state
            setLevel(newLevel);
            setEnergy1(newEnergy1);
            setEnergy(newEnergy);
            setCoinup(newCoinup);
            setRank(newRank);
            setEnergyBonusApplied(newEnergyBonusApplied);
          }
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };
  
    fetchDataAndUpdateState();
  }, [totalCoins, level]);
  

  useEffect(() => {
    const fetchDataFromMySQL = async () => {
      try {
        // Fetch data from MySQL database
        const result = await fetchData('king');
        if (result && result.length > 0) {
          const data = result[0]; // Assuming only one document is fetched
  
          // Check and set default values if fetched values are null or undefined
          const updatedData = {};
          if (data.totalCoins === null || data.totalCoins === undefined) {
            updatedData.totalCoins = 1000;
            setTotalCoins(data.totalCoins || 1000);
          }
          if (data.energy === null || data.energy === undefined) {
            updatedData.energy = 1000;
            setEnergy(data.energy || 1000);
          }
          if (data.energy1 === null || data.energy1 === undefined) {
            updatedData.energy1 = 1000;
            setEnergy1(data.energy1 || 1000);
          }
          if (data.profit === null || data.profit === undefined) {
            updatedData.profit = 0;
            setProfit(data.profit || 0);
          }
          if (data.levell === null || data.levell === undefined) {
            updatedData.levell = 1;
            setLevel(data.levell || 1);
          }
          if (data.coinup === null || data.coinup === undefined) {
            updatedData.coinup = '5K';
            setCoinup(data.coinup || '5K');
            
          }
          if (data.rankk === null || data.rankk === undefined) {
            updatedData.rankk = 'Bronze';
            setRank(data.rankk || 'Bronze');
          }
          if (data.tap === null || data.tap === undefined) {
            updatedData.tap = 0;
            setTap(data.tap || 0);
          }
          
          // Update data in MySQL database if default values are set
          if (Object.keys(updatedData).length > 0) {
            await updateData('king', data.id, updatedData);
          }
    
          // Check if energy needs to be updated based on energy1
          if (data.energy > data.energy1) {
            await updateData('king', data.id, { energy: data.energy1 });
          }
        } else {
          // If no data exists, create the document with default values
          await createData('king', {
            totalCoins: 1000,
            energy: 1000,
            energy1: 1000,
            profit: 0,
            levell: 1,
            coinup: '5K',
            rankk: 'Bronze',
            tap: 0
          });
          
          setTotalCoins(1000);
          setEnergy(1000);
          setEnergy1(1000);
          setProfit(0);
          setLevel(1);
          setCoinup('5K');
          setRank('Bronze');
          setTap(0);
        }
      } catch (error) {
        console.error("Error fetching data from MySQL:", error);
      }
    };
  
    fetchDataFromMySQL();
  
    return () => {
      // Cleanup
    };
  }, []);


  const levelData = [
    { level: 1, coinsNeeded: 0, newCoinup: '5K', energy1: 1000, rank: 'Bronze' },
    { level: 2, coinsNeeded: 5000, newCoinup: '25K', energy1: 1500, rank: 'Silver' },
    { level: 3, coinsNeeded: 25000, newCoinup: '100K', energy1: 2000, rank: 'Gold' },
    { level: 4, coinsNeeded: 100000, newCoinup: '1M', energy1: 2500, rank: 'Platinum' },
    { level: 5, coinsNeeded: 1000000, newCoinup: '2M', energy1: 3000, rank: 'Diamond' },
    { level: 6, coinsNeeded: 2000000, newCoinup: '10M', energy1: 3500, rank: 'Epic' },
    { level: 7, coinsNeeded: 10000000, newCoinup: '50M', energy1: 2500, rank: 'Legendary' },
    { level: 8, coinsNeeded: 50000000, newCoinup: '100M', energy1: 4500, rank: 'Master' },
    { level: 9, coinsNeeded: 100000000, newCoinup: '100M+', energy1: 5000, rank: 'Grandmaster' },
  ];


  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        // Fetch data from MySQL database
        const result = await fetchData('king');
        if (result && result.length > 0) {
          const data = result[0];
          setTotalCoins(data.totalCoins);
          setLevel(data.levell);
          setCoinup(data.coinup);
          setRank(data.rankk);
  
          // Find data for the current and next levels
          const currentLevelData = levelData.find(item => item.level === data.levell);
          const nextLevelData = levelData.find(item => item.level === data.levell + 1);
  
          const coinsNeededForCurrentLevel = 0;
          const coinsNeededForNextLevel = nextLevelData ? nextLevelData.coinsNeeded : coinsNeededForCurrentLevel;
  
          // Ensure totalCoins is never less than coinsNeededForCurrentLevel
          const adjustedTotalCoins = Math.max(data.totalCoins, coinsNeededForCurrentLevel);
  
          // Calculate skill bar progress
          let progress = 0;
          if (coinsNeededForNextLevel > coinsNeededForCurrentLevel) {
            progress = Math.min((adjustedTotalCoins - coinsNeededForCurrentLevel) / (coinsNeededForNextLevel - coinsNeededForCurrentLevel), 1);
          }
  
          // Set the skill bar width based on the progress
          setSkillBarWidth(progress * 100);
        }
      } catch (error) {
        console.error("Error fetching data from MySQL:", error);
      }
    };
  
    fetchDataAndUpdateState();
  }, [totalCoins, level]);
  
  
  
const startShakeAnimation = () => {
  const ANGLE = 1; // Define the angle for shaking
  Animated.sequence([
    Animated.timing(rotation, { toValue: -ANGLE, duration: 100, useNativeDriver: true }),
    Animated.timing(rotation, { toValue: ANGLE, duration: 100, useNativeDriver: true }),
    Animated.timing(rotation, { toValue: 0, duration: 100, useNativeDriver: true })
  ]).start();
};

// const formatProfit = (profit) => {
//   if (profit >= 3000) {
//     return (profit / 1000) + 'K';
//   }
//   return profit.toString();
// };

const formatProfit = (profit) => {
  if (profit >= 3000 && profit <= 5000 && (profit % 1000 === 0 || profit % 100 === 0)) {
    return (profit / 1000) + 'K';
  }
  return profit.toString();
};

const handleEdit = () => {
  setEditingItems(quizData); // Set all items to be edited
  setEditModalVisible(true);
};

const handleInputChange = (id, field, value) => {
  setEditingItems((prevItems) =>
    prevItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    )
  );
};

const handleSaveEdit = async () => {
  try {
    const updatePromises = editingItems.map(async (item) => {
      return updateData('king', item.id, {
        ...item,
        // Convert fields to appropriate types if necessary
        energy: parseInt(item.energy),
        energy1: parseInt(item.energy1),
        totalCoins: parseInt(item.totalCoins),
        profit: parseInt(item.profit),
        levell: parseInt(item.levell),
        rankk: parseInt(item.rankk),
        tap: parseInt(item.tap),
        coinup: parseInt(item.coinup),
        energyBonusApplied: parseInt(item.energyBonusApplied),
      });
    });

    await Promise.all(updatePromises);

    setEditModalVisible(false);
    setEditingItems([]);
  } catch (error) {
    console.error('Error saving edits:', error);
  }
};

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
       {quizData.map((userItem, index) => (
      <View key={userItem.id} style={styles.pageContainer}>

        <Image source={require('../assets/profile.jpeg')} style={[styles.profileImage, { width: 50, height: 50 }]} />
        <Text style={styles.profileName}>Somayah Ali</Text>
        <Image source={require('../assets/53.png')} style={[{ width: 130, height: 19, marginBottom: 15 }]} />
        {quizData.slice(0, 1).map((levelItem, index) => (
        <TouchableOpacity onPress={() => handleEdit(levelItem)} key={index}>
          <Text style={{ color: 'white', marginTop: 10 }}>Edit</Text>
        </TouchableOpacity>
      ))}
        {/* Total Coins and Coin Image in one line */}
        <View style={[styles.totalCoinsContainer, {}]}>
          <Image source={require('../assets/coin.png')} style={[styles.coinImage,
          { width: 70, height: 70 }]} />
          <Text style={styles.totalCoins}> {formatNumberWithCommas(userItem.totalCoins)}</Text>
        </View>
        <Text style={{ fontSize: 12, marginBottom: -6, color: '#D8B28F' }}>
          {userItem.rankk}                                                                        Level: {userItem.levell}/9</Text>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000', // Shadow color
          shadowOffset: { width: 0, height: 2 }, // Shadow offset
          shadowOpacity: 0.3, // Shadow opacity
          shadowRadius: 4, // Shadow radius
        }}>


          <View style={[styles.skillBarContainer, { width: '100%' }]}>
            <View style={[styles.skillBar, { width: `${skillBarWidth}%` }]} />
          </View>
        </View>


        <View style={styles.navigationn}>
          <View style={{
            backgroundColor: '#401111', marginRight: 5, alignItems: 'center', padding: 4,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,

          }}>

            <Text style={styles.headerText}>      Earn per tap</Text>
            <View style={styles.contentItem}>
              <Image source={require('../assets/coin.png')} style={styles.coinImage} />
              <Text style={styles.contentText}>+{userItem.levell}</Text>
            </View></View>
          <View style={{
            backgroundColor: '#401111', marginRight: 5, alignItems: 'center', padding: 4,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,
          }}>

            {/* Header text and content item */}
            <Text style={styles.headerText}>   Coins to level up</Text>
            <View style={styles.contentItem}>
              <Image source={require('../assets/coin.png')} style={styles.coinImage} />
              <Text style={styles.contentText}> {userItem.coinup}</Text>
            </View></View>

          <View style={{
            backgroundColor: '#401111', marginRight: 5, alignItems: 'center', padding: 4,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 80,
            borderBottomRightRadius: 80,
          }}>

            {/* Header text and content item */}
            <Text style={styles.headerText}>    Profit per hour</Text>
            <View style={styles.contentItem}>
              <Image source={require('../assets/coin.png')} style={styles.coinImage} />
              <Text style={styles.contentText}> +{formatProfit(userItem.profit)}</Text>
            </View>
          </View>


        </View>
        <View style={{ width: 500 }}>
          <Animated.View style={{ transform: [{ rotate: rotation.interpolate({ inputRange: [-10, 10], outputRange: ['-15deg', '10deg'] }) }] }}>
            <TouchableOpacity
              activeOpacity={1} // Disable feedback when pressed
              onPress={() => {
                startShakeAnimation();
                addCoins();
              }}
              style={[
                styles.carButton,
                userItem.energy < 2 && styles.disabledButton
              ]}
              disabled={userItem.energy < 2}
            >
              <Animated.View style={[styles.heart, { opacity: animation, transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, -48] }) }] }]}>
                <Text style={styles.levelText}>+{level + tap}</Text>
              </Animated.View>
              <Image source={require('../assets/car.png')} style={styles.carImage} />
            </TouchableOpacity>
          </Animated.View>


        </View>
        {/* Display energy */}
        <View style={[styles.energyContainer, {}]}>


          <Image source={require('../assets/7.png')} style={styles.energyImage} />
          <Text style={[styles.energyText, {}]}>
            {userItem.energy} / {userItem.energy1}</Text>
          <Text>                                               </Text>
          <Image source={require('../assets/5.png')} style={styles.energyImage} />
          <Text onPress={() => navigation.navigate('BOOST')} style={[styles.boostText, {}]}> Boost</Text>
        </View>
      </View>
            ))}



<Modal visible={editModalVisible} animationType="slide">
  <ImageBackground 
    source={require('../assets/background.png')} 
    style={styles.background}
  >
    <View style={styles.modalContainer}>
      <ScrollView contentContainerStyle={styles.modalScrollContainer}>
        <Text style={styles.modalTitle}>Edit Items</Text>
        {editingItems.map((item, index) => (
          <View key={item.id} style={styles.modalRowContainer}>
            <View style={styles.modalItemContainer}>
              <Text style={styles.modalItemTitle}>{item.catg}</Text>
              <View style={styles.inputRow}>
                <Text style={styles.label}>TotalCoins</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="TotalCoins"
                  value={item.totalCoins.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'totalCoins', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Level</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Level"
                  value={item.levell.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'levell', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Rank</Text>
                <View style={styles.pickerContainer}>
                  <Picker style={{height: 100}} itemStyle={{height: 150, marginTop:-40}}
                    selectedValue={item.rankk}
                    onValueChange={(itemValue, itemIndex) =>
                      handleInputChange(item.id, 'rankk', itemValue)
                    }
                  >
                    
                    <Picker.Item label="Bronze" value="Bronze" />
                    <Picker.Item label="Silver" value="Silver" />
                    <Picker.Item label="Gold" value="Gold" />
                    <Picker.Item label="Platinum" value="Platinum" />
                    <Picker.Item label="Diamond" value="Diamond" />
                    <Picker.Item label="Epic" value="Epic" />
                    <Picker.Item label="Legendary" value="Legendary" />
                    <Picker.Item label="Master" value="Master" />
                    <Picker.Item label="Grandmaster" value="Grandmaster" />
                  </Picker>
                </View>
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Profit</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Profit"
                  value={item.profit.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'profit', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Tap</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Tap"
                  value={item.tap.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'tap', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Energy</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Energy"
                  value={item.energy.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'energy', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Energy 1</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Energy 1"
                  value={item.energy1.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'energy1', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>CoinUp</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="CoinUp"
                  value={item.coinup.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'coinup', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Energy Bonus Applied</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Energy Bonus Applied"
                  value={item.energyBonusApplied.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'energyBonusApplied', text)}
                  keyboardType="numeric"
                />
              </View>
            </View>
            {index + 1 < editingItems.length && (
              <View style={styles.modalItemContainer}>
                <Text style={styles.modalItemTitle}>{editingItems[index + 1].catg}</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.label}>Total Coins</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="TotalCoins"
                    value={editingItems[index + 1].totalCoins.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'totalCoins', text)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.label}>Level</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Level"
                    value={editingItems[index + 1].levell.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'levell', text)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.label}>Rank</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Rank"
                    value={editingItems[index + 1].rankk}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'rankk', text)}
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.label}>Profit</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Profit"
                    value={editingItems[index + 1].profit.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'profit', text)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.label}>Tap</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Tap"
                    value={editingItems[index + 1].tap.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'tap', text)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.label}>Energy</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Energy"
                    value={editingItems[index + 1].energy.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'energy', text)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.label}>Energy 1</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Energy1"
                    value={editingItems[index + 1].energy1.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'energy1', text)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.label}>CoinsUp</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="CoinUp"
                    value={editingItems[index + 1].coinup.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'coinup', text)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputRow}>
                  <Text style={styles.label}>Energy Bonus Applied</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Energy Bonus Applied"
                    value={editingItems[index + 1].energyBonusApplied.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'energyBonusApplied', text)}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            )}
          </View>
        ))}
        <View style={styles.modalButtonContainer}>
          <Button title="Save" onPress={handleSaveEdit} />
          <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
        </View>
      </ScrollView>
    </View>
  </ImageBackground>
</Modal>



    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: "center",
    alignItems: 'center',
    width: '100%',
    padding: 5,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    backgroundColor: 'rgba(30, 0, 0, 0.8)',
  },

  pageContainer: {
    alignSelf: "center",
    alignItems: 'center',
    width: '100%',
    padding: 5,
    paddingTop: 15,

  },
  levelText: {
    fontSize: 24,
    color: 'white',

  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },

  profileName: {
    fontSize: 18,
    marginTop: 10,
    color: 'white',
    marginBottom: 15,
  },
  navigationn: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjusted spacing between navigation items

  },
  navigationItem: {
    alignItems: 'center',

  },
  headerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white', // White color for header text
    width: 100,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImage: {
    width: 20,
    height: 20,
  },
  contentText: {
    color: '#a86641', // White color for content text
  },
  totalCoinsContainer: {
    flexDirection: 'row', // Align items in one line
    alignItems: 'center', // Center items vertically
  },
  totalCoins: {
    fontSize: 40,
    color: "#e4dddd", // White color for total coins text
    fontWeight: "bold",
    fontFamily: "Cochin",
  },
  energyContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    paddingTop: 25,
  },
  energyText: {
    fontSize: 16,
    color: '#e4dddd', // Khaki color for energy text
  },
  boostText: {
    fontSize: 16,
    color: '#e4dddd', // Khaki color for energy text
  },
  energyImage: {
    width: 30,
    height: 30,
    marginTop: -5
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#D8B28F',
    fontSize: 16,
    fontWeight: 'bold',
  },

  carButton: {
    position: 'relative',
    alignItems: 'center',
  },

  carImage: {
    width: 250, // Car image width
    height: 250, // Car image height
    resizeMode: 'contain', // Ensure the image is contained within its boundaries
    borderRadius: 10, // Rounded corners
    shadowColor: '#D8B28F', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.8, // Shadow opacity
    shadowRadius: 5, // Shadow radius
  },
  skillBarContainer: {
    backgroundColor: '#D8B28F', // Background color of the skill bar container
    height: 20, // Height of the skill bar container
    width: '100%', // Full width
    borderRadius: 10, // Rounded corners
    marginTop: 10, // Spacing from above elements
    marginBottom: 10, // Spacing from below elements
  },
  skillBar: {
    backgroundColor: '#a86641', // Background color of the skill bar
    height: '100%', // Full height
    borderRadius: 10, // Rounded corners
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalScrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  modalRowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  modalItemContainer: {
    width: '100%', // Adjust width to fit two items in a row
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  pickerContainer: {
    
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


export default HomePage;
