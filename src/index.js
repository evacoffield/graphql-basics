import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '1'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2'
}]

const comments = [{
    id: '102',
    text: 'This worked well for me. Thanks!'
},
{
    id: '103',
    text: 'Glad to hear it worked'
},
{
id: '104',
text: 'This did not work'
},
{
    id: '105',
    text: 'Never mind. I got it to work.'
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }

    type Comment {
        id: ID!
        text: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
users(parent, args, ctx, info) {
    if (!args.query) {
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
comments(parent, args, ctx, info) {
return comments
},
        me() {
            return {
                id: '123098',
                name: 'Eva',
                email: 'eva@example.com',
                age: 28,
            }
        },
        post() {
            return {
                id: '123456',
                title: 'Art of War',
                body: '',
                published: false,
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
return posts.filter((post) => {
    return post.author === parent.id
})
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