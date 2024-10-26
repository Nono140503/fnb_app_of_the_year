import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './app/screens/OnboardingScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen'
import OTPVerificationScreen from './app/screens/OTPVerificationScreen';
import EducationModule from './app/screens/EducationModule';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Onboarding Screen'>
        <Stack.Screen name="Onboarding Screen" component={OnboardingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="EducationModule" component={EducationModule} />



        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
