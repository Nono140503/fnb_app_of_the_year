import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';

const OTPVerificationScreen = ({ route, navigation }) => {
  const { phoneNumber, otp: sentOtp } = route.params; // Receive the phone number and OTP from SignUpScreen
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleVerifyOtp = () => {
    setIsLoading(true); // Show loading indicator

    setTimeout(() => {
      if (enteredOtp === sentOtp.toString()) {
        Alert.alert('Success', 'OTP Verified!');
        setIsLoading(false); // Hide loading indicator
        navigation.replace('Login'); // Navigate to Login screen
      } else {
        setIsLoading(false); // Hide loading indicator
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    }, 2000); // Simulate network request delay
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Details</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to {phoneNumber} for verification.
      </Text>

      <TextInput
        style={styles.input}
        value={enteredOtp}
        onChangeText={setEnteredOtp}
        keyboardType="number-pad"
        maxLength={6}
      />

      <TouchableOpacity 
        style={[styles.button, { opacity: enteredOtp.length === 6 ? 1 : 0.5 }]}
        onPress={handleVerifyOtp}
        disabled={enteredOtp.length !== 6 || isLoading} // Disable when loading
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OTPVerificationScreen;
