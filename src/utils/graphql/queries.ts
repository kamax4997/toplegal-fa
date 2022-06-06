import { gql } from '@apollo/client';

// Get Characters
export const CHARACTERSQUERY = gql`
  query GET_Characters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
        }
        location {
          id
          name
        }
        image
        episode {
          id
          name
        }
        created
      }
    }
  }
`;

// Get Character
export const CHARACTERQUERY = gql`
  query GET_Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      created
    }
  }
`;

// Get Locations
export const LOCATIONSQUERY = gql`
  query GET_Locations($page: Int, $filter: FilterLocation) {
    locations(
      page: $page,
      filter: $filter
    ) {
      info {
        count
        pages
      }
      results {
        id
        name
        type
        dimension
        created
        residents {
          id 
          name
        }
      }
    }
  }
`;

// Get Location
export const LOCATIONQUERY = gql`
  query GET_Location($id: ID!) {
    location(
      id: $id
    ) {
      id
      name
      type
      dimension
      residents {
        id
        name
      }
      created
    }
  }
`;

// Get Episodes
export const EPISODESQUERY = gql`
  query GET_Episodes($page: Int, $filter: FilterEpisode) {
    episodes(
      page: $page,
      filter: $filter
    ) {
      info {
        count
        pages
      }
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
        }
        created
      }
    }
  }
`;

// Get Episode
export const EPISODEQUERY = gql`
  query GET_Episode ($id: ID!) {
    episode(
      id: $id
    ) {
      id
      name
      air_date
      episode
      created
    }
  }
`;
