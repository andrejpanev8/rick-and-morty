import { useEffect, useState, useRef, useCallback } from 'react';
import { Character } from '../models/character.model';
import LoadingSpinner from '../components/Utilities/LoadingAnimation';
import CharacterFilterSortPanel from '../components/Utilities/CharacterFilterSortPanel';
import { getProcessedCharacters } from '../services/filterAndSort.service';

export default function InfiniteScrollPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCharacterRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && page < totalPages) {
          setPage(prev => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const result = await getProcessedCharacters(page, {
        status: statusFilter,
        species: speciesFilter,
        sort: sortOption,
      });

      setCharacters(prev =>
        page === 1 ? result.characters : [...prev, ...result.characters]
      );
      setTotalPages(result.totalPages);
      setLoading(false);
    };

    loadCharacters();
  }, [page, statusFilter, speciesFilter, sortOption]);

  const handleFilterChange = (type: 'status' | 'species' | 'sort', value: string) => {
    setPage(1);
    if (type === 'status') setStatusFilter(value);
    if (type === 'species') setSpeciesFilter(value);
    if (type === 'sort') setSortOption(value);
  };

  return (
    <div className="container mt-4">
      <CharacterFilterSortPanel
        status={statusFilter}
        species={speciesFilter}
        sort={sortOption}
        onStatusChange={(val) => handleFilterChange('status', val)}
        onSpeciesChange={(val) => handleFilterChange('species', val)}
        onSortChange={(val) => handleFilterChange('sort', val)}
      />

      <div className="row">
        {characters.map((char, index) => {
          const isLast = index === characters.length - 1;
          return (
            <div
              ref={isLast ? lastCharacterRef : null}
              className="col-md-3 mb-4"
            >
              <div className="card h-100">
                <img src={char.image} className="card-img-top" alt={char.name} />
                <div className="card-body">
                  <h5 className="card-title">{char.name}</h5>
                  <p className="card-text">{char.species}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <LoadingSpinner />}
      {!loading && page >= totalPages && characters.length > 0 && (
        <p className="text-center text-muted">No more characters to load.</p>
      )}
    </div>
  );
};
