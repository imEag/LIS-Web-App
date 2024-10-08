const errorHandler = async (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500).json({ msg: err.message });
};

module.exports = errorHandler;
