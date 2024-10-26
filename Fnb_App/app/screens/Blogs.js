import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BlogsScreen = ({ navigation }) => {
    const [blogs, setBlogs] = useState([
        {
            id: '1',
            author: 'John Steysen',
            time: '08:39 am',
            content: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit. Fringilla Natoque Id Aenean.',
            image: require('../../assets/Financial-Literacy-for-Academic-Libraries-780-final.png'),
            likes: 1964,
            comments: 135,
            profile_pic: require('../../assets/pexels-creationhill-1681010.jpg'),
        },
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleOptionSelect = (option) => {
        closeModal();
        if (option === 'Create Post') {
            navigation.navigate('Create Post', { addBlog }); // Pass addBlog function to CreatePostScreen
        }
        // Add handling for other options if necessary
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const addBlog = (newBlog) => {
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
    };

    const renderBlogItem = ({ item }) => (
        <View style={styles.blogContainer}>
            <View style={styles.header}>
                <Image source={item.profile_pic} style={styles.profileImage} />
                <View style={styles.authorDetails}>
                    <Text style={styles.author}>{item.author}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Ionicons name="ellipsis-vertical" size={20} color="black" />
            </View>
            <Text style={styles.content}>{item.content}</Text>
            {item.image && <Image source={item.image} style={styles.blogImage} />}
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
            <FlatList
                data={blogs}
                renderItem={renderBlogItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <View style={styles.main}>
                            <Ionicons name="arrow-back-outline" size={24} onPress={handleBack} />
                            <Text style={styles.title}>Blogs</Text>
                        </View>
                        <Ionicons name="search-outline" size={24} color="black" />
                    </View>
                }
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
                        <TouchableOpacity style={styles.option} onPress={() => handleOptionSelect('Create Post')}>
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

// Styles remain unchanged
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    main: {
        flexDirection: 'row',
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
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
        height: 200,
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
