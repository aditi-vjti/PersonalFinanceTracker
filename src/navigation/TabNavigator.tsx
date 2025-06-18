import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Importing screens
import Dashboard from '../screens/Dashboard/Dashboard';
import Transactions from '../screens/Transactions/Transactions';
import Reports from '../screens/Reports/Reports';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: string = ''; // default to an empty string

            if (route.name === 'Dashboard') {
              iconName = 'dashboard';
            } else if (route.name === 'Transactions') {
              iconName = 'receipt';
            } else if (route.name === 'Reports') {
              iconName = 'bar-chart';
            } else {
              iconName = 'home'; // default icon if no match
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: '#777',
          tabBarStyle: {
            backgroundColor: '#f8f9fa',
            borderTopWidth: 0,
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Transactions" component={Transactions} />
        <Tab.Screen name="Reports" component={Reports} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default TabNavigator;