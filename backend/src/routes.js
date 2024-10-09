const patient = require('./api/patient');
const result = require('./api/result');

function routes(app) {
  app.use('/api/patients', patient);
  app.use('/api/results', result);
}

module.exports = routes;
