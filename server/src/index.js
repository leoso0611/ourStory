const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const port = process.env.PORT || 1337;

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
});

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type RootQuery{
      users: [String!]!
    }

    type RootMutation{
      createUser(name: String): String
    }

    schema{
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    users: () => {
      return ['Romantic', 'hehe', 'gg'];
    },
    createUser: (args) => {
      const eventName = args.name;
      return eventName;
    }
  },
  graphiql: true
}))

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})