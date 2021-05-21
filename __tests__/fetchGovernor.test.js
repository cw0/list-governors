const axios = require('axios');
const fetchGovernor = require('../src/fetchGovernor');

jest.mock('axios');

describe('fetchGovernor tests', () => {
  it('Correct input should return the expected governor object', async () => {
    const mockResponse = {
      data: {
        offices: [
          {
            name: 'Governor of Georgia',
            divisionId: 'ocd-division/country:us/state:ga',
            levels: ['administrativeArea1'],
            roles: ['headOfGovernment'],
            officialIndices: [0],
          },
        ],
        officials: [
          {
            name: 'Brian Kemp',
            address: [
              {
                line1: '206 Washington Street Southwest',
                city: 'Atlanta',
                state: 'GA',
                zip: '30334',
              },
            ],
            party: 'Republican Party',
            phones: ['(404) 656-1776'],
            urls: ['https://gov.georgia.gov/'],
            channels: [
              {
                type: 'Facebook',
                id: 'GovKemp',
              },
              {
                type: 'Twitter',
                id: 'GovKemp',
              },
            ],
          },
        ],
        divisions: {
          'ocd-division/country:us/state:ga': {
            name: 'Georgia',
            officeIndices: [0],
          },
        },
      },
    };

    axios.get.mockImplementationOnce(() =>
      Promise.resolve(mockResponse),
    );

    const result = await fetchGovernor('ga');
    const expected = {
      firstName: 'Brian',
      lastName: 'Kemp',
    };
    expect(result).toStrictEqual(expected);
  });
});
