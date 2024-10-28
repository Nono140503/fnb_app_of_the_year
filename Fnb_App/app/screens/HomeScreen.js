import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, Modal, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomTabBar from '../../components/BottomTabBar';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation, route }) => {
    const [currentScreen, setCurrentScreen] = useState('Home Screen');
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const handleNavigation = (screen) => {
        setCurrentScreen(screen);
        navigation.navigate(screen);
    };
    const onScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const renderDots = () => (
        <View style={styles.dotsContainer}>
            {slideshowItems.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        currentSlideIndex === index ? styles.activeDot : styles.inactiveDot,
                    ]}
                />
            ))}
        </View>
    );
    const slideshowItems = [
        { id: '1', image: require('../../assets/slide_1.jpeg') },
        { id: '2', image: require('../../assets/slide_2.jpeg') },
        { id: '3', image: require('../../assets/banner.jpg') },
    ];

    const blogs = [
        { id: '1', image: require('../../assets/Financial-Literacy-for-Academic-Libraries-780-final.png'), title: 'Financial Literacy for the Modern Entrepreneur' },
        { id: '2', image: require('../../assets/P2P.jpg'), title: 'How to Use Peer-to-Peer Lending for Income' },
    ];

    const discounts = [
        { id: '1', title: 'Plan and grow your business', discount: 'Get 25%', colour: '#E1F0C4' },
        { id: '2', title: 'Discount 2', discount: 'Get 25%', colour: '#FFE2D1' },
        { id: '3', title: 'Discount 3', discount: 'Get 25%', colour: '#6184D8' },
        { id: '4', title: 'Discount 4', discount: 'Get 25%', colour: '#AA7DCE' },
    ];

    const exploreItems = [
        { id: '1', image: require('../../assets/marketplace.png'), label: 'Market Place',nav: 'Market Place' },
        { id: '2', image: require('../../assets/compliance.png'), label: 'Compliance Essentials',nav: 'Marketplace' },
        { id: '3', image: require('../../assets/Finance.png'), label: 'Financial Essentials',nav: 'Financial Essentials' },
        { id: '4', image: require('../../assets/financial-literacy.png'), label: 'Business Library',nav: 'Marketplace' },
    ];

    const renderSlideshowItem = ({ item }) => (
        <Image source={item.image} style={styles.slideshowImage} />
    );

    const blog = () => {
        navigation.navigate('Blogs Screen');
    };

    // Function to close modal
    const handleNav = (navTarget) => {
        navigation.navigate(navTarget);
    };
    
   
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="search-outline" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.slideshowContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {slideshowItems.map((item) => (
                                <Image
                                    key={item.id}
                                    source={item.image}
                                    style={styles.slideshowImage}
                                    resizeMode="contain" // Ensures the image fits within the container
                                />
                            ))}
                        </ScrollView>
                        
                    </View>
                    {renderDots()}
                    <View style={styles.sectionContainer}>
                        <View style={styles.headingWrapper}>
                            <View style={styles.headingLeft}>
                                <View style={styles.verticalLine} />
                                <Text style={styles.headingText}>Explore</Text>
                            </View>
                            <TouchableOpacity style={styles.viewAllButton}>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.exploreContainer}>
                            {exploreItems.map((item) => (
                                <View key={item.id} style={styles.imageWrapper}>
                                    <TouchableOpacity onPress={() => handleNav(item.nav)}>
                                            <Image source={item.image} style={styles.exploreImage} />
                                    </TouchableOpacity>
                                    <Text style={styles.circleLabel}>{item.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Blogs Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.headingWrapper}>
                            <View style={styles.headingLeft}>
                                <View style={styles.verticalLine} />
                                <Text style={styles.headingText}>Blogs</Text>
                            </View>
                            <TouchableOpacity style={styles.viewAllButton} onPress={blog}>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={blogs}
                            renderItem={({ item }) => (
                                <View style={styles.blogContainer}>
                                    <Image source={item.image} style={styles.blogImage} />
                                    <Text style={styles.blogTitle}>{item.title}</Text>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.blogsContainer}
                        />
                    </View>

                    {/* Deals Section */}
                    <View style={styles.sectionContainer}>
                        <View style={styles.headingWrapper}>
                            <View style={styles.headingLeft}>
                                <View style={styles.verticalLine} />
                                <Text style={styles.headingText}>Deals</Text>
                            </View>
                            <TouchableOpacity style={styles.viewAllButton}>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={discounts}
                            renderItem={({ item }) => (
                                <View style={[styles.discountCard, { backgroundColor: item.colour }]} >
                                    <Text style={styles.discountText}>{item.title}</Text>
                                    <Text style={styles.discount}>{item.discount}</Text>
                                    <TouchableOpacity style={styles.grabOffer}>
                                        <Text>Grab Offer</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.discountsContainer}
                        />
                    </View>
                </ScrollView>

                
               
            </SafeAreaView>
            <BottomTabBar
                navigation={navigation}
                currentScreen={currentScreen}
                onNavigate={handleNavigation}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    grabOffer: {
        backgroundColor: '#fff',
        padding: 10,
        width: 100,
        marginTop: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    slideshowContainer: {
        height: 160, // Adjust height as needed
        marginBottom: 15,
        backgroundColor: '#166FF5'
    },
    slideshowImage: {
        width: width, // Each image takes full width of the screen
        height: '100%',
    },
    contentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 50, 
        backgroundColor: '#f6f7f9',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    discountText: {
        marginTop: 10,
    },
    headingWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    discount: {
        fontSize: 30,
        marginTop: 20,
    },
    
    headingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    verticalLine: {
        width: 3,
        height: 20,
        backgroundColor: '#007AFF',
    },
    viewAllButton: {
        paddingVertical: 5,
    },
    viewAllText: {
        color: '#007AFF',
    },
    exploreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
        flexWrap: 'wrap',
    },
    imageWrapper: {
        alignItems: 'center',
        marginBottom: 5,
        width: '23%',
    },
    exploreImage: {
        width: 80,
        height: 80,
        borderRadius: 50, 
    },
    circleLabel: {
        textAlign: 'center',
        marginTop: 8,
    },
    blogsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    blogContainer: {
        width: 170,
        backgroundColor: '#fff',
        marginRight: 15,
        paddingBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    blogImage: {
        width: '100%',
        height: 100,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        resizeMode: 'cover',
    },
    blogTitle: {
        padding: 10,
        fontSize: 14,
    },
    discountsContainer: {
        flexDirection: 'row',
    },
    discountCard: {
        width: 230,
        height: 150,
        padding: 5,
        marginRight: 10,
        borderRadius: 5,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, 
    },

    welcome:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
        marginTop: 5,
        color: '#1d61e7',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: 'white', // Active dot color
    },
    inactiveDot: {
        backgroundColor: '#C0C0C0', // Inactive dot color
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 30,
    },
    
});

export default HomeScreen;
