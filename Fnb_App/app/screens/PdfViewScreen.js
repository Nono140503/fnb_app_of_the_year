import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const PDFViewScreen = ({ route, navigation }) => {
  const { fileUri } = route.params;
  const [localUri, setLocalUri] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const downloadPDF = async () => {
      try {
        const { uri } = await FileSystem.downloadAsync(fileUri, `${FileSystem.documentDirectory}downloaded.pdf`);
        setLocalUri(uri);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      } finally {
        setLoading(false);
      }
    };
    downloadPDF();
  }, [fileUri]);
  const handleBack = ()=>{
    navigation.goBack();
}
  const openPDF = async () => {
    if (localUri) {
      await Sharing.shareAsync(localUri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PDF Preview</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : (
        <>
            <TouchableOpacity style={styles.button} onPress={openPDF}>
          <Text style={styles.buttonText}>Open PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBack} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        </>
        
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0ECFD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F8EF7',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonBack:{
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
  },
});

export default PDFViewScreen;
