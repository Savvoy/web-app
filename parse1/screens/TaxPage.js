import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, Image, ScrollView, TouchableOpacity, ImageBackground, TextInput, Button, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import CustomAlert from './CustomAlert';
import { fetchData, updateData, addData } from '../api'; // Import your MySQL API functions


const TaxPage = (route) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigation = useNavigation();
  const [level, setLevel] = useState(1);
  const [showKingdomLand, setShowKingdomLand] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [focusedButton, setFocusedButton] = useState('kingdomLand');

//AddCitizen
  const [currentLevel, setCurrentLevel] = useState(0); // State to track the current level
  const [coinsNeeded, setCoinsNeeded] = useState(1000); // State to track the coins needed for the current level
  const [profitToAdd, setProfitToAdd] = useState(100); // State to track the profit to add for the current level
  const [coinsNeeded1, setCoinsNeeded1] = useState('1K');
  const [showAlertCitizen, setShowAlertCitizen] = useState(false);

//AddFarmers
  const [currentLevel1, setCurrentLevel1] = useState(0); // State to track the current level
  const [coinsNeeded2, setCoinsNeeded2] = useState(2000); // State to track the coins needed for the current level
  const [profitToAdd1, setProfitToAdd1] = useState(200); // State to track the profit to add for the current level
  const [coinsNeeded3, setCoinsNeeded3] = useState('2K');
  const [showAlertFarmers, setShowAlertFarmers] = useState(false);

//AddDoctors
  const [currentLevel2, setCurrentLevel2] = useState(0); // State to track the current level
  const [coinsNeeded4, setCoinsNeeded4] = useState(5000); // State to track the coins needed for the current level
  const [profitToAdd2, setProfitToAdd2] = useState(250); // State to track the profit to add for the current level
  const [coinsNeeded5, setCoinsNeeded5] = useState('5K');
  const [showAlertDoctors, setShowAlertDoctors] = useState(false);

  //AddTRADERS
    const [currentLevel3, setCurrentLevel3] = useState(0); // State to track the current level
    const [coinsNeeded6, setCoinsNeeded6] = useState(10000); // State to track the coins needed for the current level
    const [profitToAdd3, setProfitToAdd3] = useState(400); // State to track the profit to add for the current level
    const [coinsNeeded7, setCoinsNeeded7] = useState('10K');
    const [showAlertTraders, setShowAlertTraders] = useState(false);

    //AddIND
    const [currentLevel4, setCurrentLevel4] = useState(0); // State to track the current level
    const [coinsNeeded8, setCoinsNeeded8] = useState(20000); // State to track the coins needed for the current level
    const [profitToAdd4, setProfitToAdd4] = useState(1000); // State to track the profit to add for the current level
    const [coinsNeeded9, setCoinsNeeded9] = useState('20K');
    const [showAlertInd, setShowAlertInd] = useState(false);

    //ARMY
    const [currentLevel5, setCurrentLevel5] = useState(0); // State to track the current level
    const [coinsNeeded10, setCoinsNeeded10] = useState(40000); // State to track the coins needed for the current level
    const [profitToAdd5, setProfitToAdd5] = useState(2000); // State to track the profit to add for the current level
    const [coinsNeeded11, setCoinsNeeded11] = useState('40K');
    const [showAlertArmy, setShowAlertArmy] = useState(false);

  
  const [totalCoins, setTotalCoins] = useState(0);
  const [taxId, setTaxId] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [kingId, setKingId] = useState(null);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newLevel, setNewLevel] = useState('');
  const [newCoinsNeeded, setNewCoinsNeeded] = useState('');
  const [newProfit, setNewProfit] = useState('');
  const [editingItems, setEditingItems] = useState([]); // Track edits for all items
  
  
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
    const fetchTaxDataPeriodically = async () => {
      try {
        const result = await fetchData('tax');
        setTaxId(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTaxDataPeriodically();
    const intervalId = setInterval(fetchTaxDataPeriodically, 1000);

    return () => clearInterval(intervalId);
  }, []);
  
//______________________________________CITIZEN
  const handleOpenAlert = () => {
    setShowAlertCitizen(true);
    
  };

  const handleCloseAlert = () => {
    setShowAlertCitizen(false);
  };
  useEffect(() => {
    fetchLevel(); 
  }, []);

  const fetchLevel = async () => {
    try {
      const result = await fetchData('tax', { catg: 'CITIZEN' });
      if (result && result.length > 0) {
        const level = result[0].levell || 1;
        setCurrentLevel(level);
        const levelData = [
          { levell: 1, coinsNeeded: 1000, profitToAdd: 100, catg: 'CITIZEN' },
          { levell: 2, coinsNeeded: 2000, profitToAdd: 200, catg: 'CITIZEN' },
          { levell: 3, coinsNeeded: 5000, profitToAdd: 300, catg: 'CITIZEN' },
          { levell: 4, coinsNeeded: 10000, profitToAdd: 400, catg: 'CITIZEN' },
          { levell: 5, coinsNeeded: 20000, profitToAdd: 500, catg: 'CITIZEN' },
          { levell: 6, coinsNeeded: 30000, profitToAdd: 600, catg: 'CITIZEN' },
          { levell: 7, coinsNeeded: 40000, profitToAdd: 700, catg: 'CITIZEN' },
          { levell: 8, coinsNeeded: 50000, profitToAdd: 800, catg: 'CITIZEN' },
          { levell: 9, coinsNeeded: 60000, profitToAdd: 900, catg: 'CITIZEN' },
          { levell: 10, coinsNeeded: 70000, profitToAdd: 1000, catg: 'CITIZEN' },
        ];

        if (level >= 1 && level <= levelData.length) {
          setCoinsNeeded(levelData[level - 1].coinsNeeded);
          setProfitToAdd(levelData[level - 1].profitToAdd);
          setCurrentLevel(levelData[level - 1].levell);
          setCoinsNeeded1(levelData[level - 1].catg);

        } else {
          console.error('No data found for CITIZEN');
        }
      }
    } catch (error) {
      console.error('Error fetching level:', error);
    }
  };
const levelData = [
  { levell: 1, coinsNeeded: 1000, profitToAdd: 100, catg: 'CITIZEN' },
  { levell: 2, coinsNeeded: 2000, profitToAdd: 200, catg: 'CITIZEN' },
  { levell: 3, coinsNeeded: 5000, profitToAdd: 300, catg: 'CITIZEN' },
  { levell: 4, coinsNeeded: 10000, profitToAdd: 400, catg: 'CITIZEN' },
  { levell: 5, coinsNeeded: 20000, profitToAdd: 500, catg: 'CITIZEN' },
  { levell: 6, coinsNeeded: 30000, profitToAdd: 600, catg: 'CITIZEN' },
  { levell: 7, coinsNeeded: 40000, profitToAdd: 700, catg: 'CITIZEN' },
  { levell: 8, coinsNeeded: 50000, profitToAdd: 800, catg: 'CITIZEN' },
  { levell: 9, coinsNeeded: 60000, profitToAdd: 900, catg: 'CITIZEN' },
  { levell: 10, coinsNeeded: 70000, profitToAdd: 1000, catg: 'CITIZEN' },
];

const addCitizen = async () => {
  try {
    const kingData = await fetchData('king');
    if (!kingData || kingData.length === 0) {
      console.error('No data found for king');
      return;
    }

    const totalCoinsFromKing = kingData[0]?.totalCoins || 0;
    const previousProfit = kingData[0]?.profit || 0;

    const taxData = await fetchData('tax', { catg: 'CITIZEN' });
    if (!taxData || taxData.length === 0) {
      console.error('No tax data found for CITIZEN category');
      return;
    }

    // Find the appropriate tax item based on the category
    const taxItem = taxData.find(item => item.catg === 'CITIZEN');

    if (!taxItem) {
      console.error('Tax data not found for the CITIZEN category');
      return;
    }

    const coinsNeeded = taxItem.coinsNeeded || 0;
    const profitToAdd = taxItem.profit || 0;

    if (totalCoinsFromKing < coinsNeeded) {
      setShowAlertCitizen(true);
      return;
    }

    const updatedCoins = totalCoinsFromKing - coinsNeeded;
    const updatedProfit = profitToAdd;

    const nextLevelData = levelData[taxItem.levell];
    const { profitToAdd: nextProfitToAdd, coinsNeeded: nextCoinsNeeded, catg: nextCatg } = nextLevelData;

    const taxDataToUpdate = {
      profit: nextProfitToAdd,
      levell: taxItem.levell + 1,
      coinsNeeded: nextCoinsNeeded,
      catg: nextCatg,
    };

    await Promise.all([
      updateData('tax', taxItem.id, taxDataToUpdate),
      updateData('king', kingData[0].id, { totalCoins: updatedCoins, profit: updatedProfit + previousProfit }),
    ]);

    setCurrentLevel(taxItem.levell + 1);

    if (taxItem.levell + 1 >= levelData.length) {
      console.log('You have reached the maximum level.');
      setButtonDisabled(true);
    }
  } catch (error) {
    console.error('Error purchasing CITIZEN items: ', error);
  }
};

//______________________________________FARMERS
const handleOpenAlert1 = () => {
  setShowAlertFarmers(true);
  
};

const handleCloseAlert1 = () => {
  setShowAlertFarmers(false);
};
useEffect(() => {
  fetchLevel1(); 
}, []);
const fetchLevel1 = async () => {
    try {
      const result = await fetchData('tax', { catg: 'FARMERS' });
      if (result && result.length > 0) {
        const level = result[0]?.levell || 1;
        setCurrentLevel1(level);
        const levelData1 = [
          { levell: 1, coinsNeeded: 2000, profitToAdd: 200, catg: 'FARMERS' },
          { levell: 2, coinsNeeded: 4000, profitToAdd: 400, catg: 'FARMERS' },
          { levell: 3, coinsNeeded: 8000, profitToAdd: 600, catg: 'FARMERS' },
          { levell: 4, coinsNeeded: 16000, profitToAdd: 800, catg: 'FARMERS' },
          { levell: 5, coinsNeeded: 32000, profitToAdd: 1000, catg: 'FARMERS' },
          { levell: 6, coinsNeeded: 64000, profitToAdd: 1200, catg: 'FARMERS' },
          { levell: 7, coinsNeeded: 128000, profitToAdd: 1400, catg: 'FARMERS' },
          { levell: 8, coinsNeeded: 256000, profitToAdd: 1600, catg: 'FARMERS' },
          { levell: 9, coinsNeeded: 512000, profitToAdd: 1800, catg: 'FARMERS' },
          { levell: 10, coinsNeeded: 1024000, profitToAdd: 2000, catg: 'FARMERS' },
        ];
  
        if (level >= 1 && level <= levelData1.length) {
          setCoinsNeeded2(levelData1[level - 1].coinsNeeded);
          setProfitToAdd1(levelData1[level - 1].profitToAdd);
          setCurrentLevel1(levelData1[level - 1].levell);
          setCoinsNeeded3(levelData1[level - 1].catg);
        }
      } else {
        console.error('No data found for FARMERS');
      }
    } catch (error) {
      console.error('Error fetching level:', error);
    }
  };
  
  const levelData1 = [
    { levell: 1, coinsNeeded: 2000, profitToAdd: 200, catg: 'FARMERS' },
    { levell: 2, coinsNeeded: 4000, profitToAdd: 400, catg: 'FARMERS' },
    { levell: 3, coinsNeeded: 8000, profitToAdd: 600, catg: 'FARMERS' },
    { levell: 4, coinsNeeded: 16000, profitToAdd: 800, catg: 'FARMERS' },
    { levell: 5, coinsNeeded: 32000, profitToAdd: 1000, catg: 'FARMERS' },
    { levell: 6, coinsNeeded: 64000, profitToAdd: 1200, catg: 'FARMERS' },
    { levell: 7, coinsNeeded: 128000, profitToAdd: 1400, catg: 'FARMERS' },
    { levell: 8, coinsNeeded: 256000, profitToAdd: 1600, catg: 'FARMERS' },
    { levell: 9, coinsNeeded: 512000, profitToAdd: 1800, catg: 'FARMERS' },
    { levell: 10, coinsNeeded: 1024000, profitToAdd: 2000, catg: 'FARMERS' },
  ];

  const addFarmers = async () => {
    try {
      const kingData = await fetchData('king');
      if (!kingData || kingData.length === 0) {
        console.error('No data found for king');
        return;
      }
  
      const totalCoinsFromKing = kingData[0]?.totalCoins || 0;
      const previousProfit = kingData[0]?.profit || 0;
  
      const taxData = await fetchData('tax', { catg: 'FARMERS' });
      if (!taxData || taxData.length === 0) {
        console.error('No tax data found for FARMERS category');
        return;
      }
  
      // Find the appropriate tax item based on the category
      const taxItem = taxData.find(item => item.catg === 'FARMERS');
  
      if (!taxItem) {
        console.error('Tax data not found for the FARMERS category');
        return;
      }
  
      const coinsNeeded = taxItem.coinsNeeded || 0;
      const profitToAdd = taxItem.profit || 0;
  
      if (totalCoinsFromKing < coinsNeeded) {
        setShowAlertFarmers(true);
        return;
      }
  
      const updatedCoins = totalCoinsFromKing - coinsNeeded;
      const updatedProfit = profitToAdd;
  
      const nextLevelData = levelData1[taxItem.levell];
      const { profitToAdd: nextProfitToAdd, coinsNeeded: nextCoinsNeeded, catg: nextCatg } = nextLevelData;
  
      const taxDataToUpdate = {
        profit: nextProfitToAdd,
        levell: taxItem.levell + 1,
        coinsNeeded: nextCoinsNeeded,
        catg: nextCatg,
      };
  
      await Promise.all([
        updateData('tax', taxItem.id, taxDataToUpdate),
        updateData('king', kingData[0].id, { totalCoins: updatedCoins, profit: updatedProfit + previousProfit }),
      ]);
  
      setCurrentLevel1(taxItem.levell + 1);
  
      if (taxItem.levell + 1 >= levelData1.length) {
        console.log('You have reached the maximum level.');
        setButtonDisabled(true);
      }
    } catch (error) {
      console.error('Error purchasing FARMERS items: ', error);
    }
  };
//______________________________________DOCTORS
const handleOpenAlert2= () => {
  setShowAlertDoctors(true);
  
};

const handleCloseAlert2= () => {
  setShowAlertDoctors(false);
};
useEffect(() => {
  fetchLevel2(); 
}, []);
const fetchLevel2 = async () => {
  try {
    const result = await fetchData('tax', { catg: 'DOCTORS' });
    if (result && result.length > 0) {
      const level = result[0].levell || 1;
      setCurrentLevel2(level);
      const levelData2 = [
        { levell: 1, coinsNeeded: 5000, profitToAdd: 250, catg: 'DOCTORS' },
        { levell: 2, coinsNeeded: 10000, profitToAdd: 500, catg: 'DOCTORS' },
        { levell: 3, coinsNeeded: 20000, profitToAdd: 750, catg: 'DOCTORS' },
        { levell: 4, coinsNeeded: 40000, profitToAdd: 1000, catg: 'DOCTORS' },
        { levell: 5, coinsNeeded: 80000, profitToAdd: 1250, catg: 'DOCTORS' },
        { levell: 6, coinsNeeded: 160000, profitToAdd: 1500, catg: 'DOCTORS' },
        { levell: 7, coinsNeeded: 320000, profitToAdd: 1750, catg: 'DOCTORS' },
        { levell: 8, coinsNeeded: 640000, profitToAdd: 2000, catg: 'DOCTORS' },
        { levell: 9, coinsNeeded: 1280000, profitToAdd: 2250, catg: 'DOCTORS' },
        { levell: 10, coinsNeeded: 2560000, profitToAdd: 2500, catg: 'DOCTORS' },
      ];

      if (level >= 1 && level <= levelData2.length) {
        setCoinsNeeded4(levelData2[level - 1].coinsNeeded);
        setProfitToAdd2(levelData2[level - 1].profitToAdd);
        setCurrentLevel2(levelData2[level - 1].levell);
        setCoinsNeeded5(levelData2[level - 1].catg);
      }
    } else {
      console.error('No data found for DOCTORS');
    }
  } catch (error) {
    console.error('Error fetching level:', error);
  }
};

const levelData2 = [
  { levell: 1, coinsNeeded: 5000, profitToAdd: 250, catg: 'DOCTORS' },
  { levell: 2, coinsNeeded: 10000, profitToAdd: 500, catg: 'DOCTORS' },
  { levell: 3, coinsNeeded: 20000, profitToAdd: 750, catg: 'DOCTORS' },
  { levell: 4, coinsNeeded: 40000, profitToAdd: 1000, catg: 'DOCTORS' },
  { levell: 5, coinsNeeded: 80000, profitToAdd: 1250, catg: 'DOCTORS' },
  { levell: 6, coinsNeeded: 160000, profitToAdd: 1500, catg: 'DOCTORS' },
  { levell: 7, coinsNeeded: 320000, profitToAdd: 1750, catg: 'DOCTORS' },
  { levell: 8, coinsNeeded: 640000, profitToAdd: 2000, catg: 'DOCTORS' },
  { levell: 9, coinsNeeded: 1280000, profitToAdd: 2250, catg: 'DOCTORS' },
  { levell: 10, coinsNeeded: 2560000, profitToAdd: 2500, catg: 'DOCTORS' },
];

const addDoctors = async () => {
  try {
    const kingData = await fetchData('king');
    if (!kingData || kingData.length === 0) {
      console.error('No data found for king');
      return;
    }

    const totalCoinsFromKing = kingData[0]?.totalCoins || 0;
    const previousProfit = kingData[0]?.profit || 0;

    const taxData = await fetchData('tax', { catg: 'DOCTORS' });
    if (!taxData || taxData.length === 0) {
      console.error('No tax data found for DOCTORS category');
      return;
    }

    // Find the appropriate tax item based on the category
    const taxItem = taxData.find(item => item.catg === 'DOCTORS');

    if (!taxItem) {
      console.error('Tax data not found for the DOCTORS category');
      return;
    }

    const coinsNeeded = taxItem.coinsNeeded || 0;
    const profitToAdd = taxItem.profit || 0;

    if (totalCoinsFromKing < coinsNeeded) {
      setShowAlertDoctors(true);
      return;
    }

    const updatedCoins = totalCoinsFromKing - coinsNeeded;
    const updatedProfit = profitToAdd;

    const nextLevelData = levelData2[taxItem.levell];
    const { profitToAdd: nextProfitToAdd, coinsNeeded: nextCoinsNeeded, catg: nextCatg } = nextLevelData;

    const taxDataToUpdate = {
      profit: nextProfitToAdd,
      levell: taxItem.levell + 1,
      coinsNeeded: nextCoinsNeeded,
      catg: nextCatg,
    };

    await Promise.all([
      updateData('tax', taxItem.id, taxDataToUpdate),
      updateData('king', kingData[0].id, { totalCoins: updatedCoins, profit: updatedProfit + previousProfit }),
    ]);

    setCurrentLevel2(taxItem.levell + 1);

    if (taxItem.levell + 1 >= levelData2.length) {
      console.log('You have reached the maximum level.');
      setButtonDisabled(true);
    }
  } catch (error) {
    console.error('Error purchasing DOCTORS items: ', error);
  }
};

//______________________________________TRADERS
const handleOpenAlert3= () => {
  setShowAlertTraders(true);
  
};

const handleCloseAlert3= () => {
  setShowAlertTraders(false);
};
useEffect(() => {
  fetchLevel3(); 
}, []);
const fetchLevel3 = async () => {
  try {
    const result = await fetchData('tax', { catg: 'TRADERS' });
    if (result && result.length > 0) {
      const level = result[0].levell || 1;
      setCurrentLevel3(level);
      const levelData3 = [
        { levell: 1, coinsNeeded: 10000, profitToAdd: 400, catg: 'TRADERS' },
        { levell: 2, coinsNeeded: 20000, profitToAdd: 800, catg: 'TRADERS' },
        { levell: 3, coinsNeeded: 40000, profitToAdd: 1200, catg: 'TRADERS' },
        { levell: 4, coinsNeeded: 80000, profitToAdd: 1600, catg: 'TRADERS' },
        { levell: 5, coinsNeeded: 160000, profitToAdd: 2000, catg: 'TRADERS' },
        { levell: 6, coinsNeeded: 320000, profitToAdd: 2400, catg: 'TRADERS' },
        { levell: 7, coinsNeeded: 640000, profitToAdd: 2800, catg: 'TRADERS' },
        { levell: 8, coinsNeeded: 1280000, profitToAdd: 3200, catg: 'TRADERS' },
        { levell: 9, coinsNeeded: 2560000, profitToAdd: 3600, catg: 'TRADERS' },
        { levell: 10, coinsNeeded: 5120000, profitToAdd: 4000, catg: 'TRADERS' },
      ];

      if (level >= 1 && level <= levelData3.length) {
        setCoinsNeeded6(levelData3[level - 1].coinsNeeded);
        setProfitToAdd3(levelData3[level - 1].profitToAdd);
        setCurrentLevel3(levelData3[level - 1].levell);
        setCoinsNeeded7(levelData3[level - 1].catg);
      }
    } else {
      console.error('No data found for TRADERS');
    }
  } catch (error) {
    console.error('Error fetching level:', error);
  }
};

const levelData3 = [
  { levell: 1, coinsNeeded: 10000, profitToAdd: 400, catg: 'TRADERS' },
  { levell: 2, coinsNeeded: 20000, profitToAdd: 800, catg: 'TRADERS' },
  { levell: 3, coinsNeeded: 40000, profitToAdd: 1200, catg: 'TRADERS' },
  { levell: 4, coinsNeeded: 80000, profitToAdd: 1600, catg: 'TRADERS' },
  { levell: 5, coinsNeeded: 160000, profitToAdd: 2000, catg: 'TRADERS' },
  { levell: 6, coinsNeeded: 320000, profitToAdd: 2400, catg: 'TRADERS' },
  { levell: 7, coinsNeeded: 640000, profitToAdd: 2800, catg: 'TRADERS' },
  { levell: 8, coinsNeeded: 1280000, profitToAdd: 3200, catg: 'TRADERS' },
  { levell: 9, coinsNeeded: 2560000, profitToAdd: 3600, catg: 'TRADERS' },
  { levell: 10, coinsNeeded: 5120000, profitToAdd: 4000, catg: 'TRADERS' },
];

const addTraders = async () => {
  try {
    const kingData = await fetchData('king');
    if (!kingData || kingData.length === 0) {
      console.error('No data found for king');
      return;
    }

    const totalCoinsFromKing = kingData[0]?.totalCoins || 0;
    const previousProfit = kingData[0]?.profit || 0;

    const taxData = await fetchData('tax', { catg: 'TRADERS' });
    if (!taxData || taxData.length === 0) {
      console.error('No tax data found for TRADERS category');
      return;
    }

    // Find the appropriate tax item based on the category
    const taxItem = taxData.find(item => item.catg === 'TRADERS');

    if (!taxItem) {
      console.error('Tax data not found for the TRADERS category');
      return;
    }

    const coinsNeeded = taxItem.coinsNeeded || 0;
    const profitToAdd = taxItem.profit || 0;

    if (totalCoinsFromKing < coinsNeeded) {
      setShowAlertTraders(true);
      return;
    }

    const updatedCoins = totalCoinsFromKing - coinsNeeded;
    const updatedProfit = profitToAdd;

    const nextLevelData = levelData3[taxItem.levell];
    const { profitToAdd: nextProfitToAdd, coinsNeeded: nextCoinsNeeded, catg: nextCatg } = nextLevelData;

    const taxDataToUpdate = {
      profit: nextProfitToAdd,
      levell: taxItem.levell + 1,
      coinsNeeded: nextCoinsNeeded,
      catg: nextCatg,
    };

    await Promise.all([
      updateData('tax', taxItem.id, taxDataToUpdate),
      updateData('king', kingData[0].id, { totalCoins: updatedCoins, profit: updatedProfit + previousProfit }),
    ]);

    setCurrentLevel3(taxItem.levell + 1);

    if (taxItem.levell + 1 >= levelData3.length) {
      console.log('You have reached the maximum level.');
      setButtonDisabled(true);
    }
  } catch (error) {
    console.error('Error purchasing TRADERS items:', error);
  }
};
//______________________________________IND
const handleOpenAlert4=() => {
  setShowAlertInd(true);
  
};

const handleCloseAlert4=() => {
  setShowAlertInd(false);
};
useEffect(() => {
  fetchLevel4(); 
}, []);

const fetchLevel4 = async () => {
  try {
    const result = await fetchData('tax', { catg: 'IND' });
    if (result && result.length > 0) {
      const level = result[0].levell || 1;
      setCurrentLevel4(level);
      const levelData4 = [
        { levell: 1, coinsNeeded: 20000, profitToAdd: 1000, catg: 'IND' },
        { levell: 2, coinsNeeded: 40000, profitToAdd: 2000, catg: 'IND' },
        { levell: 3, coinsNeeded: 80000, profitToAdd: 3000, catg: 'IND' },
        { levell: 4, coinsNeeded: 160000, profitToAdd: 4000, catg: 'IND' },
        { levell: 5, coinsNeeded: 320000, profitToAdd: 5000, catg: 'IND' },
        { levell: 6, coinsNeeded: 640000, profitToAdd: 6000, catg: 'IND' },
        { levell: 7, coinsNeeded: 1200000, profitToAdd: 7000, catg: 'IND' },
        { levell: 8, coinsNeeded: 2400000, profitToAdd: 8000, catg: 'IND' },
        { levell: 9, coinsNeeded: 4800000, profitToAdd: 9000, catg: 'IND' },
        { levell: 10, coinsNeeded: 9600000, profitToAdd: 10000, catg: 'IND' },
      ];

      if (level >= 1 && level <= levelData4.length) {
        setCoinsNeeded8(levelData4[level - 1].coinsNeeded);
        setProfitToAdd4(levelData4[level - 1].profitToAdd);
        setCurrentLevel4(levelData4[level - 1].levell);
        setCoinsNeeded9(levelData4[level - 1].catg);
      }
    } else {
      console.error('No data found for IND');
    }
  } catch (error) {
    console.error('Error fetching level:', error);
  }
};

const levelData4 = [
  { levell: 1, coinsNeeded: 20000, profitToAdd: 1000, catg: 'IND' },
  { levell: 2, coinsNeeded: 40000, profitToAdd: 2000, catg: 'IND' },
  { levell: 3, coinsNeeded: 80000, profitToAdd: 3000, catg: 'IND' },
  { levell: 4, coinsNeeded: 160000, profitToAdd: 4000, catg: 'IND' },
  { levell: 5, coinsNeeded: 320000, profitToAdd: 5000, catg: 'IND' },
  { levell: 6, coinsNeeded: 640000, profitToAdd: 6000, catg: 'IND' },
  { levell: 7, coinsNeeded: 1200000, profitToAdd: 7000, catg: 'IND' },
  { levell: 8, coinsNeeded: 2400000, profitToAdd: 8000, catg: 'IND' },
  { levell: 9, coinsNeeded: 4800000, profitToAdd: 9000, catg: 'IND' },
  { levell: 10, coinsNeeded: 9600000, profitToAdd: 10000, catg: 'IND' },
];


const addIND = async () => {
  try {
    const kingData = await fetchData('king');
    const totalCoinsFromKing = kingData[0].totalCoins;
    const previousProfit = kingData[0].profit || 0;

    const taxData = await fetchData('tax', { catg: 'IND' });

    if (!taxData || taxData.length === 0) {
      console.error('No tax data found for IND category');
      return;
    }

    // Find the appropriate tax item based on the category
    const taxItem = taxData.find(item => item.catg === 'IND');

    if (!taxItem) {
      console.error('Tax data not found for the IND category');
      return;
    }

    const nextLevel = taxItem.levell || 1;

    const levelData4 = [
      { levell: 1, coinsNeeded: 20000, profitToAdd: 1000, catg: 'IND' },
      { levell: 2, coinsNeeded: 40000, profitToAdd: 2000, catg: 'IND' },
      { levell: 3, coinsNeeded: 80000, profitToAdd: 3000, catg: 'IND' },
      { levell: 4, coinsNeeded: 160000, profitToAdd: 4000, catg: 'IND' },
      { levell: 5, coinsNeeded: 320000, profitToAdd: 5000, catg: 'IND' },
      { levell: 6, coinsNeeded: 640000, profitToAdd: 6000, catg: 'IND' },
      { levell: 7, coinsNeeded: 1200000, profitToAdd: 7000, catg: 'IND' },
      { levell: 8, coinsNeeded: 2400000, profitToAdd: 8000, catg: 'IND' },
      { levell: 9, coinsNeeded: 4800000, profitToAdd: 9000, catg: 'IND' },
      { levell: 10, coinsNeeded: 9600000, profitToAdd: 10000, catg: 'IND' },
    ];

    if (nextLevel < 1 || nextLevel > levelData4.length) {
      console.error('Invalid level');
      return;
    }

    const currentLevelData = levelData4[nextLevel - 1];
    const { coinsNeeded, profitToAdd } = currentLevelData;

    if (totalCoinsFromKing < coinsNeeded) {
      setShowAlertInd(true);
      return;
    }
    setShowAlertInd(false);

    const updatedCoins = totalCoinsFromKing - coinsNeeded;
    const updatedProfit = profitToAdd;

    const nextLevelData = levelData4[nextLevel];
    const { profitToAdd: nextProfitToAdd, coinsNeeded: nextCoinsNeeded, catg: nextCatg } = nextLevelData;

    const taxDataToUpdate = {
      profit: nextProfitToAdd,
      levell: nextLevel + 1,
      coinsNeeded: nextCoinsNeeded,
      catg: nextCatg,
    };

    await Promise.all([
      updateData('tax', taxItem.id, taxDataToUpdate),
      updateData('king', kingData[0].id, { totalCoins: updatedCoins, profit: updatedProfit + previousProfit }),
    ]);

    setCurrentLevel4(nextLevel + 1);

    if (nextLevel + 1 >= levelData4.length) {
      console.log('You have reached the maximum level.');
      setButtonDisabled(true);
    }
  } catch (error) {
    console.error('Error purchasing IND items:', error);
  }
};
//______________________________________ARMY
const handleOpenAlert5=() => {
  setShowAlertArmy(true);
  
};

const handleCloseAlert5=() => {
  setShowAlertArmy(false);
};
useEffect(() => {
  fetchLevel5(); 
}, []);
const fetchLevel5 = async () => {
  try {
    const result = await fetchData('tax', { catg: 'ARMY' });
    if (result && result.length > 0) {
      const level = result[0].levell || 1;
      setCurrentLevel5(level);

      const levelData5 = [
        { levell: 1, coinsNeeded10: 40000, profitToAdd5: 2000,catg: 'ARMY'  },
        { levell: 2, coinsNeeded10: 80000, profitToAdd5: 4000,catg: 'ARMY'  },
        { levell: 3, coinsNeeded10: 160000, profitToAdd5: 6000,catg: 'ARMY'  },
        { levell: 4, coinsNeeded10: 320000, profitToAdd5: 8000,catg: 'ARMY'  },
        { levell: 5, coinsNeeded10: 640000, profitToAdd5: 10000,catg: 'ARMY'  },
        { levell: 6, coinsNeeded10: 1200000, profitToAdd5: 12000,catg: 'ARMY'  },
        { levell: 7, coinsNeeded10: 2400000, profitToAdd5: 14000,catg: 'ARMY'  },
        { levell: 8, coinsNeeded10: 4800000, profitToAdd5: 16000,catg: 'ARMY'  },
        { levell: 9, coinsNeeded10: 9600000, profitToAdd5: 18000, catg: 'ARMY' },
        { levell: 10, coinsNeeded10: 19200000, profitToAdd5: 20000,catg: 'ARMY'  },
      ];

      if (level >= 1 && level <= levelData5.length) {
        setCoinsNeeded10(levelData5[level - 1].coinsNeeded);
        setProfitToAdd4(levelData5[level - 1].profitToAdd);
        setCurrentLevel4(levelData5[level - 1].levell);
        setCoinsNeeded11(levelData5[level - 1].catg);
      }
    } else {
      console.error('No data found for IND');
    }
  } catch (error) {
    console.error('Error fetching level:', error);
  }
};


const levelData5 = [
  { levell: 1, coinsNeeded10: 40000, profitToAdd5: 2000,catg: 'ARMY'  },
  { levell: 2, coinsNeeded10: 80000, profitToAdd5: 4000,catg: 'ARMY'  },
  { levell: 3, coinsNeeded10: 160000, profitToAdd5: 6000,catg: 'ARMY'  },
  { levell: 4, coinsNeeded10: 320000, profitToAdd5: 8000,catg: 'ARMY'  },
  { levell: 5, coinsNeeded10: 640000, profitToAdd5: 10000,catg: 'ARMY'  },
  { levell: 6, coinsNeeded10: 1200000, profitToAdd5: 12000,catg: 'ARMY'  },
  { levell: 7, coinsNeeded10: 2400000, profitToAdd5: 14000,catg: 'ARMY'  },
  { levell: 8, coinsNeeded10: 4800000, profitToAdd5: 16000,catg: 'ARMY'  },
  { levell: 9, coinsNeeded10: 9600000, profitToAdd5: 18000, catg: 'ARMY' },
  { levell: 10, coinsNeeded10: 19200000, profitToAdd5: 20000,catg: 'ARMY'  },
];

const addArmy = async () => {
  try {
    const kingData = await fetchData('king');
    const totalCoinsFromKing = kingData[0].totalCoins;
    const previousProfit = kingData[0].profit || 0;

    const taxData = await fetchData('tax', { catg: 'ARMY' });

    if (!taxData || taxData.length === 0) {
      console.error('No tax data found for ARMY category');
      return;
    }

    // Find the appropriate tax item based on the category
    const taxItem = taxData.find(item => item.catg === 'ARMY');

    if (!taxItem) {
      console.error('Tax data not found for the ARMY category');
      return;
    }

    const nextLevel = taxItem.levell || 1;
    const levelData5 = [
      { levell: 1, coinsNeeded: 40000, profitToAdd: 2000,catg: 'ARMY'  },
      { levell: 2, coinsNeeded: 80000, profitToAdd: 4000,catg: 'ARMY'  },
      { levell: 3, coinsNeeded: 160000, profitToAdd: 6000,catg: 'ARMY'  },
      { levell: 4, coinsNeeded: 320000, profitToAdd: 8000,catg: 'ARMY'  },
      { levell: 5, coinsNeeded: 640000, profitToAdd: 10000,catg: 'ARMY'  },
      { levell: 6, coinsNeeded: 1200000, profitToAdd: 12000,catg: 'ARMY'  },
      { levell: 7, coinsNeeded: 2400000, profitToAdd: 14000,catg: 'ARMY'  },
      { levell: 8, coinsNeeded: 4800000, profitToAdd: 16000,catg: 'ARMY'  },
      { levell: 9, coinsNeeded: 9600000, profitToAdd: 18000, catg: 'ARMY' },
      { levell: 10, coinsNeeded: 19200000, profitToAdd: 20000,catg: 'ARMY'  },
    ];
    if (nextLevel < 1 || nextLevel > levelData5.length) {
      console.error('Invalid level');
      return;
    }
    
    const currentLevelData = levelData5[nextLevel - 1];
    const { coinsNeeded, profitToAdd } = currentLevelData;
    
    if (totalCoinsFromKing < coinsNeeded) {
      setShowAlertArmy(true);
      return;
    }
    setShowAlertArmy(false);
    
    const updatedCoins = totalCoinsFromKing - coinsNeeded;
    const updatedProfit = profitToAdd;
    
    const nextLevelData = levelData5[nextLevel];
    const { profitToAdd: nextProfitToAdd, coinsNeeded: nextCoinsNeeded, catg: nextCatg } = nextLevelData;
    
    const taxDataToUpdate = {
      profit: nextProfitToAdd,
      levell: nextLevel + 1,
      coinsNeeded: nextCoinsNeeded,
      catg: nextCatg,
    };
    
    await Promise.all([
      updateData('tax', taxItem.id, taxDataToUpdate),
      updateData('king', kingData[0].id, { totalCoins: updatedCoins, profit: updatedProfit + previousProfit }),
    ]);
    
    setCurrentLevel5(nextLevel + 1);
    
    if (nextLevel + 1 >= levelData5.length) {
      console.log('You have reached the maximum level.');
      setButtonDisabled(true);
    }
    
  } catch (error) {
    console.error('Error purchasing ARMY items:', error);
  }
};


const formatNumberWithCommas = (number) => {
  if (number > 1000) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return number.toString();
  }
}



  const handleFocus = (buttonName) => {
    setFocusedButton(buttonName);
  };

  const toggleKingdomLand = () => {
    setShowKingdomLand(true);
    setShowComingSoon(false);
    handleFocus('kingdomLand');
  };

  const toggleComingSoon = () => {
    setShowKingdomLand(false);
    setShowComingSoon(true);
    handleFocus('comingSoon');
  };
  const taxPage = 'taxPage';
  const coinsNeededMessage = (
    <Text>
      You need {coinsNeeded - totalCoins} more coins to purchase Citizen level {currentLevel}.
    </Text>
  );

  const profitMessage = (
    <Text>
      Lvl {currentLevel}{'\n'}+{profitToAdd} P/H{'\n'}+{coinsNeeded1}
        <Image source={require('../assets/coin.png')} style={styles.coinImage} />
    </Text>
  );

  const message = totalCoins < coinsNeeded ? coinsNeededMessage : profitMessage;

  const formatNeededCoins = (neededCoins) => {
    if (neededCoins >= 1000) {
      return (neededCoins / 1000) + 'K';
    }
    return neededCoins.toString();
  };
  
  const handleEdit = () => {
    setEditingItems(taxId); // Set all items to be edited
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
        const updatedItem = {
          ...item,
          levell: parseInt(item.levell),
          coinsNeeded: parseInt(item.coinsNeeded),
          profit: parseInt(item.profit),
        };
        return updateData('tax', item.id, updatedItem);
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
<View style={styles.container}>
<ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={require('../assets/profile.jpeg')} style={[styles.profileImage, {width: 50, height: 50}]} />
        <Text style={styles.profileName}>Somayah Ali</Text>
        
        <Image source={require('../assets/53.png')} style={styles.centeredImage} />
        {quizData.map((taxItem) => (

        <View key = {taxItem.id} style={[styles.totalCoinsContainer,{}]}>        
          <Image source={require('../assets/coin.png')} style={[styles.coinImage,
          {width: 70, height: 70}]} />
            <Text style={styles.totalCoins}> {taxItem.totalCoins !== undefined ?formatNumberWithCommas(taxItem.totalCoins): 'Loading...'}</Text>
          </View>
        ))}

          <View style={{flexDirection: 'row', alignSelf:'center'}}>
          <TouchableOpacity onPress={toggleKingdomLand} 
          style={focusedButton === 'kingdomLand' ? styles.focusedImage : null}>
                <ImageBackground source={require('../assets/38.png')} style={styles.imageBackground1}>
                  <View style={styles.contentItem1}>
                  <Text style={styles.headerText1}>KINGDOM</Text>
                  <Text style={styles.headerText1}> LAND</Text>   
                      </View>
                </ImageBackground>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={toggleComingSoon}
                  style={focusedButton === 'comingSoon' ? styles.focusedImage : null}>
                <ImageBackground source={require('../assets/38.png')} style={styles.imageBackground1}>
                  <View style={styles.contentItem1}>
                  <Text style={styles.headerText1}>COMING</Text>
                  <Text style={styles.headerText1}>SOON</Text>   
                      </View>
                </ImageBackground>
        </TouchableOpacity>
        </View>
       
          {showKingdomLand && (
        <>
         {taxId.slice(0, 1).map((levelItem, index) => (
        <TouchableOpacity onPress={() => handleEdit(levelItem)} key={index}>
          <Text style={{ color: 'white', marginTop: 10 }}>Edit</Text>
        </TouchableOpacity>
      ))}
        <View style={[styles.row, {}]}>
        <TouchableOpacity onPress={handleOpenAlert} disabled={buttonDisabled}>
      {taxId.filter(levelItem => levelItem.catg === 'CITIZEN').map((levelItem, index) => (
        <ImageBackground
        key={levelItem.id}
          source={require('../assets/32.png')}
          style={[styles.imageBackground, { marginRight: 20 }]}
        >
          <Text
            style={[
              styles.contentText1,
              {
                position: 'absolute',
                left: 17,
                top: 30,
                fontSize: 13,
                fontWeight: 'bold',
                transform: [{ skewX: '38deg' }, { skewY: '-40deg' }],
              },
            ]}
          >{formatNeededCoins(levelItem.coinsNeeded)}</Text>
          <View style={[styles.contentItem, { marginLeft: 30 }]}>
            <Text style={styles.contentText}>LVL{levelItem.levell}</Text>
            <Text style={styles.contentText}>
              {levelItem.profit} P/H
              <Image source={require('../assets/coin.png')} style={styles.coinImage} />
            </Text>
          </View>
        </ImageBackground>
      ))}
      {taxId.filter(levelItem => levelItem.catg === 'CITIZEN').map((levelItem, taxIndex) => (
        quizData.map((taxItem, quizIndex) => (
          <CustomAlert
          key={`CITIZEN-${taxIndex}-${quizIndex}`}
            visible={showAlertCitizen}
            onClose={() => setShowAlertCitizen(false)}
            onConfirm={addCitizen}
            insufficientCoins={taxItem.totalCoins < levelItem.coinsNeeded}
            message={taxItem.totalCoins < levelItem.coinsNeeded ? `You need ${levelItem.coinsNeeded - taxItem.totalCoins} more coins to purchase CITIZEN level ${levelItem.levell}.` : `Lvl ${levelItem.levell}\n+${levelItem.profit} P/H \n${levelItem.coinsNeeded}`}
          />
        ))
      ))}
    </TouchableOpacity>

    <TouchableOpacity onPress={handleOpenAlert1} disabled={buttonDisabled}>
      {taxId.filter(levelItem => levelItem.catg === 'FARMERS').map((levelItem, index) => (
        <ImageBackground key={levelItem.id} source={require('../assets/33.png')} style={styles.imageBackground}>
          <Text style={[styles.contentText1, { position: 'absolute', left: 110, top: 28, fontSize: 13, fontWeight: 'bold', transform: [{ skewX: '-40deg' }, { skewY: '38deg' }] }]}>
            {formatNeededCoins(levelItem.coinsNeeded)}</Text>
          <View style={[styles.contentItem, { marginRight: 20 }]}>
            <Text style={styles.contentText}>LVL{levelItem.levell}</Text>
            <Text style={styles.contentText}>
              {levelItem.profit} P/H
              <Image source={require('../assets/coin.png')} style={styles.coinImage} />
            </Text>
          </View>
        </ImageBackground>
      ))}
      {taxId.filter(levelItem => levelItem.catg === 'FARMERS').map((levelItem, taxIndex) => (
        quizData.map((taxItem, quizIndex) => (
          <CustomAlert
          key={`FARMERS-${taxIndex}-${quizIndex}`}
          visible={showAlertFarmers}
            onClose={() => setShowAlertFarmers(false)}
            onConfirm={addFarmers}
            insufficientCoins={taxItem && levelItem && taxItem.totalCoins < levelItem.coinsNeeded}
            message={taxItem.totalCoins < levelItem.coinsNeeded ? `You need ${levelItem.coinsNeeded - taxItem.totalCoins} more coins to purchase FARMERS level ${levelItem.levell}.` : `Lvl ${levelItem.levell}\n+${levelItem.profit} P/H \n${levelItem.coinsNeeded}`}
            />
        ))
      ))}
    </TouchableOpacity>
            </View>


  <View style={[styles.row, {}]}>
            <TouchableOpacity onPress={handleOpenAlert2} disabled={buttonDisabled}>
            {taxId.filter(levelItem => levelItem.catg === 'DOCTORS').map((levelItem, index) => (
                <ImageBackground key={levelItem.id} source={require('../assets/34.png')} style={styles.imageBackground}>
                <Text style={[styles.contentText1, { position: 'absolute', left: 17, top: 25,fontSize:13,fontWeight: 'bold',
                 transform: [{ skewX: '37deg' }, { skewY: '-40deg' }] }]}>{formatNeededCoins(levelItem.coinsNeeded)}</Text>
                <View style={[styles.contentItem, {marginLeft:40}]}>
                      <Text style={styles.contentText}>LVL{levelItem.levell}</Text>         
                        <Text style={styles.contentText}>{levelItem.profit} P/H
                        <Image source={require('../assets/coin.png')} style={styles.coinImage} />
                        </Text>         
                      </View>
                </ImageBackground>
            ))}
            </TouchableOpacity>

      {taxId.filter(levelItem => levelItem.catg === 'DOCTORS').map((levelItem, taxIndex) => (
          quizData.map((taxItem, quizIndex) => (
            <CustomAlert
            key={`DOCTORS-${taxIndex}-${quizIndex}`}
            visible={showAlertDoctors}
              onClose={() => setShowAlertDoctors(false)}
              onConfirm={addDoctors}
              insufficientCoins={taxItem.totalCoins < levelItem.coinsNeeded}
              message={taxItem.totalCoins < levelItem.coinsNeeded ? `You need ${levelItem.coinsNeeded - taxItem.totalCoins} more coins to purchase DOCTORS level ${levelItem.levell}.` : `Lvl ${levelItem.levell}\n+${levelItem.profit} P/H \n${levelItem.coinsNeeded}`}
            />
          ))
        ))}
            <TouchableOpacity onPress={handleOpenAlert3} disabled={buttonDisabled}>
            {taxId.filter(levelItem => levelItem.catg === 'TRADERS').map((levelItem, index) => (
                <ImageBackground key={levelItem.id} source={require('../assets/35.png')} style={styles.imageBackground}>
                <Text style={[styles.contentText1, { position: 'absolute', left: 123, top: 23,fontSize:13,fontWeight: 'bold',
                 transform: [{ skewX: '-37deg' }, { skewY: '40deg' }] }]}>{formatNeededCoins(levelItem.coinsNeeded)}</Text>
                  <View style={[styles.contentItem, {marginRight:20}]}>
                      <Text style={styles.contentText}>LVL{levelItem.levell}</Text>         
                        <Text style={styles.contentText}>{levelItem.profit} P/H
                        <Image source={require('../assets/coin.png')} style={styles.coinImage} />
                        </Text>         
                      </View>
                </ImageBackground>
            ))}
            </TouchableOpacity>

           {taxId.filter(levelItem => levelItem.catg === 'TRADERS').map((levelItem, taxIndex) => (
          quizData.map((taxItem, quizIndex) => (
            <CustomAlert
            key={`TRADERS-${taxIndex}-${quizIndex}`}
            visible={showAlertTraders}
              onClose={() => setShowAlertTraders(false)}
              onConfirm={addTraders}
              insufficientCoins={taxItem.totalCoins < levelItem.coinsNeeded}
              message={taxItem.totalCoins < levelItem.coinsNeeded ? `You need ${levelItem.coinsNeeded - taxItem.totalCoins} more coins to purchase TRADERS level ${levelItem.levell}.` : `Lvl ${levelItem.levell}\n+${levelItem.profit} P/H \n${levelItem.coinsNeeded}`}
            />
          ))
        ))}
        </View>

         <View style={[styles.row, {}]}>
            <TouchableOpacity onPress={handleOpenAlert4} disabled={buttonDisabled}>
            {taxId.filter(levelItem => levelItem.catg === 'IND').map((levelItem, index) => (
                <ImageBackground key={levelItem.id} source={require('../assets/37.png')} style={styles.imageBackground}>
                <Text style={[styles.contentText1, { position: 'absolute', left: 15, top: 26,fontSize:13,fontWeight: 'bold',
                 transform: [{ skewX: '36deg' }, { skewY: '-40deg' }] }]}>{formatNeededCoins(levelItem.coinsNeeded)}</Text>
                  <View style={[styles.contentItem, {marginLeft:30}]}>
                      <Text style={styles.contentText}>LVL{levelItem.levell}</Text>         
                        <Text style={styles.contentText}>{levelItem.profit} P/H
                        <Image source={require('../assets/coin.png')} style={styles.coinImage} />
                        </Text>         
                      </View>
                </ImageBackground>
            ))}
            </TouchableOpacity>

          {taxId.filter(levelItem => levelItem.catg === 'IND').map((levelItem, taxIndex) => (
          quizData.map((taxItem, quizIndex) => (
            <CustomAlert
            key={`IND-${taxIndex}-${quizIndex}`}
              visible={showAlertInd}
              onClose={() => setShowAlertInd(false)}
              onConfirm={addIND}
              insufficientCoins={taxItem.totalCoins < levelItem.coinsNeeded}
              message={taxItem.totalCoins < levelItem.coinsNeeded ? `You need ${levelItem.coinsNeeded - taxItem.totalCoins} more coins to purchase IND level ${levelItem.levell}.` : `Lvl ${levelItem.levell}\n+${levelItem.profit} P/H \n${levelItem.coinsNeeded}`}
            />
          ))
        ))}

          

            <TouchableOpacity onPress={handleOpenAlert5} disabled={buttonDisabled}>
            {taxId.filter(levelItem => levelItem.catg === 'ARMY').map((levelItem, index) => (
                <ImageBackground key={levelItem.id} source={require('../assets/36.png')} style={styles.imageBackground}>
                <Text style={[styles.contentText1, { position: 'absolute', left: 122, top: 29,fontSize:13,fontWeight: 'bold',
                 transform: [{ skewX: '-42deg' }, { skewY: '36deg' }] }]}>{formatNeededCoins(levelItem.coinsNeeded)}</Text>
                  <View style={[styles.contentItem, {marginRight:20}]}>
                      <Text style={styles.contentText}>LVL{levelItem.levell}</Text>         
                        <Text style={styles.contentText}>{levelItem.profit} P/H
                        <Image source={require('../assets/coin.png')} style={styles.coinImage} />
                        </Text>         
                      </View>
                </ImageBackground>
            ))}
            </TouchableOpacity>

           {taxId.filter(levelItem => levelItem.catg === 'ARMY').map((levelItem, taxIndex) => (
            quizData.map((taxItem, quizIndex) => (
              <CustomAlert
              key={`ARMY-${taxIndex}-${quizIndex}`}
              visible={showAlertArmy}
                onClose={() => setShowAlertArmy(false)}
                onConfirm={addArmy}
                insufficientCoins={taxItem.totalCoins < levelItem.coinsNeeded}
                message={taxItem.totalCoins < levelItem.coinsNeeded ? `You need ${levelItem.coinsNeeded - taxItem.totalCoins} more coins to purchase ARMY level ${levelItem.levell}.` : `Lvl ${levelItem.levell}\n+${levelItem.profit} P/H \n${levelItem.coinsNeeded}`}
              />
            ))
          ))}

          

          
        </View>
        </>

      )}

    {showComingSoon && (
  <View style={[styles.row, {marginTop:30}]}>
    <Text style={{color:'white'}}>
    <Image source={require('../assets/48.png')} style={{width:300,height:300}} />
    </Text> 
        </View>
         )}
        
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
          // Render every two items in a row
          index % 2 === 0 && (
            <View key={item.id} style={styles.modalRowContainer}>
              <View style={styles.modalItemContainer}>
                <Text style={styles.modalItemTitle}>{item.catg}</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Level"
                  value={item.levell.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'levell', text)}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Coins Needed"
                  value={item.coinsNeeded.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'coinsNeeded', text)}
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.modalInput}
                  placeholder="Profit"
                  value={item.profit.toString()}
                  onChangeText={(text) => handleInputChange(item.id, 'profit', text)}
                  keyboardType="numeric"
                />
              </View>
              {/* Render the second item in the pair */}
              {index + 1 < editingItems.length && (
                <View style={styles.modalItemContainer}>
                  <Text style={styles.modalItemTitle}>{editingItems[index + 1].catg}</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Level"
                    value={editingItems[index + 1].levell.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'levell', text)}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Coins Needed"
                    value={editingItems[index + 1].coinsNeeded.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'coinsNeeded', text)}
                    keyboardType="numeric"
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Profit"
                    value={editingItems[index + 1].profit.toString()}
                    onChangeText={(text) => handleInputChange(editingItems[index + 1].id, 'profit', text)}
                    keyboardType="numeric"
                  />
                </View>
              )}
            </View>
          )
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
    width:'100%',
    padding: 5,
    paddingTop:15,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    backgroundColor: 'rgba(30, 0, 0, 0.8)',
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

  
  totalCoinsContainer: {
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
  coinImage: {
    width: 20,
    height: 20,

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
  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  imageBackground: {
    width:160,
    height:140,
    justifyContent: 'center',
    resizeMode: 'contain', // Added to ensure image fits within container
  },
  imageBackground1: {
    width:100,
    height:100,
    justifyContent: 'center',
    alignSelf:'center'
  },

  headerText1: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white', // White color for header text
    textAlign: 'center', // Center align the text
  },
  contentItem: {
    alignItems: 'center',
    marginTop: 75, // Add margin top for spacing between text and image
  },
  contentItem1: {
    alignItems: 'center',
  },
  coinImage: {
    width: 15,
    height: 15,
  },
  contentText: {
    color: '#a86641', // White color for content text
    textAlign: 'center', // Center align the text
    fontSize:12,
  },
  contentText1: {
    color: 'beige', // White color for content text
    fontSize:12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalScrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },

  modalItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },


modalRowContainer: {
  flexDirection: 'row',
  marginBottom: 10,
},
modalItemContainer: {
  width: '50%',
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 5,
  marginRight: 10,
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
// evenRow: {
//   backgroundColor: '#F5F5F5', // Alternate background color
// },
// oddRow: {
//   backgroundColor: '#E0E0E0', // Alternate background color
// },

});

export default TaxPage;
