import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, SafeAreaView, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from '../../firebase';
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore"; // Ensure correct imports

const BlogsScreen = ({ navigation }) => {
    const [blogs, setBlogs] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'blogs'), async (snapshot) => {
            const blogsData = await Promise.all(
                snapshot.docs.map(async (doc) => {
                    const blog = { id: doc.id, ...doc.data() };
                    console.log('Fetched blog:', blog); // Log the fetched blog data
    
                    if (blog.userId) {
                        try {
                            const userRef = doc(db, 'users', blog.userId); // Reference to the user document
                            const userDoc = await getDoc(userRef);
                            if (userDoc.exists()) {
                                const userData = userDoc.data();
                                blog.author = userData.name || 'Unknown';
                                blog.profile_pic = userData.profileImage || 'default_avatar.png';
                            } else {
                                console.warn('No such user document:', blog.userId);
                            }
                        } catch (error) {
                            console.error("Error fetching blog author: ", error);
                        }
                    }
                    return blog;
                })
            );
            console.log('Blogs data:', blogsData); // Log the processed blogs data
            setBlogs(blogsData);
        }, (error) => {
            console.error("Error fetching blogs: ", error);
            Alert.alert('Error', 'Could not fetch blogs.');
        });
    
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const navigateToCreatePost = () => {
        navigation.navigate('Create Post');
        setIsModalVisible(false);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const renderBlogItem = ({ item }) => (
        <View style={styles.blogContainer}>
            <View style={styles.header}>
                <Image source={{ uri: item.profile_pic }} style={styles.profileImage} />
                <View style={styles.authorDetails}>
                    <Text style={styles.author}>{item.author || 'Unknown'}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Ionicons name="ellipsis-vertical" size={20} color="black" />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
            {item.image && <Image source={{ uri: item.image }} style={styles.blogImage} />}
            <View style={styles.actions}>
                <Text>{item.likes} Likes</Text>
                <Text>{item.comments} Comments</Text>
                <TouchableOpacity>
                    <Text style={styles.messageSeller}>Message Seller</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.header}>
                        <View style={styles.main}>
                            <Ionicons name="arrow-back-outline" size={24} onPress={handleBack} />
                            <Text style={styles.heading}>Blogs</Text>
                        </View>
                        <Ionicons name="search-outline" size={24} color="black" />
                    </View>
            <FlatList
                data={blogs}
                renderItem={renderBlogItem}
                keyExtractor={(item) => item.id}
                style={ {backgroundColor: '#f6f7f9'}}
                
            />
            <TouchableOpacity style={styles.addButton} onPress={openModal}>
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>

            <Modal visible={isModalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.option_select} onPress={closeModal}>
                            <Text style={styles.optionText_select}>Select an option</Text>
                            <Ionicons name="close-outline" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={navigateToCreatePost}>
                            <Text style={styles.optionText}>Create a Post</Text>
                            <Ionicons name="create-outline" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => handleOptionSelect('Sell Product')}>
                            <Text style={styles.optionText}>Sell Product & Services</Text>
                            <Ionicons name="pricetag-outline" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={() => handleOptionSelect('Create Event')}>
                            <Text style={styles.optionText}>Create an Event</Text>
                            <Ionicons name="calendar-outline" size={24} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    heading:{
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    main: {
        flexDirection: 'row',
        padding: 10,
        
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        
    },
    options: {
        backgroundColor: 'white',
        width: '100%',
        paddingBottom: 20,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#007AFF',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blogContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
    },
    authorDetails: {
        marginRight: 35,
    },
    author: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 12,
        color: 'gray',
    },
    content: {
        marginVertical: 10,
    },
    blogImage: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    messageSeller: {
        color: 'blue',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        width: '100%',
        justifyContent: 'space-between',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 0.5,
    },
    option_select: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1d61e7',
        padding: 15,
        width: '100%',
        justifyContent: 'space-between',
    },
    optionText: {
        marginLeft: 10,
        fontSize: 16,
    },
    optionText_select: {
        marginLeft: 10,
        fontSize: 16,
        color: 'white',
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    closeButtonText: {
        color: 'red',
    },
});

export default BlogsScreen;
