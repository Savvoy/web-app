import React from 'react';
import { Modal, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomAlert = ({ visible, onClose, onConfirm, message,insufficientCoins }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Image source={require('../assets/49.png')} style={styles.image} />
        <View style={styles.overlay}>
          {insufficientCoins ? (
            <View>
              <Text style={[styles.message, { width: 255 }]}>{message}</Text>
              <View style={[styles.buttonContainer, { justifyContent: 'center' }]}>
                <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
            <Text style={[styles.message, { width: 255 }]}>{message}</Text>
              <View style={[styles.buttonContainer, { justifyContent: 'center' }]}>
              <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.okButton]}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
            </View>
            </>
            )}
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
  image: {
    width: 300,
    height: 300,
  },
  overlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  message: {
    marginTop:100,
    textAlign: 'center',
    marginBottom: 10,
    color: '#280606',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#280606',
  },
  okButton: {
    backgroundColor: '#280606',
  },
  buttonText: {
    color: 'white',
  },
  coinImage: {
    width: 20,
    height: 20,

  },
});

export default CustomAlert;
