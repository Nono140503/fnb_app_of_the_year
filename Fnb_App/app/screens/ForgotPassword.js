import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    
    console.log('Resetting password for:', email);
  };
  const handleBack = () =>{
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={handleBack}>
            <Icon name='arrow-back-outline' size={30}/>
        </TouchableOpacity>
        
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        We will send you instructions to reset your password on your registered email.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={!email}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  back:{
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
