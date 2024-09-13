import React from 'react';
import {View, FlatList, StyleSheet, ListRenderItem} from 'react-native';
import CharactersCard from '../components/CharactersCard';

interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'Unknown';
}

const charactersData: Character[] = [
  {id: '1', name: 'Rick Sanchez', status: 'Alive'},
  {id: '2', name: 'Morty Smith', status: 'Alive'},
  {id: '3', name: 'Birdperson', status: 'Dead'},
];

const CharactersScreen: React.FC = () => {
  const renderItem: ListRenderItem<Character> = ({item}) => (
    <CharactersCard name={item.name} status={item.status} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={charactersData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CharactersScreen;
