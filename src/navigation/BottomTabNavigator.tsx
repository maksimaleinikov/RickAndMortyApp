import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import CharacterScreen from '../screens/CharacterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CharacterDetailsScreen from '../screens/CharactersDetailsScreen';
import {
  BottomTabNavigatorRoutes,
  CharacterNavigatorRoutes,
  BottomTabParamList,
  CharacterStackParamList,
} from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<CharacterStackParamList>();

const CharacterStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={CharacterNavigatorRoutes.Characters}
        component={CharacterScreen}
      />
      <Stack.Screen
        name={CharacterNavigatorRoutes.Details}
        component={CharacterDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={BottomTabNavigatorRoutes.Characters}
        component={CharacterStack}
      />
      <Tab.Screen
        name={BottomTabNavigatorRoutes.Settings}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
