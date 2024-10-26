import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('Login'); 

  const handleLogin = () => {
    navigation.navigate('Home Screen')
  };

  const handleSignUp = () => {
    // Sign up logic here
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/Pattern.png')} style={styles.background}>
        <Text style={styles.title}>Welcome back!</Text>
      </ImageBackground>
      
      <Text style={styles.subtitle}>Log in to explore new possibilities that suit your business needs.</Text>

      {/* Tabs for Login and Signup */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Login')} style={[styles.tab, activeTab === 'Login' && styles.activeTab]}>
          <Text style={styles.tabText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Signup')} style={[styles.tab, activeTab === 'Signup' && styles.activeTab]}>
          <Text style={styles.tabText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cont}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input with Eye Icon */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" style={styles.eye} />
          </TouchableOpacity>
        </View>

        {activeTab === 'Signup' && (
          <>
            {/* Confirm Password Input */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="gray" style={styles.eye} />
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Remember Me Toggle */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.toggleContainer} 
            onPress={() => setRememberMe(!rememberMe)}
          >
            <Ionicons 
              name={rememberMe ? 'checkbox-outline' : 'square-outline'} 
              size={24} 
              color="gray" 
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login/Signup Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={activeTab === 'Login' ? handleLogin : handleSignUp}
        >
          <Text style={styles.buttonText}>{activeTab === 'Login' ? 'Log In' : 'Sign Up'}</Text>
        </TouchableOpacity>

        {/* Social Logins */}
        <Text style={styles.orText}>Or login with</Text>
        <View style={styles.socialLoginContainer}>
          <Ionicons name="logo-google" size={32} color="gray" />
          <Ionicons name="logo-apple" size={32} color="gray" />
          <Ionicons name="logo-facebook" size={32} color="gray" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  eye: {
    right: 40,
    bottom: 5,
  },
  cont: {
    padding: 10,
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    color: 'gray',
  },
  forgotText: {
    color: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: 'gray',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default LoginScreen;
