// app/screens/SignUpScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendOtp } from '../services/twilioService'; // Import Twilio service

const SignUpScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to validate and format phone number to E.164
  const formatPhoneNumber = (input) => {
    // Ensure the number starts with "+" or prepend with country code "+27" (for South Africa)
    if (input.startsWith('+')) return input;
    if (input.startsWith('0')) return `+27${input.slice(1)}`; // Convert "072..." to "+2772..."
    return input;
  };

  const handleSendOtp = async () => {
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber); // Format number

    // Validate the formatted number (should start with '+' and be at least 10 digits)
    if (!/^\+\d{10,15}$/.test(formattedPhoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number in E.164 format.');
      return;
    }

    try {
      const otp = await sendOtp(formattedPhoneNumber); // Send OTP with formatted number
      Alert.alert('OTP Sent!', `Verification code sent to ${formattedPhoneNumber}`);
      navigation.navigate('OTPVerification', { phoneNumber: formattedPhoneNumber, otp }); // Navigate to OTP verification screen
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number (e.g., 0721234567)"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
        <Text style={styles.buttonText}>Send OTP</Text>
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
