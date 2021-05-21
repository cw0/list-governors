const fetchGovernor = require('./fetchGovernor');
const { validateStates, validateSortBy } = require('./validators');

const fetchGovernors = async (states, sortBy = 'state') => {
  validateStates(states);
  validateSortBy(sortBy);

  const governors = await Promise.all(
    states.map((state) => {
      return fetchGovernor(state);
    }),
  );

  governors.sort((firstGovernor, secondGovernor) => {
    if (
      firstGovernor[sortBy].toUpperCase() <
      secondGovernor[sortBy].toUpperCase()
    )
      return -1;
    if (
      firstGovernor[sortBy].toUpperCase() >
      secondGovernor[sortBy].toUpperCase()
    )
      return 1;
    return 0;
  });

  return governors;
};

module.exports = fetchGovernors;
