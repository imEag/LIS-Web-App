function getAllPatients(req, res, next) {
  res.json({ message: 'Hello, world! from get all patients' });
}

function createPatient(req, res, next) {
  res.json({ message: 'Hello, world! from create patient' });
}

function updatePatient(req, res, next) {
  res.json({ message: 'Hello, world! from update patient' });
}

function deletePatient(req, res, next) {
  res.json({ message: 'Hello, world! from delete patient' });
}

module.exports = {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
};
