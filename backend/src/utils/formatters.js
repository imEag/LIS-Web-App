function capitalizeSentence(sentence) {
  return sentence
    .split(' ')
    .map(capitalize)
    .join(' ')
    .split('-')
    .map(capitalize)
    .join(' ');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = {
  capitalizeSentence,
  capitalize,
};
