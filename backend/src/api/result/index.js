const {
  getAllResultsHandler,
  createResultHandler,
  updateResultHandler,
  deleteResultHandler,
} = require('./result.controller');

const { Router } = require('express');

const router = Router();

router.get('/', getAllResultsHandler);
router.post('/', createResultHandler);
router.put('/:id', updateResultHandler);
router.delete('/:id', deleteResultHandler);

module.exports = router;
