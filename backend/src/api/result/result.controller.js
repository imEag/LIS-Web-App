const {
  getResults,
  createResult,
  updateResult,
  deleteResult,
} = require('./result.service');

async function getAllResultsHandler(req, res, next) {
  try {
    const results = await getResults();
    res.status(200).json(
      { results },
    );
  } catch (error) {
    next(error);
  }
}

async function createResultHandler(req, res, next) {
  const { body } = req;

  const requiredFields = ['CHOLT', 'TRIG', 'HDL', 'LDL', 'patient'];

  const missingFields = requiredFields.filter((field) => !body[field]);
  if (missingFields.length) {
    const error = new Error(`Missing required fields: ${missingFields.join(', ')}`);
    error.statusCode = 400;
    return next(error);
  }

  try {
    const newResult = await createResult(body);
    res.status(200).json({
      msg: 'Successfully created',
      result: newResult,
    });
  } catch (error) {
    next(error);
  }
}

async function updateResultHandler(req, res, next) {
  const { body } = req;
  const { id } = req.params;

  if (!id) {
    const error = new Error('Missing required id');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const updatedResult = await updateResult(id, body);
    if (!updatedResult) {
      const error = new Error('Result not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      msg: 'Successfully updated',
      result: updatedResult,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteResultHandler(req, res, next) {
  const { id } = req.params;

  if (!id) {
    const error = new Error('Missing required id');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const deletedResult = await deleteResult(id);
    if (!deletedResult) {
      const error = new Error('Result not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      msg: 'Successfully deleted',
      result: deletedResult,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllResultsHandler,
  createResultHandler,
  updateResultHandler,
  deleteResultHandler,
};
