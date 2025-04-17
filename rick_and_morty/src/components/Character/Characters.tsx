import React from 'react';
import { Character } from '../../models/character.model';
import CharacterCard from './CharacterCard';

interface CharactersProps {
  characters: Character[];
  lastCharacterRef?: (node: HTMLDivElement | null) => void;
}

const Characters: React.FC<CharactersProps> = ({ characters, lastCharacterRef }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {characters.map((character, index) => {
        const isLast = index === characters.length - 1;

        return (
          <div
            key={character.id}
            ref={isLast && lastCharacterRef ? lastCharacterRef : null}
            className="col-md-3 mb-4"
          >
            <CharacterCard key={index} character={character} />
          </div>
        );
      })}
    </div>
  );
};

export default Characters;