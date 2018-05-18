import GraphQLMock from 'graphql-mock';

const typeDefs = `
type User @model {
  id: ID! @isUnique
  updatedAt: String!
  createdAt: String!
  firstName: String!
  lastName: String!
  email: String! @isUnique
}

type AllUsersQuery {
    allUsers: [User]
}
`;

export const mock = new GraphQLMock(typeDefs);