const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');

const Todo = require('../models/todo');
const User = require('../models/user');

// Type Definition
const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    done: { type: GraphQLBoolean },
    deleted: { type: GraphQLBoolean },
    user: {
      type: UserType,
      resolve: (parent) => {
        return User.findById(parent.userId);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: (parent) => {
        return Todo.find({ userId: parent.id });
      },
    },
  }),
});

// Schema : Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => {
        return Todo.findById(args.id);
      },
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve: () => {
        return Todo.find({});
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => {
        return User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return User.find({});
      },
    },
  },
});

// Schema : Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { name }) => {
        const newUser = new User({ name });
        return newUser.save();
      },
    },
    addTodo: {
      type: TodoType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, { text, userId }) => {
        const newTodo = new Todo({ text, userId });
        return newTodo.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
