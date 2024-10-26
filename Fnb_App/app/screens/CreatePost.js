import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CreatePostScreen = ({ navigation, route }) => {
    const { addBlog } = route.params; // Get addBlog function from route params
    const [content, setContent] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [permissionGranted, setPermissionGranted] = useState(false);


    const requestImagePickerPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
                setPermissionGranted(true);
            } else {
                Alert.alert('Permission Denied', 'Allow access to gallery.');
            }
        }
    };

    const OpenGallery = async () => {
        await requestImagePickerPermissions();

        if (permissionGranted) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
    
                setImageUri(result.assets[0].uri);
            } else {
                console.log('Image picker result:', result);
            }
        }
    };

    const handleCreatePost = () => {
        const newBlog = {
            id: Math.random().toString(), // Unique ID for the blog post
            author: 'New Author', // Replace with dynamic author if needed
            time: 'Now', // Replace with dynamic time if needed
            content,
            image: imageUri ? { uri: imageUri } : null, // Only set image if picked
            likes: 0,
            comments: 0,
        };
        addBlog(newBlog); // Call the addBlog function to update the BlogsScreen
        navigation.goBack(); // Navigate back to the BlogsScreen
    };

    const handleBack = () => {
        navigation.goBack(); // Go back to the previous screen
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.main}>
                    <Ionicons name="arrow-back-outline" size={24} onPress={handleBack} />
                    <Text style={styles.title}>Create a post</Text>
                </View>
            </View>
            <TextInput
                style={styles.input}
                placeholder="What's on your mind?"
                value={content}
                onChangeText={setContent} // Update content state on text change
            />
            {/* Display the selected image */}
            <Image 
                source={imageUri ? { uri: imageUri } : require('../../assets/pngtree-vector-new-post-neon-sign-effect-png-image_3605555-removebg-preview.png')} 
                style={styles.image} 
            />
            <TouchableOpacity style={styles.imageButton} onPress={OpenGallery}>
                <Text style={styles.imageButtonText}>Pick an Image</Text>
            </TouchableOpacity>
            <Button title="Post" onPress={handleCreatePost} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20 
    },
    main: {
        flexDirection: 'row',
    },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 10,
        marginTop: 10,
    },
    input: { 
        height: 100, 
        borderColor: 'gray',
        borderWidth: 1, 
        marginBottom: 20, 
        padding: 10 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold',
        marginLeft: 20, 
    },
    image: { 
        width: '100%', 
        height: 250, 
        marginBottom: 20 
    },
    imageButton: { 
        padding: 10, 
        backgroundColor: '#007AFF', 
        marginBottom: 20, 
        alignItems: 'center' 
    },
    imageButtonText: { 
        color: 'white' 
    },
});

export default CreatePostScreen;
