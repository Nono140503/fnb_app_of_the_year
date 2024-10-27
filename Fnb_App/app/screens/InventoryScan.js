import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

function InventoryScan({ navigation }) {
    const [videoUploaded, setVideoUploaded] = useState(false);
    const [videoUri, setVideoUri] = useState(null); 
    const [permissionGranted, setPermissionGranted] = useState(false); 

    useEffect(() => {
        requestImagePickerPermissions();
    }, []);

    const requestImagePickerPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'We need access to your gallery to upload videos.');
            } else {
                setPermissionGranted(true);
            }
        }
    };

    const handleUpload = async () => {
        if (!permissionGranted) {
            Alert.alert('Error', 'Please allow gallery access to upload videos.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            setVideoUri(uri);
            setVideoUploaded(true);
            Alert.alert('Video Uploaded', 'Your video has been uploaded successfully.');
        } else {
            console.log('Video picker result:', result);
        }
    };

    const handleGenerateStock = () => {
        if (videoUri) {
            Alert.alert('Generating Stock Report', 'Stock-taking process initiated.');
        } else {
            Alert.alert('Error', 'Please upload a video first.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Arrow Section */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home Screen')}>
                <Ionicons name="arrow-back" size={30} color="#000" />
                <Text style={styles.headerTitle}>Inventory Scan</Text>
            </TouchableOpacity>

            {/* Instructions Card Section */}
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.cardTitle}>Uploading Video Instructions</Text>
                    <Text style={styles.cardText}>
                        1. Ensure the video captures the entire inventory area.{"\n"}
                        2. Take a steady video covering all shelves and stock points.{"\n"}
                        3. After recording, upload the video from your gallery and click "Generate Stock" to proceed.
                    </Text>
                </Card.Content>
            </Card>

            {/* Upload and Generate Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                    <Text style={styles.buttonText}>Upload Video</Text>
                </TouchableOpacity>

                {videoUploaded && (
                    <TouchableOpacity style={styles.generateButton} onPress={handleGenerateStock}>
                        <Text style={styles.buttonText}>Generate Stock Report</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    card: {
        width: '100%',
        marginBottom: 20,
        padding: 10,
        elevation: 4,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        lineHeight: 24,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 'auto', 
        marginBottom: 30,
    },
    uploadButton: {
        backgroundColor: '#1d61e7',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginBottom: 10,
    },
    generateButton: {
        backgroundColor: '#4caf50',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default InventoryScan;
