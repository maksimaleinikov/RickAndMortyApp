import axios from 'axios';
import {ApiResponse, Info, Character} from 'rickmortyapi';

const API_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (): Promise<
  ApiResponse<Info<Character[]>>
> => {
  try {
    const response = await axios.get(`${API_URL}/character`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch characters');
  }
};
