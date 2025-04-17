import React from 'react';
import { useTranslation } from 'react-i18next';

interface FilterSortProps {
  status: string;
  species: string;
  sort: string;
  onStatusChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const CharacterFilterSortPanel: React.FC<FilterSortProps> = ({
  status,
  species,
  sort,
  onStatusChange,
  onSpeciesChange,
  onSortChange,
}) => {
  const clearFilters = () => {
    onStatusChange('');
    onSpeciesChange('');
    onSortChange('');
  };

  const { t } = useTranslation();

  return (
    <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
      <select
        className="form-select w-auto"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">{t('allStatus')}</option>
        <option value="Alive">{t('alive')}</option>
        <option value="Dead">{t('dead')}</option>
        <option value="unknown">{t('unknown')}</option>
      </select>

      <select
        className="form-select w-auto"
        value={species}
        onChange={(e) => onSpeciesChange(e.target.value)}
      >
        <option value="">{t('allSpecies')}</option>
        <option value="Human">{t('human')}</option>
        <option value="Alien">{t('alien')}</option>
        <option value="Robot">{t('robot')}</option>
      </select>

      <select
        className="form-select w-auto"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="">{t('sortBy')}</option>
        <option value="name">{t('nameAZ')}</option>
        <option value="origin">{t('originAZ')}</option>
      </select>

      <button
        className="btn btn-danger"
        onClick={clearFilters}
      >
        {t('clearFilters')}
      </button>
    </div>
  );
};

export default CharacterFilterSortPanel;
