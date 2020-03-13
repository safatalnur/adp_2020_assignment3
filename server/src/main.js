const { ApolloServer, gql } = require('apollo-server')
import { Pool } from 'pg'

const pool = new Pool()

const typeDefs = gql `

    type Query {
        "All countries"
        countries: [Country!] 

    }

    type Country {
        id: ID!
        name: String!
    }
`;

const resolvers = {
    Query: {
        countries: async () => {
            const results = await pool.query(`
                SELECT * FROM countries
            `)
        return results.rows
        },

    },

}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})