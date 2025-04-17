import React from 'react';
import CharacterCard from './CharacterCard';
import { Character } from '../../models/character.model';

interface CharactersProps {
  characters: Character[];
}

const Characters: React.FC<CharactersProps> = ({ characters }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {characters.map((character, index) => (
        <CharacterCard key={index} character={character} />
      ))}
    </div>
  );
};

export default Characters;
