import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_ALL_CHARACTERS } from '../graphql/character.query';
import { GetAllCharactersResponse } from '../models/character.model';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export const fetchCharactersByPage = async (page: number): Promise<GetAllCharactersResponse | null> => {
  try {
    const { data } = await client.query({
      query: GET_ALL_CHARACTERS,
      variables: { page },
    });
    return data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return null;
  }
};
