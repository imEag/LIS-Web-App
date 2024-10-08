const {
  getAllPatientsHandler,
  getPatientHandler,
  createPatientHandler,
  updatePatientHandler,
  deletePatientHandler,
} = require('./patient.controller');

const { Router } = require('express');

const router = Router();

router.get('/', getAllPatientsHandler);
router.get('/:id', getPatientHandler);
router.post('/', createPatientHandler);
router.put('/:id', updatePatientHandler);
router.delete('/:id', deletePatientHandler);

module.exports = router;
