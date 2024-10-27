import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet, TouchableOpacity, Text, Alert, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db, auth } from '../../firebase';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';

const CreatePostScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setCurrentUser({
                        name: userData.name || 'Unknown',
                        profileImage: userData.profileImage || 'default_avatar.png',
                        userId: user.uid,
                    });
                }
            }
        };

        fetchCurrentUser();
    }, []);

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

    const openGallery = async () => {
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

    const handleCreatePost = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Title and Content Required', 'Please enter a title and some content for your post.');
            return;
        }

        if (!currentUser) {
            Alert.alert('Error', 'User not found.');
            return;
        }

        const newBlog = {
            title,
            content,
            author: currentUser.name,
            userId: currentUser.userId,
            profileImage: currentUser.profileImage,
            time: new Date().toLocaleString(),
            image: imageUri || null,
            likes: 0,
            comments: 0,
        };
        
        try {
            await addDoc(collection(db, 'blogs'), newBlog);
            navigation.goBack();
        } catch (error) {
            console.error("Error adding post: ", error);
            Alert.alert('Error', 'Could not save post.');
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="arrow-back-outline" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Create a Post</Text>
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="What's on your mind?"
                        value={content}
                        onChangeText={setContent}
                        multiline
                        numberOfLines={4}
                    />
                    <Image 
                        source={imageUri ? { uri: imageUri } : require('../../assets/pngtree-vector-new-post-neon-sign-effect-png-image_3605555-removebg-preview.png')} 
                        style={styles.image} 
                    />
                    <TouchableOpacity style={styles.imageButton} onPress={openGallery}>
                        <Text style={styles.imageButtonText}>Pick an Image</Text>
                    </TouchableOpacity>
                    <Button title="Post" onPress={handleCreatePost} />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({

    container: { 
        flex: 1, 
        padding: 20,
        backgroundColor: '#fff',
    },
    header: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 20,
        marginTop: 15,
    },
    input: { 
        
        borderColor: 'gray',
        borderWidth: 1, 
        marginBottom: 20, 
        padding: 15 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold',
        marginLeft: 40, 
    },
    image: { 
        width: '100%', 
        height: 250, 
        marginBottom: 20, 
        borderRadius: 10,
    },
    imageButton: { 
        padding: 10, 
        backgroundColor: '#007AFF', 
        marginBottom: 20, 
        alignItems: 'center', 
        borderRadius: 5,
    },
    imageButtonText: { 
        color: 'white' 
    },
});

export default CreatePostScreen;
