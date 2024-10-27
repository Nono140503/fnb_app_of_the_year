import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function DetailsScreen({ route }) {
  const { fileUri } = route.params;
  const [fileContent, setFileContent] = useState(null);
  const [subtotal, setSubtotal] = useState(0); 
  const [tax, setTax] = useState(0); 
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const readFileContent = async () => {
      try {
        const content = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        setFileContent(content);
        
        // Extract numbers and calculate subtotal
        calculateSubtotal(content);
      } catch (err) {
        console.error("Error reading file: ", err);
        Alert.alert("Error", "Unable to read the file content.");
      }
    };

    if (fileUri) {
      readFileContent();
    }
  }, [fileUri]);

  const calculateSubtotal = (content) => {
    const lines = content.split('\n'); // Split content into lines
    let subtotalValue = 0; // Initialize subtotal value

    let quantity = 0; // Variable to hold quantity
    let price = 0; // Variable to hold price

    lines.forEach(line => {
      // Match Quantity line
      const quantityMatch = line.match(/Quantity:\s*(\d+)/);
      if (quantityMatch) {
        quantity = parseInt(quantityMatch[1], 10); // Extract quantity
      }

      // Match Price line
      const priceMatch = line.match(/Price per Unit:\s*R(\d+(\.\d{1,2})?)/);
      if (priceMatch) {
        price = parseFloat(priceMatch[1]); // Extract price
      }

      // If both quantity and price have been found, calculate the subtotal for that product
      if (quantity && price) {
        subtotalValue += price * quantity; // Update subtotal
        quantity = 0; // Reset quantity for the next product
        price = 0; // Reset price for the next product
      }
    });

    setSubtotal(subtotalValue); // Update subtotal state
    
    const taxValue = subtotalValue * 0.15; // Calculate 15% tax
    setTax(taxValue); // Update tax state

    const totalValue = subtotalValue + taxValue; // Calculate total
    setTotal(totalValue); // Update total state
  };

  // Function to render the content with styling
  const renderContent = (content) => {
    const products = content.split(/Product: /).filter(Boolean); // Split into products
    return products.map((product, index) => {
      const lines = product.split('\n'); // Split each product into lines
      return (
        <View key={index} style={styles.productContainer}>
          <Text style={styles.productTitle}>{lines[0].trim()}</Text>
          {lines.slice(1).map((line, lineIndex) => (
            <Text key={lineIndex} style={styles.productText}>{line.trim()}</Text>
          ))}
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item(s)</Text>
      <View style={styles.items}>
        <View style={styles.items_cont}>
            <View style={styles.cont}>
            {fileContent ? renderContent(fileContent) : <Text>Loading...</Text>}
        </View>
        
          <View style={styles.subtotal}>
          <View style={styles.subtotal_items}>
            <Text style={styles.subtotalText}>Subtotal: </Text>
            <Text style={styles.subtotalText}>R{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.subtotal_items}>
            <Text style={styles.subtotalText}>Tax (15%): </Text>
            <Text style={styles.subtotalText}>R{tax.toFixed(2)}</Text>
          </View>
          <View style={styles.subtotal_items}>
            <Text style={styles.subtotalText}>Total: </Text>
            <Text style={styles.subtotalText}>R{total.toFixed(2)}</Text>
          </View>
        </View>
        </View>
        <TouchableOpacity></TouchableOpacity>
     
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0ECFD',
  },
  productContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderBottomWidth: 2,  // Set the width of the bottom border
    borderBottomColor: 'white',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productText: {
    fontSize: 16,
    color: '#333',
  },
  subtotal_items: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtotal: {
    backgroundColor: 'white',
    height: 100,
    padding: 10,
  },
  subtotalText: {
    fontSize: 20,
    color: 'grey',
  },
  items: {
    backgroundColor: 'rgba(255, 255, 255,0.6)',
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: 5,
    marginTop: 10,
  },
  cont:{
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
});
