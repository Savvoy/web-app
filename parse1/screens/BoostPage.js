import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, TextInput, Button, Modal, ScrollView } from 'react-native';
import CustomAlert from './CustomAlert';
import { fetchData, createData, updateData, deleteData, executeQuery } from '../api';
import DateTimePicker from '@react-native-community/datetimepicker';



const BoostPage = () => {
  const [energy, setEnergy] = useState(0);
  const [energy1, setEnergy1] = useState(0);
  const [tap, setTap] = useState(0);
  const [lastRefill, setLastRefill] = useState(null);
  const [canRefill, setCanRefill] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [refillCount, setRefillCount] = useState(6);
  const [energyLevel, setEnergyLevel] = useState(1);
  const [costEnergy, setEnergyCost] = useState(1000);
  const [tapLevel, setTapLevel] = useState(1);
  const [costTap, setTapCost] = useState(1000);
  const [boostId, setBoostId] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [kingId, setKingId] = useState(null);
  const [editingItems, setEditingItems] = useState([]); // Track edits for all items
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleOpenAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleOpenAlert1 = () => {
    setShowAlert1(true);
  };

  const handleCloseAlert1 = () => {
    setShowAlert1(false);
  };

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

    fetchDataPeriodically();
    const intervalId = setInterval(fetchDataPeriodically, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchBoostDataPeriodically = async () => {
      try {
        const result = await fetchData('boost');
        setBoostId(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBoostDataPeriodically();
    const intervalId = setInterval(fetchBoostDataPeriodically, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchEnergy = async () => {
      try {
        const kingResult = await fetchData('king');
        const boostResult = await fetchData('boost');

        if (kingResult && boostResult) {
          const kingData = kingResult[0];
          const boostData = boostResult[0];

          setEnergy(kingData.energy);
          setEnergy1(kingData.energy1);

          const lastRefillTime = new Date(boostData.lastRefill);
          setLastRefill(lastRefillTime);

          setRefillCount(boostData.refillCount ?? 6);
          checkCanRefill(lastRefillTime, boostData.refillCount);
        }
      } catch (error) {
        console.error('Error fetching energy:', error);
      }
    };

    fetchEnergy();
    const intervalId = setInterval(fetchEnergy, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let timer;
  
    const fetchBoostData = async () => {
      try {
        const boostResult = await fetchData('boost');
        if (boostResult && boostResult.length > 0) {
          const boostData = boostResult[0];
          const lastRefillTime = boostData.lastRefill ? new Date(boostData.lastRefill) : null;
          setLastRefill(lastRefillTime);
          setRefillCount(boostData.refillCount ?? 6);
  
          if (boostData.refillCount === 6 && lastRefillTime) {
            const currentTime = new Date();
            const refillTime = new Date(lastRefillTime.getTime() + 2 * 60 * 60 * 1000);
            const timeDifference = refillTime - currentTime;
  
            if (timeDifference > 0) {
              setCanRefill(false);
              setRemainingTime(timeDifference);
              timer = setInterval(() => {
                const newTimeDifference = refillTime - new Date();
                if (newTimeDifference > 0) {
                  setRemainingTime(newTimeDifference);
                } else {
                  setRemainingTime(0);
                  setCanRefill(true);
                  clearInterval(timer);
                }
              }, 1000);
            } else {
              setCanRefill(true);
            }
          } else {
            checkCanRefill(lastRefillTime, boostData.refillCount);
          }
  
          if (boostData.refillCount === 0) {
            setCanRefill(false);
  
            const now = new Date();
            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
            const timeUntilMidnight = midnight - now;
            timer = setTimeout(async () => {
              setRefillCount(6);
              setCanRefill(true);
              await updateData('boost', boostData.id, { lastRefill: new Date().toISOString(), refillCount: 6 }); // Save current time directly
            }, timeUntilMidnight);
            setRemainingTime(timeUntilMidnight);
          } else if (boostData.lastRefill && !canRefill && boostData.refillCount !== 6) {
            const currentTime = new Date();
            const refillTime = new Date(lastRefillTime.getTime() + 2 * 60 * 60 * 1000);
            const timeDifference = refillTime - currentTime;
  
            if (timeDifference > 0) {
              setCanRefill(false);
              setRemainingTime(timeDifference);
              timer = setTimeout(() => {
                setRemainingTime(0);
                setCanRefill(true);
              }, timeDifference);
            } else {
              setCanRefill(true);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching boost data:', error);
      }
    };
  
    fetchBoostData();
  
    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [canRefill, refillCount]);
  
  
  const checkCanRefill = async (lastRefillTimestamp, currentRefillCount) => {
    if (!lastRefillTimestamp) {
      setCanRefill(true);
      return;
    }
    const currentTime = new Date();
    const hoursPassed = (currentTime - lastRefillTimestamp) / (1000 * 60 * 60);

    if (hoursPassed >= 24) {
      try {
        if (boostId.length > 0) {
          await updateData('boost', boostId[0].id, { refillCount: 6 });
          setRefillCount(6);
          setCanRefill(true);
        }
      } catch (error) {
        console.error('Error updating refill count:', error);
      }
    } else if (hoursPassed >= 2 && currentRefillCount > 0) {
      setCanRefill(true);
    } else {
      setCanRefill(false);
    }
  };

  const refillEnergy = async () => {
    try {
      const boostData = await fetchData('boost');
      const kingData = await fetchData('king');

      if (boostData && boostData.length > 0 && kingData && kingData.length > 0) {
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const newTimestamp = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${hours}:${minutes}:${seconds}`;
                      
        const newRefillCount = boostData[0].refillCount - 1;
        const newEnergy1 = kingData[0].energy1;

        let dataToUpdateBoost = {
          lastRefill: newTimestamp,
          refillCount: newRefillCount,
        };

        let dataToUpdateKing = {
          energy: newEnergy1,
        };

        await Promise.all([
          updateData('boost', boostData[0].id, dataToUpdateBoost),
          updateData('king', kingData[0].id, dataToUpdateKing)
        ]);

        setEnergy(newEnergy1);
        setLastRefill(newTimestamp);
        setCanRefill(false);
        setRefillCount(newRefillCount);
      }
    } catch (error) {
      console.error('Error refilling energy:', error);
    }
  };

  useEffect(() => {
    const fetchDataFromDatabase = async () => {
      try {
        const kingResult = await fetchData('king');
        const boostResult = await fetchData('boost');

        if (kingResult && kingResult.length > 0) {
          const kingData = kingResult[0];
          setEnergy1(kingData.energy1);
          setTotalCoins(kingData.totalCoins);
        }

        if (boostResult && boostResult.length > 0) {
          const boostData = boostResult[0];
          const currentEnergyLevel = boostData.energyLevel || 1;
          setEnergyLevel(currentEnergyLevel);
          setEnergyCost(1000 * Math.pow(2, currentEnergyLevel - 1));

          const currentTapLevel = boostData.tapLevel || 1;
          setTapLevel(currentTapLevel);
          setTapCost(1000 * Math.pow(2, currentTapLevel - 1));
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchDataFromDatabase();
  }, []);

  const boostEnergy = async () => {
    try {
      // Fetch necessary data from the database
      const kingResult = await fetchData('king');
      const boostResult = await fetchData('boost');

      if (kingResult && kingResult.length > 0 && boostResult && boostResult.length > 0) {
        const kingData = kingResult[0];
        const boostData = boostResult[0];

        const currentEnergyLevel = boostData.energyLevel || 1;
        const costEnergy = 1000 * Math.pow(2, currentEnergyLevel - 1);
        const newTotalCoins = kingData.totalCoins - costEnergy;

        if (newTotalCoins < 0) {
          setShowAlert(true);
          return;
        }
        setShowAlert(false);

        const newEnergy1 = kingData.energy1 + 100;
        const newEnergyLevel = currentEnergyLevel + 1;
        const newCostEnergy = 1000 * Math.pow(2, newEnergyLevel - 1);

        // Update the king document
        await updateData('king', kingData.id, {
          energy1: newEnergy1,
          totalCoins: newTotalCoins
        });

        // Update the boost document
        await updateData('boost', boostData.id, {
          energyLevel: newEnergyLevel,
          costEnergy: newCostEnergy
        });

        setEnergy1(newEnergy1);
        setTotalCoins(newTotalCoins);
        setEnergyLevel(newEnergyLevel);
        setEnergyCost(newCostEnergy);
      }
    } catch (error) {
      console.error('Error boosting energy:', error);
    }
  };

  const boostTap = async () => {
    try {
      // Fetch necessary data from the database
      const kingResult = await fetchData('king');
      const boostResult = await fetchData('boost');

      if (kingResult && kingResult.length > 0 && boostResult && boostResult.length > 0) {
        const kingData = kingResult[0];
        const boostData = boostResult[0];

        const currentTapLevel = boostData.tapLevel || 1;
        const costTap = 1000 * Math.pow(2, currentTapLevel - 1);
        const newTotalCoins = kingData.totalCoins - costTap;

        if (newTotalCoins < 0) {
          setShowAlert1(true);
          return;
        }
        setShowAlert1(false);
        const newTap = kingData.tap + 1;
        const newTapLevel = currentTapLevel + 1;
        const newCostTap = 1000 * Math.pow(2, newTapLevel - 1);

        // Update the king document
        await updateData('king', kingData.id, {
          tap: newTap,
          totalCoins: newTotalCoins
        });

        // Update the boost document
        await updateData('boost', boostData.id, {
          costTap: newCostTap,
          tapLevel: newTapLevel
        });

        setTap(newTap);
        setTotalCoins(newTotalCoins);
        setTapLevel(newTapLevel);
        setTapCost(newCostTap);
      }
    } catch (error) {
      console.error('Error boosting tap:', error);
    }
  };

  const formatECost = (costEnergy) => {
    if (costEnergy >= 10000) {
      return (costEnergy / 1000) + 'K';
    }
    return costEnergy.toString();
  };

  const formatTCost = (costTap) => {
    if (costTap === null) {
      return ''; // Return an empty string or handle it as appropriate for your use case
    }
    if (costTap >= 10000) {
      return (costTap / 1000) + 'K';
    }
    return costTap.toString();
  };
  

  const formatNumberWithCommas = (number) => {
    if (number !== null && number !== undefined) {
      if (number > 1000) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return number.toString();
      }
    } else {
      // Handle the case when number is null or undefined
      return "";
    }
  };
  

  const handleEdit = () => {
    setEditingItems(boostId); // Set all items to be edited
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
        return updateData('boost', item.id, {
          ...item,
          // Convert fields to appropriate types if necessary
          energyLevel: parseInt(item.energyLevel),
          costEnergy: parseInt(item.costEnergy),
          tapLevel: parseInt(item.tapLevel),
          costTap: parseInt(item.costTap),
          lastRefill: item.lastRefill ? new Date(item.lastRefill).toISOString() : null, // Format date correctly
          refillCount: parseInt(item.refillCount),
        });
      });
  
      await Promise.all(updatePromises);
  
      setEditModalVisible(false);
      setEditingItems([]);
    } catch (error) {
      console.error('Error saving edits:', error);
    }
  };

const handleDateChange = (item, date) => {
  if (date) {
    setSelectedDate(date);
    // Format the date to YYYY-MM-DD HH:mm:ss
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    handleInputChange(item.id, 'lastRefill', formattedDate);
  }
};

useEffect(() => {
  const fetchDataFromDatabase = async () => {
    try {
      const kingResult = await fetchData('king');
      const boostResult = await fetchData('boost');

      if (kingResult && kingResult.length > 0) {
        const kingData = kingResult[0];
        setEnergy1(kingData.energy1);
        setTotalCoins(kingData.totalCoins);
      }

      if (boostResult && boostResult.length > 0) {
        const boostData = boostResult[0];
        const currentEnergyLevel = boostData.energyLevel || 1;
        setEnergyLevel(currentEnergyLevel);
        setEnergyCost(1000 * Math.pow(2, currentEnergyLevel - 1));

        const currentTapLevel = boostData.tapLevel || 1;
        setTapLevel(currentTapLevel);
        setTapCost(1000 * Math.pow(2, currentTapLevel - 1));
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  fetchDataFromDatabase();
}, [editingItems]);
  
  return (
    <ImageBackground 
    source={require('../assets/background.png')} 
    style={styles.background}
  >

    <View style={styles.container}>
    <ScrollView>
  <Image source={require('../assets/profile.jpeg')} style={styles.profileImage} />
  <Text style={styles.profileName}>Somayah Ali</Text>

  {quizData.map((boostItem, index) => (
    <View key={boostItem.id || index} style={[styles.totalCoinsContainer, {}]}>
      <Image source={require('../assets/coin.png')} style={[styles.coinImage, { width: 70, height: 70 }]} />
      <Text style={styles.totalCoins}>
        {boostItem.totalCoins !== undefined ? formatNumberWithCommas(boostItem.totalCoins) : 'Loading...'}
      </Text>
    </View>
  ))}
{boostId.slice(0, 1).map((levelItem, index) => (
  <TouchableOpacity onPress={() => handleEdit(levelItem)} key={index}>
    <Text style={{ color: 'white', marginTop: 10 }}>Edit</Text>
  </TouchableOpacity>
))}


  {!canRefill && (
    <View>
      <Text style={styles.energyText}>
        {Math.floor(remainingTime / (1000 * 60 * 60))} hours{' '}
        {Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))} minutes{' '}
        {Math.floor((remainingTime % (1000 * 60)) / 1000)} seconds
      </Text>
    </View>
  )}

  {boostId.map((boostItem, index) => (
    <View key={boostItem.id || index}>
      <TouchableOpacity onPress={refillEnergy} style={styles.refillButton} disabled={!canRefill}>
        <ImageBackground
          source={require('../assets/45.png')}
          style={[styles.imageBackground, !canRefill && styles.disabledImage]}
        >
          <Text style={styles.text}>Full Energy</Text>
          <Text style={[styles.text, { fontSize: 12, paddingTop: 3 }]}>{boostItem.refillCount}/6 available</Text>
        </ImageBackground>
      </TouchableOpacity>

      <Text style={{ color: 'white', marginLeft: 30, fontSize: 15 }}>BOOSTERS</Text>

      <TouchableOpacity onPress={handleOpenAlert1}>
        <ImageBackground source={require('../assets/47.png')} style={[styles.imageBackground]}>
          <Text style={styles.text}>Multitap</Text>
          <Text style={styles.text}>
            <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />
            {formatTCost(boostItem.costTap)} - {boostItem.tapLevel} lvl
          </Text>
        </ImageBackground>
      </TouchableOpacity>

      {quizData.map((quizItem, idx) => (
        <CustomAlert
          key={quizItem.id || idx}
          visible={showAlert1}
          onClose={() => setShowAlert1(false)}
          onConfirm={boostTap}
          insufficientCoins={quizItem.totalCoins - boostItem.costTap < 0}
          message={quizItem.totalCoins - boostItem.costTap < 0 ? `Not enough coins to boost tap.` : `Confirm to purchase`}
        />
      ))}

      <TouchableOpacity onPress={handleOpenAlert}>
        <ImageBackground source={require('../assets/50.png')} style={[styles.imageBackground]}>
          <Text style={styles.text}>Energy limit</Text>
          <Text style={styles.text}>
            <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />
            {formatECost(boostItem.costEnergy)} - {boostItem.energyLevel} lvl
          </Text>
        </ImageBackground>
      </TouchableOpacity>

      {quizData.map((quizItem, idx) => (
        <CustomAlert
          key={quizItem.id || idx}
          visible={showAlert}
          onClose={() => setShowAlert(false)}
          onConfirm={boostEnergy}
          insufficientCoins={quizItem.totalCoins - boostItem.costEnergy < 0}
          message={quizItem.totalCoins - boostItem.costEnergy < 0 ? `Not enough coins \n to boost energy.` : `Confirm to purchase`}
        />
      ))}

      <TouchableOpacity>
        <ImageBackground source={require('../assets/51.png')} style={[styles.imageBackground]}>
          <Text style={styles.text}>Shah Coin limit</Text>
          <Text style={[styles.text, { fontSize: 10, paddingTop: 3 }]}>
            Double up your earnings & support marketing team!
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  ))}
  
</ScrollView>


<Modal visible={editModalVisible} animationType="slide">
  <ImageBackground 
    source={require('../assets/background.png')} 
    style={styles.background}
  >
    <View style={styles.modalContainer}>
      <ScrollView contentContainerStyle={styles.modalScrollContainer}>
        <Text style={styles.modalTitle}>Edit Items</Text>
        {editingItems.map((item, index) => (
          <View key={item.id || index} style={styles.modalRowContainer}>
          <View style={styles.modalItemContainer}>
            <Text style={styles.modalItemTitle}>{item.catg}</Text>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Energy Level</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Energy Level"
                value={item.energyLevel ? item.energyLevel.toString() : ''}
                onChangeText={(text) => handleInputChange(item.id, 'energyLevel', text)}
                keyboardType="numeric"
              />
            </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Cost Energy</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Cost Energy"
                  value={item.costEnergy ? item.costEnergy.toString() : ''}
                  onChangeText={(text) => handleInputChange(item.id, 'costEnergy', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Tap Level</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Tap Level"
                  value={item.tapLevel ? item.tapLevel.toString() : ''}
                  onChangeText={(text) => handleInputChange(item.id, 'tapLevel', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Tap Cost</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Tap Cost"
                  value={item.costTap ? item.costTap.toString() : ''}
                  onChangeText={(text) => handleInputChange(item.id, 'costTap', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.label}>Refill Count</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Refill Count"
                  value={item.refillCount ? item.refillCount.toString() : ''}
                  onChangeText={(text) => handleInputChange(item.id, 'refillCount', text)}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputRow}>
                    <Text style={styles.label}>Last Refill</Text>
                    <View style={{ flex: 1 }}>
                    <DateTimePicker
  value={selectedDate}
  mode="datetime"
  is24Hour={true}
  display="default"
  onChange={(event, date) => handleDateChange(boostId, date)}
/>

                    </View>
                  </View>
              
            </View>
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
      
    </View>

    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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
  coinImage: {
    width: 20,
    height: 20,
  },
  imageBackground: {
    width: 390,
    aspectRatio: 45 / 9,
    justifyContent: 'center',
  },
  disabledImage: {
    opacity: 0.5, // Makes the image appear disabled
  },
  profileImage: {
    marginTop: 15,
    width: 50,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center'
  },
  profileName: {
    fontSize: 18,
    marginTop: 10,
    color: 'white',
    marginBottom: 15,
    alignSelf: 'center'
  },
  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'left',
    marginLeft:90
  },
  energyText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
    marginLeft:50
  },
  refillButton: {
    borderRadius: 5,
  },

    
  totalCoinsContainer: {
    marginBottom:10,
    flexDirection: 'row', // Align items in one line
    alignItems: 'center', // Center items vertically
    alignSelf:'center',
    justifyContent:'center'
  },
  totalCoins: {
    fontSize: 40,
    color: "#e4dddd", // White color for total coins text
    fontWeight: "bold",
    fontFamily: "Cochin",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,
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
});


export default BoostPage;
