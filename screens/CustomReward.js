import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { fetchData, updateData, createData } from '../api';

const coinsPerDay = [1000, 5000, 10000, 25000, 50000, 100000, 750000]; // Amount of coins per day

const CustomReward = ({ visible, onClose }) => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [kingId, setKingId] = useState(null);
  const [questId, setQuestId] = useState(null);

  const [day1, setDay1] = useState('0000-00-00');
  const [day2, setDay2] = useState('0000-00-00');
  const [day3, setDay3] = useState('0000-00-00');
  const [day4, setDay4] = useState('0000-00-00');
  const [day5, setDay5] = useState('0000-00-00');
  const [day6, setDay6] = useState('0000-00-00');
  const [day7, setDay7] = useState('0000-00-00');

  const [buttonDisabled1, setButtonDisabled1] = useState(false);
  const [buttonDisabled2, setButtonDisabled2] = useState(true);
  const [buttonDisabled3, setButtonDisabled3] = useState(true);
  const [buttonDisabled4, setButtonDisabled4] = useState(true);
  const [buttonDisabled5, setButtonDisabled5] = useState(true);
  const [buttonDisabled6, setButtonDisabled6] = useState(true);
  const [buttonDisabled7, setButtonDisabled7] = useState(true);


  const fetchDataPeriodically = async () => {
    try {
      const kingData = await fetchData('king');
      if (kingData && kingData.length > 0) {
        setTotalCoins(kingData[0].totalCoins);
        setKingId(kingData[0].id);
      }

      const questData = await fetchData('quest');
      if (questData && questData.length > 0) {
        setDay1(questData[0].day1);
        setDay2(questData[0].day2);
        setDay3(questData[0].day3);
        setDay4(questData[0].day4);
        setDay5(questData[0].day5);
        setDay6(questData[0].day6);
        setDay7(questData[0].day7);

        setQuestId(questData[0].id);
      } else {
        console.log('No data in quest table. Creating new entry...');
        const newTimestamp = new Date().toISOString();
        const newQuestData = await createData('quest', {
          day1: newTimestamp,
          day2: newTimestamp,
          day3: newTimestamp,
          day4: newTimestamp,
          day5: newTimestamp,
          day6: newTimestamp,
          day7: newTimestamp,
        });
        setDay1(newTimestamp);
        setDay2(newTimestamp);
        setDay3(newTimestamp);
        setDay4(newTimestamp);
        setDay5(newTimestamp);
        setDay6(newTimestamp);
        setDay7(newTimestamp);

        setQuestId(newQuestData.id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handlePress = async (dayIndex, setDay, setCurrentButtonDisabled, setNextButtonDisabled) => {
    if (!kingId || !questId) {
      console.error('King ID or Quest ID is missing.');
      return;
    }
    try {
      const coinAmount = coinsPerDay[dayIndex - 1]; // Assuming coinsPerDay is defined somewhere
      await updateData('king', kingId, { totalCoins: totalCoins + coinAmount });
      setTotalCoins(totalCoins + coinAmount);

      const newTimestamp = new Date().toISOString();
      const updateDataObj = {};
      updateDataObj[`day${dayIndex}`] = newTimestamp;

      await updateData('quest', questId, updateDataObj);
      setDay(newTimestamp);

      // Disable the current button
      setCurrentButtonDisabled(true);

      // Enable the next button after 24 hours
      setTimeout(() => {
        setNextButtonDisabled(false); // This should directly enable the next button
      }, 24 * 60 * 60 * 1000);
    } catch (error) {
      console.error('Error in handlePress:', error);
    }
  };


  const checkButtonStates = async () => {
    let questData;
    try {
      questData = await fetchData('quest');
      if (questData && questData.length > 0) {
        setDay1(questData[0].day1);
        setDay2(questData[0].day2);
        setDay3(questData[0].day3);
        setDay4(questData[0].day4);
        setDay5(questData[0].day5);
        setDay6(questData[0].day6);
        setDay7(questData[0].day7);
        setQuestId(questData[0].id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return;
    }
  
    if (questData[0].day1 === '0000-00-00') return;
  
    const now = new Date();
    
    const day1Date = new Date(questData[0].day1);
    const day2Date = new Date(questData[0].day2);
    const day3Date = new Date(questData[0].day3);
    const day4Date = new Date(questData[0].day4);
    const day5Date = new Date(questData[0].day5);
    const day6Date = new Date(questData[0].day6);
    const day7Date = new Date(questData[0].day7);
  
    const isSameDate = (date1, date2) => {
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };
  
    const hoursElapsed = Math.floor((now - day1Date) / (1000 * 60 * 60));
  
    if (hoursElapsed >= 24 * 6 && hoursElapsed <= 24 * 7 && !isSameDate(day7Date, now)) {
      setButtonDisabled7(false);
      setButtonDisabled1(true);
      setButtonDisabled2(true);
      setButtonDisabled3(true);
      setButtonDisabled4(true);
      setButtonDisabled5(true);
      setButtonDisabled6(true);
    } else if (hoursElapsed >= 24 * 5 && hoursElapsed <= 24 * 6 && !isSameDate(day6Date, now)) {
      setButtonDisabled6(false);
      setButtonDisabled1(true);
      setButtonDisabled2(true);
      setButtonDisabled3(true);
      setButtonDisabled4(true);
      setButtonDisabled5(true);
      setButtonDisabled7(true);
    } else if (hoursElapsed >= 24 * 4 && hoursElapsed <= 24 * 5 && !isSameDate(day5Date, now)) {
      setButtonDisabled5(false);
      setButtonDisabled1(true);
      setButtonDisabled2(true);
      setButtonDisabled3(true);
      setButtonDisabled4(true);
      setButtonDisabled6(true);
      setButtonDisabled7(true);
    } else if (hoursElapsed >= 24 * 3 && hoursElapsed <= 24 * 4 && !isSameDate(day4Date, now)) {
      setButtonDisabled4(false);
      setButtonDisabled1(true);
      setButtonDisabled2(true);
      setButtonDisabled3(true);
      setButtonDisabled5(true);
      setButtonDisabled6(true);
      setButtonDisabled7(true);
    } else if (hoursElapsed >= 24 * 2 && hoursElapsed <= 24 * 3  && !isSameDate(day3Date, now)) {
      setButtonDisabled3(false);
      setButtonDisabled1(true);
      setButtonDisabled2(true);
      setButtonDisabled4(true);
      setButtonDisabled5(true);
      setButtonDisabled6(true);
      setButtonDisabled7(true);
    } else if (hoursElapsed >= 24 && hoursElapsed <= 24 * 2 && !isSameDate(day2Date, now)) {
      setButtonDisabled2(false);
      setButtonDisabled1(true);
      setButtonDisabled3(true);
      setButtonDisabled4(true);
      setButtonDisabled5(true);
      setButtonDisabled6(true);
      setButtonDisabled7(true);
    } else if (hoursElapsed >= 24 * 7 && !isSameDate(day1Date, now) || day1Date==='0000-00-00') {
      setButtonDisabled1(false);
      setButtonDisabled2(true);
      setButtonDisabled3(true);
      setButtonDisabled4(true);
      setButtonDisabled5(true);
      setButtonDisabled6(true);
      setButtonDisabled7(true);
    } else if (day1Date==='0000-00-00'||day1Date===null) {
      setButtonDisabled1(false);
      setButtonDisabled2(true);
      setButtonDisabled3(true);
      setButtonDisabled4(true);
      setButtonDisabled5(true);
      setButtonDisabled6(true);
      setButtonDisabled7(true);
    }else{
      setButtonDisabled1(true);
      setButtonDisabled2(true);
      setButtonDisabled3(true);
      setButtonDisabled4(true);
      setButtonDisabled5(true);
      setButtonDisabled6(true);
      setButtonDisabled7(true);
  };
}

  useEffect(() => {
    fetchDataPeriodically();
    const intervalId = setInterval(() => {
      fetchDataPeriodically();
      checkButtonStates();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);



  
return (
  <Modal
    transparent
    visible={visible}
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.container}>
    <View
      style={styles.background}
    >
          <ImageBackground source={require('../assets/55.png')} style={styles.dayButton1}>
          </ImageBackground>
        
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => handlePress(1, setDay1, setButtonDisabled1, setButtonDisabled2)}
          disabled={buttonDisabled1}
          style={[styles.dayButton, buttonDisabled1 && styles.disabledButton]}
        >
          <ImageBackground source={require('../assets/54.png')} style={styles.image}>
            <Text style={styles.text}>Day 1</Text>
            <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />

            <Text style={styles.text}>1000</Text>

          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(2, setDay2, setButtonDisabled2, setButtonDisabled3)}
          disabled={buttonDisabled2}
          style={[styles.dayButton, buttonDisabled2 && styles.disabledButton]}
        >
          <ImageBackground source={require('../assets/54.png')} style={styles.image}>
            <Text style={styles.text}>Day 2</Text>
            <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />

            <Text style={styles.text}>5K</Text>

          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(3, setDay3, setButtonDisabled3, setButtonDisabled4)}
          disabled={buttonDisabled3}
          style={[styles.dayButton, buttonDisabled3 && styles.disabledButton]}
        >
          <ImageBackground source={require('../assets/54.png')} style={styles.image}>
            <Text style={styles.text}>Day 3</Text>
            <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />

            <Text style={styles.text}>10K</Text>

          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => handlePress(4, setDay4, setButtonDisabled4, setButtonDisabled5)}
          disabled={buttonDisabled4}
          style={[styles.dayButton, buttonDisabled4 && styles.disabledButton]}
        >
          <ImageBackground source={require('../assets/54.png')} style={styles.image}>
            <Text style={styles.text}>Day 4</Text>
            <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />

            <Text style={styles.text}>25K</Text>

          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(5, setDay5, setButtonDisabled5, setButtonDisabled6)}
          disabled={buttonDisabled5}
          style={[styles.dayButton, buttonDisabled5 && styles.disabledButton]}
        >
          <ImageBackground source={require('../assets/54.png')} style={styles.image}>
            <Text style={styles.text}>Day 5</Text>
            <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />

            <Text style={styles.text}>50K</Text>

          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePress(6, setDay6, setButtonDisabled6, setButtonDisabled7)}
          disabled={buttonDisabled6}
          style={[styles.dayButton, buttonDisabled6 && styles.disabledButton]}
        >
          <ImageBackground source={require('../assets/54.png')} style={styles.image}>
            <Text style={styles.text}>Day 6</Text>
            <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />

            <Text style={styles.text}>1000K</Text>

          </ImageBackground>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => handlePress(7, setDay7, setButtonDisabled7,setButtonDisabled1 )}
        disabled={buttonDisabled7}
        style={[styles.dayButton, buttonDisabled7 && styles.disabledButton]}
      >
        <ImageBackground source={require('../assets/54.png')} style={styles.image}>
          <Text style={styles.text}>Day 7</Text>
          <Image source={require('../assets/coin.png')} style={[styles.coinImage]} />

          <Text style={styles.text}>250K</Text>

        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  background: {
    alignSelf: "center",
    alignItems: 'center',
    backgroundColor: 'rgba(30, 0, 0, 1)',

  },
  dayButton: {
    margin: 3,
    width: 130,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButton1: {
    width: 150,
    height: 150,
  },
  coinImage: {
    width: 35,
    height: 35,
    margin:5
  },
  disabledButton: {
    opacity: 0.5,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom:15,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomReward;
