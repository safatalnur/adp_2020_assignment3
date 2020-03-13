const { ApolloServer, gql } = require('apollo-server')
import { Pool } from 'pg'

const pool = new Pool()

const typeDefs = gql `

    type Query {
        "All countries"
        countries: [Country!] 

        "All facts"
        facts: [Fact!]

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

    Fact: {
        homeCountry: async (source) =>{
            const results = await pool.query(`
                SELECT * FROM countries WHERE ID = $1
            `, [source.home_country_id])
        return results.rows[0]
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})