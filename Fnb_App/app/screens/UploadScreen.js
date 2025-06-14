import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import { storage, db, auth } from '../../firebase'; // Import your Firebase instances
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

export default function UploadScreen({ navigation }) {
  const [fileName, setFileName] = useState(null);
  const [fileUri, setFileUri] = useState(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFileUpload = async () => {
    try {
      console.log("Opening document picker...");

      const res = await DocumentPicker.getDocumentAsync({
        type: 'text/plain',
      });

      if (!res.canceled && res.assets && res.assets.length > 0) {
        const asset = res.assets[0];
        setFileName(asset.name);
        setFileUri(asset.uri);

        // Upload file to Firebase Storage
        const storageRef = ref(storage, `uploads/${auth.currentUser.uid}/${asset.name}`);
        const response = await fetch(asset.uri);
        const blob = await response.blob();
        
        // Upload the file
        await uploadBytes(storageRef, blob);
        console.log('File uploaded successfully.');

        // Get download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Save the file metadata in Firestore
        const fileData = {
          fileName: asset.name,
          fileUrl: downloadURL,
          userId: auth.currentUser.uid,
          createdAt: new Date(),
        };

        await setDoc(doc(db, 'uploads', auth.currentUser.uid), fileData);
        Alert.alert("Success", "File uploaded and saved successfully.");
      } else {
        Alert.alert("File selection canceled", "Please try uploading a text (.txt) file");
      }
    } catch (err) {
      console.error("Error picking file: ", err);
      Alert.alert("Error", "An error occurred while picking the file.");
    }
  };

  const handleGenerateQuote = () => {
    if (fileUri) {
      navigation.navigate('Details Screen', { fileUri });
    } else {
      Alert.alert("No file selected", "Please upload a text (.txt) file first.");
    }
  };

  const handleViewHistory = () => {
    navigation.navigate('History Screen');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={handleBack}>
        <Icon name='arrow-back-outline' size={30} />
      </TouchableOpacity>
        
      <Text style={styles.heading}>Upload file</Text>
      <Image source={require('../../assets/upload-unscreen.gif')} style={styles.gif} />
      <View style={styles.uploadBox}>
        <Text style={styles.uploadText}>To generate an invoice upload a text (.txt) file</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
      
      {fileName && <View style={styles.doc}><Text style={styles.fileName}>File: {fileName}</Text></View>}
      
      <TouchableOpacity style={styles.generateButton} onPress={handleGenerateQuote}>
          <Text style={styles.generateButtonText}>Generate Quote</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.historyButton} onPress={handleViewHistory}>
          <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E0ECFD',
  },
  doc:{
    backgroundColor:'#84D2F6',
    marginTop: '20',
    height: 80,
    padding: 10,
    width: '90%',
    borderRadius: 5,
  },
  back: {
    top: 50,
    right: 150,
    padding: 5,
  },
  gif: {
    width: 200,
    height: 200,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadBox: {
    width: '90%',
    padding: 16,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    height: 180,
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    marginTop: 20,
  },
  fileName: {
    marginTop: 20,
    fontSize: 16,
    color: '#386FA4',
  },
  generateButton: {
    marginTop: 20,
    backgroundColor: '#0F8E35',
    padding: 15,
    borderRadius: 5,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  heading: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  
   historyButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    width: '40%',
    alignItems: "center"
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 16,},
});
