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
      { firstName: 'Andrew', lastName: 'M.' },
      { firstName: 'Gavin', lastName: 'Newsom' },
      { firstName: 'Brian', lastName: 'Kemp' },
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
});
