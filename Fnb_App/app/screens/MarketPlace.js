import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MarketPlaceScreen = ({ navigation }) => { 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'marketplace'));
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);
    };
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`mailto:${item.contactEmail}`)}>
        <Text style={styles.email}>{item.contactEmail}</Text>
      </TouchableOpacity>
    </View>
  );

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name='arrow-back-outline' size={30}/>
        </TouchableOpacity>
        <Text style={styles.heading}>Marketplace</Text>
      </View>
      
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Create Marketplace Post')}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E0ECFD'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 25,
},
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 80,
    
  },
  listContainer: {
    paddingBottom: 60, 
    
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
},
  itemContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  email: {
    fontSize: 14,
    color: '#007AFF',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    elevation: 3,
    width: 50,
    alignItems: 'center'
},
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MarketPlaceScreen;
