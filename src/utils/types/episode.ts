import { ICharacter } from 'utils/types';

export type IEpisode = {
  id: number
  name: string
  air_date: string
  episode: string
  characters: ICharacter
  created: string
}

export type IEpisodeTable = {
  key: React.Key;
  name: string
  air_date: string
  episode: string
  created: string
}