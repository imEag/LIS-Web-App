const paciente = require('./api/paciente');

function routes(app) {
  app.use('/api/pacientes', paciente);
}

module.exports = routes;
