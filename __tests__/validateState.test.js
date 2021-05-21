const validateState = require('../src/validateState');

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
