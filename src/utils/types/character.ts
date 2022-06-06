import { ILocation, IEpisode } from "utils/types";

export type ICharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: ILocation;
  location: ILocation;
  image: string;
  created: Date;
}

export type ICharactersTable = {
  key: React.Key;
  avatar: string;
  name: string;
  origin: string;
  location: string;
  status: string;
  species: string;
  type:string;
  gender: string;
  created: Date;
}

export type IFilterCharacter = {
  name: string
  status: string
  species: string
  type: string
  gender: string
}

export type ICharacterModal = {
  isModalVisible: Boolean,
  handleOk: () => void,
  handlCancel: () => void,
  id: string,
}

