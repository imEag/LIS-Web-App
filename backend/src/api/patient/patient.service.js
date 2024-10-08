const Patient = require('./patient.model');
const mongoose = require('mongoose');

function getPatients(query = {}) {
  return Patient.find(query);
}

// get the customer with all the results from the results collection that match the patient _id. the patient object has no reference to the results collection.
// the results collection has a reference to the patient _id. The field in the results collection that references the patient _id is called patient.
function getPatientWithResults(id) {
  const pipeline = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: 'results',
        localField: '_id',
        foreignField: 'patient',
        as: 'results',
      },
    },
  ];

  return Patient.aggregate(pipeline);
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
  getPatientWithResults,
  createPatient,
  updatePatient,
  deletePatient,
};
