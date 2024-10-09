const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';

function configExpress(app) {
  app.use(cors());
  if (env === 'development') {
    app.use(morgan('dev'));
  }
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
}

module.exports = configExpress;
