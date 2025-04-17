import { Character } from '../../models/character.model';
import './CharacterCard.css';
import { useTranslation } from 'react-i18next';

interface CharacterCardProps {
  character: Character;
}



export default function CharacterCard ({ character }: CharacterCardProps ){
  
  const { t } = useTranslation();

const translateStatus = (status: string) => {
  return t(status.toLowerCase());
};

const translateSpecies = (species: string) => {
  return t(species.toLowerCase());
};

const translateGender = (gender: string) => {
  return t(gender.toLowerCase());
};

  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} className="character-image" />
      <div className="character-info">
        <h3>{character.name}</h3>
        <p><strong>{t("status")}:</strong> {translateStatus(character.status)}</p>
        <p><strong>{t("species")}:</strong> {translateSpecies(character.species)}</p>
        <p><strong>{t("gender")}:</strong> {translateGender(character.gender)}</p>
        <p><strong>{t("origin")}:</strong> {character.origin.name !== "unknown" ? character.origin.name : t("unknown")}</p>
      </div>
    </div>
  );
};