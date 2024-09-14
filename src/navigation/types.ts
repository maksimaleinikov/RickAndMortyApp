import {Character} from 'rickmortyapi';

export enum BottomTabNavigatorRoutes {
  Characters = 'CharacterNavigator',
  Settings = 'SettingsScreen',
}

export enum CharacterNavigatorRoutes {
  Characters = 'CharacterScreen',
  Details = 'CharactersDetailsScreen',
}

export type CharacterStackParamList = {
  [CharacterNavigatorRoutes.Characters]: undefined;
  [CharacterNavigatorRoutes.Details]: {character: Character};
};

export type BottomTabParamList = {
  [BottomTabNavigatorRoutes.Characters]: undefined;
  [BottomTabNavigatorRoutes.Settings]: undefined;
};
