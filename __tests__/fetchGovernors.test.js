const fetchGovernors = require('../src/fetchGovernors');
const fetchGovernor = require('../src/fetchGovernor');

//jest.mock('fetchGovernor');

describe('fetchGovernors tests', () => {
  it('should throw an exception if no list of states provided', async () => {
    await expect(fetchGovernors).rejects.toThrow(
      'No States provided',
    );
  });
  it('should throw exception if typeof states is not a list', async () => {
    const callFetchGovernors = async () => {
      return await fetchGovernors('ga,ca,ny');
    };
    await expect(callFetchGovernors).rejects.toThrow(
      'States should be provided as an array',
    );
  });
  it('should return 3 governors if provided with a valid list of state abbreviations', async () => {
    const expected = [
      { firstName: 'Gavin', lastName: 'Newsom', state: 'ca' },
      { firstName: 'Brian', lastName: 'Kemp', state: 'ga' },
      { firstName: 'Andrew', lastName: 'M.', state: 'ny' },
    ];
    const result = await fetchGovernors(['ny', 'ca', 'ga']);
    expect(result).toEqual(expected);
  });
  it('should throw an exception if one of the list members is not valid', async () => {
    const callFetchGovernors = async () => {
      return await fetchGovernors(['ga', 'ny', 42]);
    };
    await expect(callFetchGovernors).rejects.toThrow(
      'State abbreviation must be a string',
    );
  });
  it('should sort by last name if sortBy param = lastName', async () => {
    const expected = [
      { firstName: 'Brian', lastName: 'Kemp', state: 'ga' },
      { firstName: 'Andrew', lastName: 'M.', state: 'ny' },
      { firstName: 'Gavin', lastName: 'Newsom', state: 'ca' },
    ];

    const result = await fetchGovernors(
      ['ny', 'ca', 'ga'],
      'lastName',
    );
    expect(result).toEqual(expected);
  });

  it('should sort by first name if sortBy param = firstName', async () => {
    const expected = [
      { firstName: 'Andrew', lastName: 'M.', state: 'ny' },
      { firstName: 'Brian', lastName: 'Kemp', state: 'ga' },
      { firstName: 'Gavin', lastName: 'Newsom', state: 'ca' },
    ];

    const result = await fetchGovernors(
      ['ny', 'ca', 'ga'],
      'firstName',
    );
    expect(result).toEqual(expected);
  });
});
