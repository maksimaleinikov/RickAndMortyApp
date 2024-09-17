import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getCharacters} from '../api/api';
import {Character, ApiResponse, Info} from 'rickmortyapi';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import Loader from '../components/Loader';
import CharacterCard from '../components/CharactersCard';

import {
  CharacterNavigatorRoutes,
  CharacterStackParamList,
} from '../navigation/types';

type Props<
  RouteName extends keyof CharacterStackParamList = CharacterNavigatorRoutes,
> = NativeStackScreenProps<CharacterStackParamList, RouteName>;

const CharactersScreen: React.FC<Props> = ({navigation}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCharacters = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response: ApiResponse<Info<Character[]>> = await getCharacters(
        page,
      );
      const newCharacters = response.data.results || [];

      setCharacters(prevCharacters => [...prevCharacters, ...newCharacters]);
      setPage(prevPage => prevPage + 1);

      if (
        response?.data?.info?.next === null ||
        response?.data?.info?.next === undefined
      ) {
        setHasMore(false); // Останавливаем загрузки, если следующей страницы нет
      }
    } catch (err) {
      setError('Не удалось загрузить данные');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const renderItem = ({item}: {item: Character}) => (
    <CharacterCard
      character={item}
      onPress={() =>
        navigation.navigate(CharacterNavigatorRoutes.Details, {character: item})
      }
    />
  );

  if (loading && characters.length === 0) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadCharacters}>
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
    <View style={{flex: 1}}>
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`} // Добавил индекс к id как ключ
        onEndReached={loadCharacters}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
