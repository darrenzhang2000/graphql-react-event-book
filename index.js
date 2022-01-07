const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')

const app = express()

const events = []

app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!        
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return events 
        },
        createEvent: (args) => {
            const { title, description, price, date } = args.eventInput

            const event = {
                _id: Math.random().toString(),
                title: title,
                description: description,
                price: price,
                date: date
                //date: new Date().toISOString()
            }
            events.push(event)
            return event
        }
    }, // root has all our resolver functions
    graphiql: true
}))

app.listen(port, () => console.log("listening at port", port))
