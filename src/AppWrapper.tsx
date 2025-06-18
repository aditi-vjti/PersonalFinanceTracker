import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';  // Example authentication context
import { TransactionProvider } from './context/TransactionContext'; // Example transaction context
import { StatusBar } from 'react-native';
//import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './navigation/TabNavigator'; // Your main tab navigator

// Define the type for children components
interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      {/* Wrap the app with providers */}
      <AuthProvider>
        <TransactionProvider>
          {children}
        </TransactionProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default AppWrapper;
