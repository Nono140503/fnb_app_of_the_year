import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth } from '../../firebase'; // Import your Firebase configuration

const HistoryScreen = ({ navigation }) => {
  const [pdfs, setPdfs] = useState([]);
  const userId = auth.currentUser.uid; // Get the current user's ID

  useEffect(() => {
    const fetchPdfsFromStorage = async () => {
      try {
        const storage = getStorage();
        const pdfsRef = ref(storage, `invoices/${userId}`); // Folder for the specific user
        const pdfsSnapshot = await listAll(pdfsRef);
        
        // Log to check what is being retrieved
        console.log("Fetched PDFs: ", pdfsSnapshot.items);

        // Map each item to include URL and metadata
        const pdfsData = await Promise.all(
          pdfsSnapshot.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
              id: itemRef.name,
              name: itemRef.name, // You can customize this as needed
              fileUri: url,
            };
          })
        );
        setPdfs(pdfsData);
      } catch (error) {
        console.error("Error fetching PDFs from storage: ", error);
        Alert.alert('Error', 'Failed to fetch PDF history from storage.');
      }
    };

    fetchPdfsFromStorage();
  }, [userId]); // Add userId as a dependency to re-fetch when it changes

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Pdf View Screen', { fileUri: item.fileUri })}>
      <View style={styles.pdfItem}>
        <Text style={styles.pdfText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.back}>
          <Icon name="arrow-back-outline" size={30}/>
        </TouchableOpacity>
        <Text style={styles.title}>PDF Invoice History</Text>
      </View>
      
      <FlatList
        data={pdfs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0ECFD',
  },
  back: {
    padding: 5,
    bottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginLeft: 30,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
  },
  pdfItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pdfText: {
    fontSize: 18,
  },
});

export default HistoryScreen;
