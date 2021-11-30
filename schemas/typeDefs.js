const { gql } = require('apollo-server-express');

const typeDefs = gq; `
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]!
}

type Book {
    bookId: String!
    authors: [String]!
    description: String
    image: String
    link: String
    title: String!
}

type Query {
    me:User
}

type Auth {
    token: String!
    user: [User]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: savedBook!): User
    removeBook(bookId: String!): User

}



`;