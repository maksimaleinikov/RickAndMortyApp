import React, {useContext} from 'react';
import {StatusBar, ViewStyle} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import {ThemeProvider, ThemeContext} from './src/context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
};

const MainApp: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const {isDarkMode} = themeContext;

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
