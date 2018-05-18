import GraphQLMock from 'graphql-mock';

const typeDefs = `
type User @model {
  id: ID! @isUnique
  updatedAt: String!
  createdAt: String!
  firstName: String!
  lastName: String!
  email: String! @isUnique
  slackUserId: String @isUnique
  avatarUrl: String
  insultCreator: [Insult!]! @relation(name: "InsultCreator")
  insultTarget: [Insult!]! @relation(name: "InsultTarget")
  gamesCreated: [Game!]! @relation(name: "GameCreator")
  whitePlayer0Games: [Game!]! @relation(name: "WhiteUser0")
  whitePlayer1Games: [Game!]! @relation(name: "WhiteUser1")
  blackPlayer0Games: [Game!]! @relation(name: "BlackUser0")
  blackPlayer1Games: [Game!]! @relation(name: "BlackUser1")
  roomSatusEntries: [RoomStatusEntry!]! @relation(name: "RoomStatusLogger")
}

type AllUsersQuery {
    allUsers: [User]
}
`;

export const mock = new GraphQLMock(typeDefs);