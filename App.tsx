import React from 'react';
import {StatusBar, useColorScheme, ViewStyle} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: ViewStyle = {
    backgroundColor: isDarkMode ? '#1c1c1c' : '#fff',
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
