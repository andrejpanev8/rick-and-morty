import { gql } from '@apollo/client';

export const GET_ALL_CHARACTERS = gql`
  query GetAllCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        name
        status
        species
        gender
        origin {
          name
        }
        image
      }
    }
  }
`;
