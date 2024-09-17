import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  CharacterNavigatorRoutes,
  CharacterStackParamList,
} from '../navigation/types';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';

type Props<
  RouteName extends keyof CharacterStackParamList = CharacterNavigatorRoutes,
> = NativeStackScreenProps<CharacterStackParamList, RouteName>;

const CharacterDetailsScreen: React.FC<Props> = ({route}) => {
  const params = route.params;
  if (!params) return null;
  const {character} = params;
  return (
    <View style={styles.container}>
      <Image source={{uri: character.image}} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Species: {character.species}</Text>
      <Text>Gender: {character.gender}</Text>
      <Text>Origin: {character.origin?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CharacterDetailsScreen;
