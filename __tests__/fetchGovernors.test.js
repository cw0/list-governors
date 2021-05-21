const fetchGovernors = require('../src/fetchGovernors');
const fetchGovernor = require('../src/fetchGovernor');

jest.mock('../src/fetchGovernor');

fetchGovernor.mockImplementation((state) => {
  if (state === 'ca') {
    return Promise.resolve({
      firstName: 'Gavin',
      lastName: 'Newsom',
      state: 'CA',
    });
  }
  if (state === 'ga') {
    return Promise.resolve({
      firstName: 'Brian',
      lastName: 'Kemp',
      state: 'GA',
    });
  }
  if (state === 'ny') {
    return Promise.resolve({
      firstName: 'Andrew M.',
      lastName: 'Cuomo',
      state: 'NY',
    });
  }
});

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
    const expected = {
      governors: [
        { firstName: 'Gavin', lastName: 'Newsom', state: 'CA' },
        { firstName: 'Brian', lastName: 'Kemp', state: 'GA' },
        { firstName: 'Andrew M.', lastName: 'Cuomo', state: 'NY' },
      ],
    };
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
    const expected = {
      governors: [
        { firstName: 'Andrew M.', lastName: 'Cuomo', state: 'NY' },
        { firstName: 'Brian', lastName: 'Kemp', state: 'GA' },
        { firstName: 'Gavin', lastName: 'Newsom', state: 'CA' },
      ],
    };

    const result = await fetchGovernors(
      ['ny', 'ca', 'ga'],
      'lastName',
    );
    expect(result).toEqual(expected);
  });

  it('should sort by first name if sortBy param = firstName', async () => {
    const expected = {
      governors: [
        { firstName: 'Andrew M.', lastName: 'Cuomo', state: 'NY' },
        { firstName: 'Brian', lastName: 'Kemp', state: 'GA' },
        { firstName: 'Gavin', lastName: 'Newsom', state: 'CA' },
      ],
    };

    const result = await fetchGovernors(
      ['ny', 'ca', 'ga'],
      'firstName',
    );
    expect(result).toEqual(expected);
  });
});
