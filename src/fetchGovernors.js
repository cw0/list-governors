const fetchGovernor = require('./fetchGovernor');

const fetchGovernors = async (states) => {
  if (!states) throw new Error('No States provided');
  if (!Array.isArray(states))
    throw new Error('States should be provided as an array');
  const governors = Promise.all(
    states.map((state) => {
      return fetchGovernor(state);
    }),
  );
  return governors;
};

module.exports = fetchGovernors;
