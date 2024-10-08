const { Router } = require('express');

const router = Router();

router.get('/', function(req, res, next) {
  res.json({ message: 'Hello, world!' });
});

module.exports = router;
