import React, {useContext} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

const SettingsScreen: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;
  const {isDarkMode, toggleTheme} = themeContext;

  return (
    <View style={styles.container}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default SettingsScreen;
