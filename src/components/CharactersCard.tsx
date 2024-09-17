import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Character} from 'rickmortyapi';
import {useState, useEffect} from 'react';
import {getEpisode} from '../api/api';
interface CharacterCardProps {
  character: Character;
  onPress: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({character, onPress}) => {
  const [firstEpisodeName, setFirstEpisodeName] =
    useState<string>('Loading...');

  const statusColor = {
    Alive: 'green',
    Dead: 'red',
    unknown: 'gray',
  };
  useEffect(() => {
    const fetchEpisodeName = async () => {
      try {
        const episodeId = character.episode[0].split('/').pop();
        if (episodeId) {
          const response = await getEpisode(parseInt(episodeId));
          setFirstEpisodeName(response.data.name);
        }
      } catch {
        setFirstEpisodeName('unknown');
      }
    };

    fetchEpisodeName();
  }, [character.episode]);
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{uri: character.image}} style={styles.image} />

      <View style={styles.textContainer}>
        <View style={styles.row}>
          <View
            style={[
              styles.statusIndicator,
              {backgroundColor: statusColor[character.status]},
            ]}
          />
          <Text style={styles.species}>
            {character.species} -{' '}
            <Text style={{color: statusColor[character.status]}}>
              {character.status}
            </Text>
          </Text>
        </View>
        <Text style={styles.location}>Last known location:</Text>
        <Text style={styles.locationValue}>{character.location?.name}</Text>
        <Text style={styles.firstSeen}>First seen in:</Text>
        <Text style={styles.episode}>{firstEpisodeName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  species: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  firstSeen: {
    fontSize: 14,
    color: '#888',
  },
  episode: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CharacterCard;
