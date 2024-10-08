const Result = require('./result.model');

function getResults(query = {}) {
  return Result.find(query);
}

function createResult(result) {
  return Result.create(result);
}

function updateResult(id, result) {
  return Result.findByIdAndUpdate(
    id,
    result,
    { new: true },
  );
}

function deleteResult(id) {
  return Result.findByIdAndDelete(id);
}

module.exports = {
  getResults,
  createResult,
  updateResult,
  deleteResult,
};
