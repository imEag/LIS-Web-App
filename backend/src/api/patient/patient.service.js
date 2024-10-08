const Patient = require('./patient.model');

function getPatients(query = {}) {
  return Patient.find(query);
}

function createPatient(patient) {
  return Patient.create(patient);
}

function updatePatient(id, patient) {
  return Patient.findOneAndUpdate(
    { id },
    patient,
    { new: true },
  );
}

function deletePatient(id) {
  return Patient.findOneAndDelete({ id });
}

module.exports = {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
};
