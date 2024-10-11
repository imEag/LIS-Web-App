function authenticate({user, password}) {
  return user === 'admin' && password === 'admin';
}

module.exports = {
  authenticate
}
