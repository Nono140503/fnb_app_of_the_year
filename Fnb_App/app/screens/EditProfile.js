import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { db, storage } from '../../firebase'; // Adjust the import based on your file structure
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../../firebase'; // Import auth to get current user

const EditProfileScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const email = auth.currentUser?.email; // Get the logged-in user's email
    const [phone, setPhone] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (email) { // Ensure email is available
                const docRef = doc(db, 'users', email);
                const userDoc = await getDoc(docRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setName(userData.name || '');
                    setPhone(userData.phone || '');
                    setProfileImage(userData.profileImage || null);
                } else {
                    Alert.alert('Error', 'User profile does not exist.');
                }
            } else {
                Alert.alert('Error', 'No user is logged in.');
            }
        };

        fetchUserProfile();
    }, [email]);

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSaveChanges = async () => {
        let imageUrl = '';

        // If there's a profile image selected, upload it to Firebase Storage
        if (profileImage) {
            const response = await fetch(profileImage);
            const blob = await response.blob();
            const storageRef = ref(storage, `profileImages/${email}/profile.jpg`); // Create a storage reference
            
            try {
                // Upload the image to Firebase Storage
                await uploadBytes(storageRef, blob);
                // Get the download URL of the uploaded image
                imageUrl = await getDownloadURL(storageRef);

            } catch (error) {
                Alert.alert('Error', 'Failed to upload image: ' + error.message);
                return; // Exit if image upload fails
            }
        }

        // Update Firestore document with user's information
        try {
            await setDoc(doc(db, 'users', email), {
                name,
                email, // Use the email from the signup
                phone,
                profileImage: imageUrl || null, // Set imageUrl if image was uploaded
            });
            Alert.alert('Success', 'Profile updated successfully');
            navigation.navigate('Home Screen');
            
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.profileImage} 
                    source={{ uri: profileImage ? profileImage : require('../../assets/default_avatar.png') }} 
                />
                <TouchableOpacity style={styles.editIcon} onPress={handleImagePicker}>
                    <Text style={styles.editIconText}>Select Image</Text>
                    <Icon name='create-outline' size={20} color={'#1d61e7'}/>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Fullname"
            />
            <TextInput
                style={styles.input}
                value={email}
                placeholder="Email"
                editable={false} // Make email non-editable
            />
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                keyboardType="phone-pad"
            />
            <Button
                title="Save Changes"
                color="#1E90FF"
                onPress={handleSaveChanges}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: 10,
    },
    editIcon: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 10,
    },
    editIconText: {
        color: '#1d61e7',
        fontSize: 16,
        paddingRight: 5,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        fontSize: 16,
        marginVertical: 10,
        padding: 10,
    },
    title: {
        textAlign: "center",
        marginTop: 30,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1d61e7',
    },
});

export default EditProfileScreen;
