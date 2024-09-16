import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import CharacterScreen from '../screens/CharacterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CharacterDetailsScreen from '../screens/CharactersDetailsScreen';
import {TouchableOpacity, Text, Image} from 'react-native';
import {
  BottomTabNavigatorRoutes,
  CharacterNavigatorRoutes,
  BottomTabParamList,
  CharacterStackParamList,
} from './types';
import Icons from '../assets/icons';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<CharacterStackParamList>();

const CharacterStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={CharacterNavigatorRoutes.Characters}
        component={CharacterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={CharacterNavigatorRoutes.Details}
        component={CharacterDetailsScreen}
        options={({route, navigation}) => {
          const character = route.params?.character;
          return {
            title: character ? character.name : 'Character Details',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={Icons.LeftArrowIcon}
                  style={{
                    width: 32,
                    height: 32,
                    paddingLeft: 10,
                  }}
                />
              </TouchableOpacity>
            ),
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#f8f9fa',
            },
          };
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={BottomTabNavigatorRoutes.Characters}
        component={CharacterStack}
        options={{
          title: 'Characters',
          tabBarIcon: ({color, size}) => (
            <Image
              source={Icons.CharactersIcon}
              style={{
                width: size,
                height: size,
                tintColor: color,
                paddingBottom: 10,
                paddingTop: 10,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name={BottomTabNavigatorRoutes.Settings}
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({color, size}) => (
            <Image
              source={Icons.SettingsIcon}
              style={{
                width: size,
                height: size,
                tintColor: color,
                paddingBottom: 10,
                paddingTop: 10,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
