const {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} = require('./patient.controller');

const { Router } = require('express');

const router = Router();

router.get('/', getAllPatients);
router.post('/', createPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;
