const {
  authenticateDoctor
} = require('./doctor.controller');

const {Router} = require('express');

const router = Router();

router.post('/', authenticateDoctor);

module.exports = router;
