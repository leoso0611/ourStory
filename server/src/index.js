const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 1337;

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})