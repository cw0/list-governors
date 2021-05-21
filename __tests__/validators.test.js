const {
  validateState,
  validateStates,
  validateSortBy,
} = require('../src/validators');

describe('validateState tests', () => {
  it('should fail if no input provided', () => {
    expect(validateState).toThrow('No State abbreviation provided');
  });

  it('should fail if not provided with a valid abbreviation', () => {
    const callValidateState = () => {
      return validateState(42);
    };
    expect(callValidateState).toThrow(
      'State abbreviation must be a string',
    );
  });

  it('should fail if input length !== 2', () => {
    const callValidateState = () => {
      return validateState('usa');
    };
    expect(callValidateState).toThrow(
      'State abbreviation must be 2 characters',
    );
  });

  it('should pass if valid input is provided', () => {
    const result = validateState('ga');
    expect(result).toBe(true);
  });
});

describe('validateStates tests', () => {
  it('should throw an exception if no list of states provided', () => {
    expect(validateStates).toThrow('No States provided');
  });
  it('should throw exception if typeof states is not a list', () => {
    const callValidateStates = () => {
      return validateStates('ga,ca,ny');
    };
    expect(callValidateStates).toThrow(
      'States should be provided as an array',
    );
  });
  it('should throw exception if one of the states in the list is invalid', () => {
    const callValidateStates = () => {
      return validateStates(['ny', 'ga', 42]);
    };
    expect(callValidateStates).toThrow(
      'State abbreviation must be a string',
    );
  });

  describe('validateSortByTest', () => {
    it('should throw an exception if no sort field is specified', () => {
      expect(validateSortBy).toThrow('No sort by field specified');
    });
    it('should throw an exception if the provided value is not a string', () => {
      const callValidateSortBy = () => {
        return validateSortBy(42);
      };
      expect(callValidateSortBy).toThrow(
        'Sort type must be a string',
      );
    });
    it('should throw an exception if an invalid field name is provided', () => {
      const callValidateSortBy = () => {
        return validateSortBy('ohno');
      };
      expect(callValidateSortBy).toThrow(
        'Invalid sort by field specified',
      );
    });
    it('should return true if valid sort by input received', () => {
      expect(validateSortBy('lastName')).toBe(true);
    });
  });
});
