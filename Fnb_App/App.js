import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './app/screens/OnboardingScreen';
import LoginScreen from './app/screens/LoginScreen';
import ForgotPasswordScreen from './app/screens/ForgotPassword';
import HomeScreen from './app/screens/HomeScreen';
import BlogsScreen from './app/screens/Blogs';
import CreatePost from './app/screens/CreatePost';
import InventoryScan from './app/screens/InventoryScan';
import FinancialEssentials  from './app/screens/FinancialEssentials';
import { AuthProvider } from './Global/AuthContext';
import EditProfileScreen from './app/screens/EditProfile';
import Settings from './app/screens/Settings';
import UploadScreen from './app/screens/UploadScreen';
import DetailsScreen from './app/screens/DetailsScreen';
import MarketPlaceScreen from './app/screens/MarketPlace';
import CreateMarketPlacePostScreen from './app/screens/CreateMaketPlacePost';
import HistoryScreen from './app/screens/HistoryScreen';
import PDFViewScreen from './app/screens/PdfViewScreen';

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
        <Stack.Screen name="Inventory Scan" component={InventoryScan} options={{headerShown:false}} />
        <Stack.Screen name="Financial Essentials" component={FinancialEssentials} options={{headerShown: false}}/>
        <Stack.Screen name='Settings' component={Settings} options={{headerShown: false}}/>
        <Stack.Screen name='Edit Profile' component={EditProfileScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Upload File' component={UploadScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Details Screen' component={DetailsScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Market Place' component={MarketPlaceScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Create Marketplace Post' component={CreateMarketPlacePostScreen} options={{headerShown: false}}/>
        <Stack.Screen name='History Screen' component={HistoryScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Pdf View Screen' component={PDFViewScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
    
  );
}
