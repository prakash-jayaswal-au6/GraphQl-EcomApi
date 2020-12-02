import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users: [User!]!
    user(id: String!): User
  }

  extend type Mutation {
    saveUser( 
        id: String
        name: String!
        categories: [ID]
        ): User @admin @demo
      
    deleteUser(id: ID!): Boolean @admin @demo

    assignCategory(
      id: ID!
      catId:ID!
      ): User @admin @demo
    
  }


  type User {
    id: ID!
    name: String
    categories: [ID]
    createdAt: String!
    updatedAt: String!
  }

`
