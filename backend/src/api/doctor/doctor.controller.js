const {authenticate} = require('./doctor.service');

function authenticateDoctor(req, res, next) {
  const {user, password} = req.body;

  if (!user || !password) {
    const error = new Error('Missing required fields');
    error.statusCode = 400;
    return next(error);
  }

  try {
    if (!authenticate({user, password})) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      return next(error);
    }

    res.status(200).json({
      msg: 'Successfully authenticated',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticateDoctor,
};
