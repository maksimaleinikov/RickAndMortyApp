import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CharactersScreen from '../screens/CharacterScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Characters" component={CharactersScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
