const {
  getPatients,
  getPatientWithResults,
  createPatient,
  updatePatient,
  deletePatient,
} = require('./patient.service');

async function getAllPatientsHandler(req, res, next) {
  try {
    const patients = await getPatients();
    res.status(200).json(
      { patients },
    );
  } catch (error) {
    next(error);
  }
}

async function getPatientHandler(req, res, next) {
  const { id } = req.params;

  if (!id) {
    const error = new Error('Missing required id');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const patients = await getPatientWithResults(id);
    res.status(200).json({ patients });
  } catch (error) {
    next(error);
  }
}

async function createPatientHandler(req, res, next) {
  const { body } = req;

  const requiredFields = ['firstName', 'lastName', 'age', 'gender', 'legalID'];

  const missingFields = requiredFields.filter((field) => !body[field]);
  if (missingFields.length) {
    const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
    error.statusCode = 400;
    return next(error);
  }

  try {
    const newPatient = await createPatient(body);
    res.status(200).json({
      msg: 'Successfully created',
      patient: newPatient,
    });
  } catch (error) {
    next(error);
  }
}

async function updatePatientHandler(req, res, next) {
  const { body } = req;
  const { id } = req.params;

  if (!id) {
    const error = new Error('Missing required id');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const updatedPatient = await updatePatient(id, body);
    if (!updatedPatient) {
      const error = new Error('Patient not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      msg: 'Successfully updated',
      patient: updatedPatient,
    });
  } catch (error) {
    next(error);
  }
}

async function deletePatientHandler(req, res, next) {
  const { id } = req.params;

  if (!id) {
    const error = new Error('Missing required id');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const deletedPatient = await deletePatient(id);
    if (!deletedPatient) {
      const error = new Error('Patient not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      msg: 'Successfully deleted',
      patient: deletedPatient,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPatientsHandler,
  getPatientHandler,
  createPatientHandler,
  updatePatientHandler,
  deletePatientHandler,
};
