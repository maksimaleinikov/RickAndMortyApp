import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Character} from 'rickmortyapi';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({character}) => {
  const statusColor = {
    Alive: 'green',
    Dead: 'red',
    unknown: 'gray',
  };

  return (
    <View style={styles.card}>
      <Image source={{uri: character.image}} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={[styles.status, {color: statusColor[character.status]}]}>
        {character.status}
      </Text>
      <Text style={styles.species}>Species: {character.species}</Text>
      <Text style={styles.gender}>Gender: {character.gender}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    marginTop: 5,
  },
  species: {
    fontSize: 14,
    marginTop: 5,
  },
  gender: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default CharacterCard;
