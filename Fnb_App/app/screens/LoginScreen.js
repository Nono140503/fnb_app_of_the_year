import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../../firebase'; // Import the auth instance from your Firebase setup
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../firebase'; 
import { doc, setDoc } from 'firebase/firestore';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('Login'); 
  const [modalVisible, setModalVisible] = useState(false);

  // Handle user login
  useEffect(() => {
    // Check if the user just signed up and set modal visibility
    if (route.params?.justSignedUp) {
        setModalVisible(true);
    }
}, [route.params]);
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully');
      navigation.navigate('Home Screen', { userEmail: email });
      
    } catch (error) {
      Alert.alert('Login Failed', 'Incorrect Credentials');
    }
  };

  // Handle user signup
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, 'users', user.uid), {
        email,
        userId: user.uid,
      });
      
      Alert.alert('Success', 'Account created successfully');
      
      // Show the modal after successful signup
      setModalVisible(true); 
      
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };
  const edit = () => {
    navigation.navigate('Edit Profile', { userEmail: email });
    setModalVisible(false);
};
const closeModal = () => {
  setModalVisible(false);
  // Add any additional logic for after modal is closed
};
  return (
    <>
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
      <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.overlay}>
                        <View style={styles.modalView}>
                            <Text style={styles.welcome}>Welcome!</Text>
                            <Text style={styles.modalText}>Before you proceed, please update your profile details.</Text>
                            
                            <TouchableOpacity onPress={edit} style={styles.proceed}>
                                <Text style={styles.proceedText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
    </View>
    </>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
    alignItems: 'center',
},    modalView: {
  marginTop: 300,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 20,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
      width: 0,
      height: 2,
  },
  width: '90%',
  height: 180,
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},    
proceed:{
  padding: 10,
  backgroundColor: '#1d61e7',
  width: '80%',
  alignItems: 'center',
  borderRadius: 5,
},
proceedText:{
  color:'white',
  fontWeight: 'bold',
  fontSize: 15,
},
modalView: {
        marginTop: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width: '90%',
        height: 180,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
