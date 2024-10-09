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
  const { legalId } = req.params;

  // Validar que el ID esté presente y que sea un string no vacío
  if (!legalId || typeof legalId !== 'string' || legalId.trim() === '') {
    const error = new Error('El ID es requerido y debe ser un string no vacío.');
    error.statusCode = 400; // Bad Request
    return next(error);
  }

  try {
    // Llama a la función que obtiene al paciente junto con sus resultados
    const patient = await getPatientWithResults(legalId);

    // Verificar si se encontró un paciente
    if (!patient) {
      const error = new Error(`No se encontró un paciente con el ID ${legalId}.`);
      error.statusCode = 404; // Not Found
      return next(error);
    }

    // Responder con los datos del paciente si se encontró
    res.status(200).json({ patient });
  } catch (error) {
    // Registro adicional del error para depuración
    console.error('Error al obtener el paciente:', error);
    
    // Si el error no tiene un código de estado, lo configuramos a 500 (Error interno del servidor)
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    
    // Pasamos el error al middleware de manejo de errores
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
