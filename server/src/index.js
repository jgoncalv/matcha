const consola = require('consola');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('./database');
const app = express();
const port = 3000;

app.use(helmet())
app.use(bodyParser.json())
app.use('/api', require('./routes'))

app.listen(port, () => {
  consola.log(`Example app listening at http://localhost:${port}`);
});
