import axios from 'axios';
import {ApiResponse, Info, Character, Episode} from 'rickmortyapi';

const API_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async (
  page = 1,
): Promise<ApiResponse<Info<Character[]>>> => {
  try {
    const response = await axios.get(`${API_URL}/character`, {
      params: {page},
    });
    return {
      status: response.status,
      statusMessage: response.statusText,
      data: response.data,
    };
  } catch (error) {
    throw new Error('Failed to fetch characters');
  }
};

export const getEpisode = async (id: number): Promise<ApiResponse<Episode>> => {
  try {
    const response = await axios.get(`${API_URL}/episode/${id}`);
    return {
      status: response.status,
      statusMessage: response.statusText,
      data: response.data,
    };
  } catch (error) {
    throw new Error(`Failed to fetch episode with ID ${id}`);
  }
};
