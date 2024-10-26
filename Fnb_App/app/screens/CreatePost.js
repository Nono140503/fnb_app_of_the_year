import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CreatePostScreen = ({ navigation, route }) => {
    const { addBlog } = route.params; // Get addBlog function from route params
    const [content, setContent] = useState('');
    const [imageUri, setImageUri] = useState(null);

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.cancelled) {
            setImageUri(result.uri); // Set the image URI if not cancelled
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
            {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.image} />
            )}
            <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
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
        height: 200, 
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
