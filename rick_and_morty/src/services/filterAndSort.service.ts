import { Character, FilteredCharactersResponse, GetAllCharactersResponse } from '../models/character.model';
import { fetchFilteredCharacters } from './api.service';

export const getProcessedCharacters = async (
  page: number,
  filters: {
    status?: string;
    species?: string;
    sort?: string;
  }
): Promise<{ characters: Character[]; totalPages: number }> => {
  const response: FilteredCharactersResponse | null = await fetchFilteredCharacters(
    page,
    filters.status,
    filters.species
  );

  if (!response?.characters?.results) {
    return { characters: [], totalPages: 0 };
  }

  let characters = [...response.characters.results];

  if (filters.sort === 'name') {
    characters.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filters.sort === 'origin') {
    characters.sort((a, b) => (a.origin?.name ?? '').localeCompare(b.origin?.name ?? ''));
  }

  return {
    characters,
    totalPages: response.characters.info.pages,
  };
};
