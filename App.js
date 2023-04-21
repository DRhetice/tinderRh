import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './hooks/useAuth';
import StackNavigation from './StackNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigation/>
      </AuthProvider>

    </NavigationContainer>
   
  );
}

