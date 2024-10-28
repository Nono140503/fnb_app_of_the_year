import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, StyleSheet, Button, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../../firebase'; // Adjust the import based on your project structure
import { db } from '../../firebase'; // Import Firestore
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

const ProfileScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', profilePicture: '' }); // State to hold user data

  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        Alert.alert("Logout Successful", "You have been logged out.", [{ text: "OK", onPress: () => navigation.navigate('Login') }]);
      })
      .catch((error) => {
        Alert.alert("Logout Failed", error.message);
      });
  };

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Get the current logged-in user
      if (user) {
        const email = user.email; // Get the user's email
        const docRef = doc(db, 'users', email); // Reference to the user document using email
        const docSnap = await getDoc(docRef); // Fetch the document

        if (docSnap.exists()) {
          setUserData({
            name: docSnap.data().name || 'User Name', // Set a default name if not available
            email: docSnap.data().email,
            profilePicture: docSnap.data().profileImage || '../../assets/default_avatar.png', // Use default if not available
          });
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("No user is currently logged in.");
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri: userData.profilePicture }} 
      />
      <Text style={styles.profileName}>{userData.name}</Text> 
      <Text style={styles.profileEmail}>{userData.email}</Text> 
      
      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Edit Profile')}
        >
          <Ionicons name="person-outline" size={20} color="#1E90FF" />
          <Text style={styles.optionText}>Edit Personal Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Banking Details')}
        >
          <Ionicons name="card-outline" size={20} color="#1E90FF" />
          <Text style={styles.optionText}>Edit Bank Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="lock-closed-outline" size={20} color="#1E90FF" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Ionicons name="heart-outline" size={20} color="#1E90FF" />
          <Text style={styles.optionText}>Favourites</Text>
        </TouchableOpacity>

        <View style={styles.darkModeContainer}>
          <Ionicons name="moon-outline" size={20} color="#1E90FF" />
          <Text style={styles.optionText}>Dark Mode</Text>
          <Switch
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
      </View>

      <Button
        title="Logout"
        color="#1E90FF"
        onPress={handleLogout} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 50,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  profileEmail: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
  optionContainer: {
    marginVertical: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  darkModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default ProfileScreen;
