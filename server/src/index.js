require('dotenv').config();
const consola = require('consola');
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./database');
const app = express();
const {port} = require('../config');
const { authTokenDecoderMiddleware } = require('./middlewares/auth')

app.use(cors());
app.use(bodyParser.json({extended: false}));
app.use('/public', express.static('public'));
app.use(helmet());
app.use(authTokenDecoderMiddleware);
app.use('/api', require('./routes'));

app.listen(port, () => {
  consola.log(`Example app listening at http://localhost:${port}`);
});
