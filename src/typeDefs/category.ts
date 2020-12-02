import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    categories: [Category!]!
    category(id: String ): Category
    megaMenu(parentId: String): [Category!]!
  }

  extend type Mutation {
    saveCategory(
      id: String
      name: String!
      parentId: ID
      users: [String]!
    ): Category @admin @demo
    
    deleteCategory(id: ID!): Boolean @admin @demo

    assignUser(
      id: ID! 
      userId:ID!
      ):Category @admin @demo

  }

  type Category {
    id: ID!
    name: String
    parentId: String
    users: [String]!
    createdAt: String!
    updatedAt: String!
  }


`
