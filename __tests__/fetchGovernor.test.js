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
      state: 'ga',
    };
    expect(result).toStrictEqual(expected);
  });

  it('should fail if no input provided', async () => {
    await expect(fetchGovernor).rejects.toThrow(
      'No State abbreviation provided',
    );
  });

  it('should fail if not provided with a valid abbreviation', async () => {
    const callFetchGovernor = async () => {
      return await fetchGovernor(42);
    };
    await expect(callFetchGovernor).rejects.toThrow(
      'State abbreviation must be a string',
    );
  });

  it('should fail if input length !== 2', async () => {
    const callFetchGovernor = async () => {
      return await fetchGovernor('usa');
    };
    await expect(callFetchGovernor).rejects.toThrow(
      'State abbreviation must be 2 characters',
    );
  });
});
