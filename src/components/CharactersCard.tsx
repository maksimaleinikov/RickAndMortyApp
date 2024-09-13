import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface CharacterCardProps {
  name: string;
  status: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({name, status}) => {
  return (
    <View style={styles.card}>
      <Text>{name}</Text>
      <Text>{status}</Text>
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
  },
});

export default CharacterCard;
