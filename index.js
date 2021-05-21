const fetchGovernors = require('./src/fetchGovernors');

(async () => {
  try {
    const args = process.argv.slice(2);
    const states = args[0].replace(/\s+/g, '').split(',');
    const sortBy = args[1] ? args[1] : 'state';

    const governors = await fetchGovernors(states, sortBy);

    console.log({ governors });
  } catch (error) {
    console.error('An Error Occurred', error);
  }
})();
