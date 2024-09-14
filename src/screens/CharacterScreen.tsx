import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {getCharacters} from 'rickmortyapi';
import {Character, ApiResponse, Info} from 'rickmortyapi';
import CharacterCard from '../components/CharactersCard';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/Navigation';
import {useNavigation} from '@react-navigation/native';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ApiResponse<Info<Character[]>> = await getCharacters();
        setCharacters(response.data.results || []);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CharactersScreen;
