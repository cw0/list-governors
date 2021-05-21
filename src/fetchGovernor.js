require('dotenv').config();
const axios = require('axios');

const fetchGovernor = async (state) => {
  if (!state) throw new Error('No State abbreviation provided');
  if (typeof state !== 'string')
    throw new Error('State abbreviation must be a string');
  if (state.length !== 2)
    throw new Error('State abbreviation must be 2 characters');

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
    return { firstName: governorName[0], lastName: governorName[1] };
  } catch (error) {
    console.error(`An Error Occurred: ${error}`);
  }
};

module.exports = fetchGovernor;
