import * as Network from 'expo-network';

// Function to get the local IP address
const getLocalIpAddress = async () => {
  const ipAddress = await Network.getIpAddressAsync();
  return ipAddress;
};

export const fetchData = async (table) => {
  try {
    const localIpAddress = await getLocalIpAddress();
    const BASE_URL = `http://${localIpAddress}:3000/api/data`;
    const response = await fetch(`${BASE_URL}/${table}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from table: ${table}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Create data in the specified table
export const createData = async (table, data) => {
  try {
    const localIpAddress = await getLocalIpAddress();
    const BASE_URL = `http://${localIpAddress}:3000/api/data`;
    const response = await fetch(`${BASE_URL}/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create data in table: ${table}. Error: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
};

// Update data in the specified table
export const updateData = async (table, id, data) => {
  if (!table || !id || !data) {
    throw new Error('Table name, ID, and data are required');
  }
  try {
    const localIpAddress = await getLocalIpAddress();
    const BASE_URL = `http://${localIpAddress}:3000/api/data`;
    const response = await fetch(`${BASE_URL}/${table}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update data in table: ${table}. Error: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};



// Delete data from the specified table
export const deleteData = async (table, id) => {
  try {
    const localIpAddress = await getLocalIpAddress();
    const BASE_URL = `http://${localIpAddress}:3000/api/data`;
    const response = await fetch(`${BASE_URL}/${table}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete data from table: ${table}. Error: ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
