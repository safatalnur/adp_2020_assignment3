const { ApolloServer, gql } = require('apollo-server')
import { Pool } from 'pg'

const pool = new Pool()

const typeDefs = gql `

    type Query {
        "All countries"
        countries: [Country!] 

        "All facts"
        facts: [Fact!]

        "All languages"
        languages: [Language!]
    }
    type Language {
        id: ID!
        name: String!
    }
    type Fact {
        id: ID!
        capital: String!
        population: String!
        area: String!
        # homeCountry: Country!
    }

    type Country {
        id: ID!
        name: String!
        homeCountryFact: Fact!
        homeLanguage: Language!
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

        facts: async () => {
            const results = await pool.query(`
                SELECT * FROM facts
            `)
        return results.rows
        },

        languages: async () => {
            const results = await pool.query(`
                SELECT * FROM languages
            `)
        return results.rows
        }
    },

    // Fact: {
    //     homeCountry: async (source) =>{
    //         const results = await pool.query(`
    //             SELECT * FROM countries WHERE ID = $1
    //         `, [source.home_country_id])
    //     return results.rows[0]
    //     },
    // },

    Country: {
        homeLanguage: async (source) =>{
            const results = await pool.query(`
                SELECT * FROM languages WHERE ID = $1
            `, [source.home_language_id])
        return results.rows[0]
        },
        homeCountryFact: async (source) =>{
            const results = await pool.query(`
                SELECT * FROM facts WHERE ID = $1
            `, [source.home_country_fact_id])
        return results.rows[0]
        },
        
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})