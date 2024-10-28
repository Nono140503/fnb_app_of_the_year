import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Switch, StyleSheet, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import I18n, { setLanguage } from './i18n';

const ProfileScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', profilePicture: '' });
  const [open, setOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('eng_Latn');
  const [languages] = useState([
    { label: 'English', value: 'eng_Latn' },
    { label: 'Zulu', value: 'zul_Latn' },
  ]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const email = user.email;
        const docRef = doc(db, 'users', email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData({
            name: docSnap.data().name || 'User Name',
            email: docSnap.data().email,
            profilePicture: docSnap.data().profileImage || '../../assets/default_avatar.png',
          });
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setLanguage(language); // Set the language globally for the app
  };

  return (
    <View style={isDarkMode ? styles.darkContainer : styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri: userData.profilePicture }}
      />
      <Text style={isDarkMode ? styles.darkProfileName : styles.profileName}>
        {userData.name}
      </Text>
      <Text style={isDarkMode ? styles.darkProfileEmail : styles.profileEmail}>
        {userData.email}
      </Text>

      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Edit Profile')}>
          <Ionicons name="person-outline" size={20} color={isDarkMode ? '#fff' : '#1E90FF'} />
          <Text style={isDarkMode ? styles.darkOptionText : styles.optionText}>{I18n.t('edit_profile')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('BankDetails')}>
          <Ionicons name="card-outline" size={20} color={isDarkMode ? '#fff' : '#1E90FF'} />
          <Text style={isDarkMode ? styles.darkOptionText : styles.optionText}>{I18n.t('bank_details')}</Text>
        </TouchableOpacity>

        <View style={styles.languageContainer}>
          <Ionicons name="globe-outline" size={20} color={isDarkMode ? '#fff' : '#1E90FF'} />
          <Text style={isDarkMode ? styles.darkOptionText : styles.optionText}>{I18n.t('change_language')}</Text>
          <DropDownPicker
            open={open}
            value={selectedLanguage}
            items={languages}
            setOpen={setOpen}
            setValue={setSelectedLanguage}
            onChangeValue={(value) => handleLanguageChange(value)}
            containerStyle={{ width: '60%' }}
            style={{ backgroundColor: isDarkMode ? '#333' : '#f0f0f0', borderColor: '#1E90FF' }}
            dropDownContainerStyle={{ backgroundColor: isDarkMode ? '#444' : '#f8f8f8' }}
          />
        </View>

        <View style={styles.darkModeContainer}>
          <Ionicons name="moon-outline" size={20} color={isDarkMode ? '#fff' : '#1E90FF'} />
          <Text style={isDarkMode ? styles.darkOptionText : styles.optionText}>{I18n.t('dark_mode')}</Text>
          <Switch onValueChange={toggleDarkMode} value={isDarkMode} />
        </View>
      </View>

      <Button title={I18n.t('logout')} color="#1E90FF" onPress={() => auth.signOut()} />
    </View>
  );
};

export default ProfileScreen;
