import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image, 
} from 'react-native';
import { auth, db } from '../../firebase'; // Adjust the path as necessary
import { doc, getDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const BankingDetailsScreen = ({navigation}) => {
  const [userName, setUserName] = useState(''); // State to store user's name

  const cardData = [
    {
      bankName: 'ABC bank',
      cardNumber: '4756 **** **** 9018',
      type: 'VISA',
      logo: require('../../assets/visa_logo.png'),
      backgroundColor: '#8F908B', // Color for the first card
    },
    {
      bankName: 'ABC bank Platinum',
      cardNumber: '4756 **** **** 9018',
      type: 'MasterCard',
      logo: require('../../assets/master_card_logo.png'),
      backgroundColor: '#FC8D05', // Color for the second card
    },
  ];
  const handleBack = ()=>{
    navigation.goBack();
  }
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Get the currently logged-in user
      if (user) {
        const userDocRef = doc(db, 'users', user.email); // Use the user's email to fetch their data
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserName(userDoc.data().name); // Set the user's name to state
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.heading}>
            <Icon name='arrow-back-outline' size={30} style={styles.icon} onPress={handleBack}/>
            <Text style={styles.name}>Banking Details</Text>
        </View>
        
        {cardData.map((card, index) => (
        <View key={index} style={[styles.card, { backgroundColor: card.backgroundColor }]}>
            <Text style={styles.cardName}>{userName}</Text> 
            <Text style={styles.bankName}>{card.bankName}</Text>
            <Text style={styles.cardNumber}>{card.cardNumber}</Text>
            <Image source={card.logo} style={styles.logo} />
        </View>
        ))}
        <TouchableOpacity style={styles.addCardButton}>
          <Text style={styles.addCardButtonText}>Add new Card</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 60,
  },
  heading:{
    marginTop: 30,
    flexDirection: 'row',
    
  },
  icon:{
    padding:5,
  },
  card: {
    backgroundColor: '#8F908B',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'column',
  },
  logo: {
    width: 60,
    height: 40,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    marginTop: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bankName: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
  },
  cardNumber: {
    fontSize: 14,
    color: '#FFF',
    marginVertical: 5,
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
  },
  addCardButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addCardButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default BankingDetailsScreen;
