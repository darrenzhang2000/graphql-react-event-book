const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')

const app = express()

app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return ['Romantic Cooking', 'Sailing', 'All-Night Coding']
        },
        createEvent: (args) => {
            const eventName = args.name
            return eventName
        }
    }, // root has all our resolver functions
    graphiql: true
}))

app.listen(port, () => console.log("listening at port", port))
