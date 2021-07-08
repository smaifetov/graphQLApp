const graphql = require('graphql');
const _ = require('lodash')

const users = [
    { id: '1', firstName: 'Sergey', age: '26' },
    { id: '2', firstName: 'Andrew', age: '22' }
]

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
} = graphql

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return _.find(users, { id: args.id })
            }
        },

    }
})

exports.module = new GraphQLSchema({
    query: RootQuery
})