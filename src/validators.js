const validateState = (state) => {
  if (!state) throw new Error('No State abbreviation provided');
  if (typeof state !== 'string')
    throw new Error('State abbreviation must be a string');
  if (state.length !== 2)
    throw new Error('State abbreviation must be 2 characters');
  return true;
};

const validateStates = (states) => {
  if (!states) throw new Error('No States provided');
  if (!Array.isArray(states))
    throw new Error('States should be provided as an array');
  states.map((state) => validateState(state));
  return true;
};

module.exports = { validateState, validateStates };
