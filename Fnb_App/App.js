import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './app/screens/OnboardingScreen';
import LoginScreen from './app/screens/LoginScreen';
import ForgotPasswordScreen from './app/screens/ForgotPassword';
import HomeScreen from './app/screens/HomeScreen';
import BlogsScreen from './app/screens/Blogs';
import CreatePost from './app/screens/CreatePost';
import { AuthProvider } from './Global/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
          <NavigationContainer>
      <Stack.Navigator initialRouteName='Onboarding Screen'>
        <Stack.Screen name="Onboarding Screen" component={OnboardingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Blogs Screen" component={BlogsScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Create Post' component={CreatePost} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
    
  );
}
