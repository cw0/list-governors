const validateState = (state) => {
  if (!state) throw new Error('No State abbreviation provided');
  if (typeof state !== 'string')
    throw new Error('State abbreviation must be a string');
  if (state.length !== 2)
    throw new Error('State abbreviation must be 2 characters');
  return true;
};

module.exports = validateState;
