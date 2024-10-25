import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
  const NextButton = ({ ...props }) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  );

  const SkipButton = ({ ...props }) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>Skip</Text>
    </TouchableOpacity>
  );

  const DoneButton = ({ ...props }) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>Done</Text>
    </TouchableOpacity>
  );

  // Custom Dot Component
  const DotComponent = ({ selected }) => {
    return (
      <View
        style={[
          styles.dot,
          { backgroundColor: selected ? '#007AFF' : '#D9D9D9' }, // Change colors here
        ]}
      />
    );
  };

  const pages = [
    {
      backgroundColor: 'white',
      image: <Image source={require('../../assets/rafiki.png')} style={styles.image} />,
      title: 'Explore Finance Easily',
      subtitle: 'To your desire',
    },
    {
      backgroundColor: 'white',
      image: <Image source={require('../../assets/rafiki.png')} style={styles.image} />,
      title: 'Stay Connected',
      subtitle: 'Connect and share with people around you.',
    },
    {
      backgroundColor: 'white',
      image: <Image source={require('../../assets/rafiki.png')} style={styles.image} />,
      title: 'Achieve More',
      subtitle: 'Track and achieve your goals effortlessly.',
    },
  ];

  return (
    <View style={styles.container}>
      <Onboarding
        NextButtonComponent={NextButton}
        SkipButtonComponent={SkipButton}
        DoneButtonComponent={DoneButton}
        DotComponent={DotComponent} // Use the custom dot component
        onSkip={() => navigation.replace('Login')}
        onDone={() => navigation.replace('Login')}
        pages={pages.map((page, index) => ({
          ...page,
          title: <Text style={[styles.title, { marginTop: 40 + index * 20 }]}>{page.title}</Text>,
          subtitle: <Text style={[styles.subtitle, { marginTop: 10 }]}>{page.subtitle}</Text>,
        }))}
        containerStyles={styles.onboardingContainer} // Style the Onboarding container
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white'
  },
  image: {
    width: 351,
    height: 291,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    
  },
  buttonText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 40,
    width: '100%',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginLeft: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  onboardingContainer: {
    backgroundColor: 'white', 
  },
});

export default OnboardingScreen;
