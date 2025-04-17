import React, { useEffect, useState } from 'react';
import { Character, GetAllCharactersResponse } from '../models/character.model';
import { fetchCharactersByPage } from '../services/api.service';
import Characters from '../components/Character/Characters';
import LoadingSpinner from '../components/Utilities/LoadingAnimation';

const PaginationPage: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      const data: GetAllCharactersResponse | null = await fetchCharactersByPage(page);
      if (data?.characters.results) {
        setCharacters(data.characters.results);
        setTotalPages(data.characters.info.pages);
      }
      setLoading(false);
    };

    loadCharacters();
  }, [page]);

  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <>
          <Characters characters={characters} />
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button onClick={() => setPage(1)} disabled={page === 1}>
              ⏮ First
            </button>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              ◀ Prev
            </button>

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

            <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
              Next ▶
            </button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
              Last ⏭
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginationPage;
