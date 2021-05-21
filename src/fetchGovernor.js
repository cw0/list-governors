require('dotenv').config();
const axios = require('axios');
const { validateState } = require('./validators');

const fetchGovernor = async (state) => {
  validateState(state);
  try {
    const response = await axios.get(
      'https://www.googleapis.com/civicinfo/v2/representatives/ocdId',
      {
        params: {
          key: process.env.API_KEY,
          ocdId: `ocd-division/country:us/state:${state}`,
          levels: 'administrativeArea1',
          roles: 'headOfGovernment',
        },
      },
    );
    //TODO add more validation
    const governorName = response.data.officials[0].name.split(' ');
    return {
      firstName: governorName[0],
      lastName: governorName[1],
      state,
    };
  } catch (error) {
    console.error(`An Error Occurred: ${error}`);
  }
};

module.exports = fetchGovernor;
