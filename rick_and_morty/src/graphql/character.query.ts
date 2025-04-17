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

export const GET_FILTERED_CHARACTERS = gql`
query GetFilteredCharacters($page: Int, $name: String, $status: String, $species: String) {
  characters(page: $page, filter: { name: $name, status: $status, species: $species }) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      status
      species
      gender
      image
      origin {
        name
      }
    }
  }
}
`;
