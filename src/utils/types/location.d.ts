export type ILocation = {
  id: ID
  name: String
  type: String
  dimension: String
  residents: [Character]!
  created: String
}

export type ILocationTable = {
  key: React.Key;
  name: string;
  type: string;
  dimension: string;
  created: Date;
}

