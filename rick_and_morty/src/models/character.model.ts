export interface Origin {
  name: string | null;
}

export interface Character {
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: Origin;
  image: string;
}

export interface CharactersInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface CharactersData {
  info: CharactersInfo;
  results: Character[];
}

export interface GetAllCharactersResponse {
  characters: CharactersData;
}
