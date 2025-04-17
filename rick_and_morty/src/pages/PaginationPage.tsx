import { useEffect, useState } from 'react';
import { Character } from '../models/character.model';
import Characters from '../components/Character/Characters';
import LoadingSpinner from '../components/Utilities/LoadingAnimation';
import CharacterFilterSortPanel from '../components/Utilities/CharacterFilterSortPanel';
import { getProcessedCharacters } from '../services/filterAndSort.service';

export default function PaginationPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const result = await getProcessedCharacters(page, {
        status: statusFilter,
        species: speciesFilter,
        sort: sortOption,
      });
      setCharacters(result.characters);
      setTotalPages(result.totalPages);
      setLoading(false);
    };

    loadCharacters();
  }, [page, statusFilter, speciesFilter, sortOption]);

  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div>
      <CharacterFilterSortPanel
        status={statusFilter}
        species={speciesFilter}
        sort={sortOption}
        onStatusChange={(val) => {
          setPage(1);
          setStatusFilter(val);
        }}
        onSpeciesChange={(val) => {
          setPage(1);
          setSpeciesFilter(val);
        }}
        onSortChange={setSortOption}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Characters characters={characters} />
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button onClick={() => setPage(1)} disabled={page === 1}>⏮ First</button>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>◀ Prev</button>

            {getPageNumbers().map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                style={{
                  margin: '0 4px',
                  fontWeight: num === page ? 'bold' : 'normal',
                  backgroundColor: num === page ? '#ccc' : 'transparent',
                }}
              >
                {num}
              </button>
            ))}

            <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next ▶</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>Last ⏭</button>
          </div>
        </>
      )}
    </div>
  );
};