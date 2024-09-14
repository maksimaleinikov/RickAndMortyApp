import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CharactersScreen from '../screens/CharacterScreen';
import CharacterDetailsScreen from '../screens/CharactersDetailsScreen';
import {Character} from 'rickmortyapi';

export type RootStackParamList = {
  Characters: undefined;
  CharacterDetails: {character: Character};
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Characters">
        <Stack.Screen name="Characters" component={CharactersScreen} />
        <Stack.Screen
          name="CharacterDetails"
          component={CharacterDetailsScreen}
          options={({route}) => ({title: route.params.character.name})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
