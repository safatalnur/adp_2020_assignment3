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

    type Mutation {
        createFact(input: CreateFactInput!):Fact!
        createLanguage(input: CreateLanguageInput!):Language!
        createCountry(input: CreateCountryInput!):Country!
    }

    input CreateCountryInput {
        name: String!
        homeCountryFact: ID!
        homeLanguage: ID!
    }

    input CreateFactInput {
        capital: String!
        population: String!
        area: String!
    }

    input CreateLanguageInput {
        name: String!
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
    },

    Mutation: {
        createFact: async (source, args) => {
            const { capital, population, area } = args.input
      
            const results = await pool.query(`
              INSERT INTO facts (capital, population, area)
              VALUES 
                ($1, $2, $3)
              RETURNING *
            `, [capital, population, area])
      
            return results.rows[0]
          },

        createLanguage: async (source, args) => {
            const { name } = args.input
      
            const results = await pool.query(`
              INSERT INTO languages (name)
              VALUES 
                ($1)
              RETURNING *
            `, [name])
      
            return results.rows[0]
          },    
        
          createCountry: async (source, args) => {
            const { name, homeCountryFact, homeLanguage } = args.input
      
            const results = await pool.query(`
              INSERT INTO countries (name, home_country_fact_id, home_language_id)
              VALUES 
                ($1, $2, $3)
              RETURNING *
            `, [name, homeCountryFact, homeLanguage])
      
            return results.rows[0]
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