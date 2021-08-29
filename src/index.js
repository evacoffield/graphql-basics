import { GraphQLServer } from 'graphql-yoga'
import myCurrentLocation, {message, myName, getGreeting} from './myModule'
import myAddFunction, {substract} from './math'

console.log(myAddFunction(1, -2))
console.log(substract(10, 2))
console.log(message)
console.log(myName)
console.log(myCurrentLocation)
console.log(getGreeting('Jessica'))
// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
    id: '1',
    name: 'Eva',
    email: 'eva@hotmail.com',
    age: 38
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@hotmail.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@hotmail.com',
    age: 33
}]

// Demo post data
const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true
}, {
    id: '11',
    title: 'GraphQL 101',
    body: 'This is an advanced GraphQL post...',
    published: false
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if(!args.query) {
                return users
            }
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com',
                age: 29
            }
        },
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})