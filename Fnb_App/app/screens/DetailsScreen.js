import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing'; // Import Sharing module
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { auth } from '../../firebase'; 

export default function DetailsScreen({ route }) {
  const { fileUri } = route.params;
  const [fileContent, setFileContent] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const handleBack = () =>{
    navigation.goBack();
}
  useEffect(() => {
    const readFileContent = async () => {
      try {
        const content = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        setFileContent(content);
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
    const lines = content.split('\n');
    let subtotalValue = 0;

    // Extract customer name
    const customerNameMatch = lines[0].match(/Customer Name:\s*(.*)/);
    if (customerNameMatch) {
      setCustomerName(customerNameMatch[1].trim());
    }

    let quantity = 0;
    let price = 0;

    lines.forEach(line => {
      const quantityMatch = line.match(/Quantity:\s*(\d+)/);
      if (quantityMatch) {
        quantity = parseInt(quantityMatch[1], 10);
      }

      const priceMatch = line.match(/Price per Unit:\s*R(\d+(\.\d{1,2})?)/);
      if (priceMatch) {
        price = parseFloat(priceMatch[1]);
      }

      if (quantity && price) {
        subtotalValue += price * quantity;
        quantity = 0;
        price = 0;
      }
    });

    setSubtotal(subtotalValue);
    const taxValue = subtotalValue * 0.15;
    setTax(taxValue);
    const totalValue = subtotalValue + taxValue;
    setTotal(totalValue);
  };

  const renderContent = (content) => {
    const products = content.split(/Product: /).filter(Boolean);
    return products.map((product, index) => {
      const lines = product.split('\n').filter(line => line.trim() !== '');
      return (
        <View key={index} style={styles.productContainer}>
          <Text style={styles.productTitle}>{lines[0].trim()}</Text>
          {lines.slice(1).map((line, lineIndex) => {
            // Only render lines that do not include 'Customer Name:'
            if (line.startsWith("Customer Name:")) {
              return null; // Skip customer name
            }
            return (
              <Text key={lineIndex} style={styles.productText}>{line.trim()}</Text>
            );
          })}
        </View>
      );
    });
  };

  const createPDF = async () => {
    const lines = fileContent.split('\n');
    const items = [];
    let currentProduct = null;
  
    lines.forEach(line => {
      if (line.startsWith("Product:")) {
        if (currentProduct) {
          items.push(currentProduct);
        }
        currentProduct = { name: line.split("Product: ")[1].trim(), quantity: 0, price: 0 };
      }
  
      const quantityMatch = line.match(/Quantity:\s*(\d+)/);
      if (quantityMatch && currentProduct) {
        currentProduct.quantity = parseInt(quantityMatch[1], 10);
      }
  
      const priceMatch = line.match(/Price per Unit:\s*R(\d+(\.\d{1,2})?)/);
      if (priceMatch && currentProduct) {
        currentProduct.price = parseFloat(priceMatch[1]);
      }
    });
  
    if (currentProduct) {
      items.push(currentProduct);
    }
  
    const invoiceHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                color: #333;
            }
            h1 {
                color: #1d61e7;
                text-align: center;
            }
            h2 {
                border-bottom: 2px solid #1d61e7;
                padding-bottom: 10px;
            }
            .invoice-section {
                margin-bottom: 20px;
            }
            .item-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .item-table th, .item-table td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            .item-table th {
                background-color: #1d61e7;
                color: white;
            }
            .totals {
                font-size: 18px;
                font-weight: bold;
                text-align: right;
            }
        </style>
    </head>
    <body>
        <h1>Invoice</h1>
        <div>
            <p><strong>Invoice Number:</strong> INV-${Date.now()}</p>
            <p><strong>Customer Name:</strong> ${customerName}</p>
        </div>
        <div class="invoice-section">
            <h2>Items</h2>
            <table class="item-table">
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
                ${items.map(item => `
                  <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>R${item.price.toFixed(2)}</td>
                  </tr>
                `).join('')}
            </table>
        </div>
        <div class="totals">
            <p>Subtotal: R${subtotal.toFixed(2)}</p>
            <p>Tax (15%): R${tax.toFixed(2)}</p>
            <p>Total: R${total.toFixed(2)}</p>
        </div>
    </body>
    </html>
    `;
  
   
    try {
      const { uri } = await Print.printToFileAsync({ html: invoiceHTML });
      const uniqueFileName = `invoice_${Date.now()}.pdf`;
      const fileUri = `${FileSystem.documentDirectory}${uniqueFileName}`;
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });

      const userId = auth.currentUser?.uid; // Get the logged-in user ID
      if (!userId) {
        Alert.alert('Error', 'User not logged in.');
        return;
      }
      
      const storage = getStorage();
      const pdfRef = ref(storage, `invoices/${userId}/${uniqueFileName}`); // Save to user-specific folder
      const pdfBlob = await (await fetch(fileUri)).blob();

      await uploadBytes(pdfRef, pdfBlob, { contentType: 'application/pdf' });

      Alert.alert('PDF Generated and Uploaded', `PDF saved at: ${fileUri}`);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create and upload PDF.');
    }
  };
  
  const filteredFileContent = fileContent ? fileContent.split('\n').filter(line => !line.startsWith("Customer Name:")).join('\n') : '';
  return (
    <View style={styles.container}>
      <View style={styles.header}>
                    <Ionicons name='arrow-back-outline' size={30} onPress={handleBack}/>
                    <Text style={styles.head}>Item(s)</Text>
                </View>
      
      <Text style={styles.name}>Customer Name: {customerName}</Text> 
      <View style={styles.items}>
        <View style={styles.cont}>
        {filteredFileContent ? renderContent(filteredFileContent) : <Text>Loading...</Text>}
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
      <TouchableOpacity onPress={createPDF} style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download Invoice</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0ECFD',
  },
  name:{
    fontSize: 18,
  },
  productContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderBottomWidth: 2,
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
  header: {
    flexDirection: 'row',
    top: 30,
},
head: {
    fontSize: 22,
    marginLeft: 50,
    fontWeight: 'bold',
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
  cont: {
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  downloadButton: {
    backgroundColor: '#1d61e7',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
