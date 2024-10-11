const patient = require('./api/patient');
const result = require('./api/result');
const doctor = require('./api/doctor');

function routes(app) {
  app.use('/api/patients', patient);
  app.use('/api/results', result);
  app.use('/api/doctors', doctor);
}

module.exports = routes;
