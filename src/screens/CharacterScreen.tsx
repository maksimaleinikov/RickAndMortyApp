import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getCharacters} from 'rickmortyapi';
import {Character, ApiResponse, Info} from 'rickmortyapi';
import CharacterCard from '../components/CharactersCard';
import Loader from '../components/Loader';

import {
  CharacterNavigatorRoutes,
  CharacterStackParamList,
} from '../navigation/types';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';

type Props<
  RouteName extends keyof CharacterStackParamList = CharacterNavigatorRoutes,
> = NativeStackScreenProps<CharacterStackParamList, RouteName>;

const CharactersScreen: React.FC<Props> = ({navigation}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 3000)); проверка работы Loader
      // throw new Error('Ошибка загрузки данных');
      const response: ApiResponse<Info<Character[]>> = await getCharacters();
      setCharacters(response.data.results || []);
    } catch (err) {
      setError('Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({item}: {item: Character}) => (
    <CharacterCard
      character={item}
      onPress={() =>
        navigation.navigate(CharacterNavigatorRoutes.Details, {character: item})
      }
    />
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
          <Text style={styles.retryButtonText}>Повторить попытку</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (characters.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Нет данных</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default CharactersScreen;
