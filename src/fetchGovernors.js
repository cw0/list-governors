const fetchGovernor = require('./fetchGovernor');
const { validateStates } = require('./validators');

const fetchGovernors = async (states) => {
  validateStates(states);
  const governors = Promise.all(
    states.map((state) => {
      return fetchGovernor(state);
    }),
  );
  return governors;
};

module.exports = fetchGovernors;
