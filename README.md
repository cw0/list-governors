# list-governors

## Purpose:

To use the Google Civic Information API to look up the governor of each state provided. This module exposes 2 functions that can be imported by consuming services as well as a cli tool that can be used to test locally or implement as a a shell script.

## Setup

- Clone the repo and create a .env file with the following entry:
  - API_KEY=WHATEVER_YOUR_API_KEY_IS_HERE

## Functions:

- fetchGovernors
  - parameters
    - states: an array of state abbreviations (required)
    - sortBy: a string field name with a value of state, firstName, or lastName (optional)
  - output
    - governors: an object containing a list of governors sorted by the specified sort order descending
- fetchGovernor
  - parameters
    - state: a 2 letter string containing a state abbreviation
  - output
    - an object containing the firstName, lastName, and state of a governor

## Scripts

- `npm run test`
  - run jest unit tests
- `npm run fetchGovernors "stateAbbreviation1, stateAbbreviation2, ..." "sortByField"`
  - run the cli tool

## Notes

- I decided to implement the project as a simple module since the specs did not specify an exact implementation of the code required. I felt to go further would be a waste of resources since I would have to assume the client's wishes. In my experience this often leads to incorrect implementations and in a real environment I would want to speak with the stake holder to iron out the implementation details.
- Given more time I would have memoized the api results. I also would have added lodash or implemented stricter null checking when accessing fields multiple levels deep in the fetchGovernor function.

## Questions

1. Explain how you would schedule this this task to incrementally run and insert the data into a data warehouse.
   - In a production environment I would probably move toward using AWS Lambdas and step functions with s3 or dynamodb to store the results in a data warehouse. Step functions would abstract a lot of the state flow by mapping the state list to individual lambdas to check if we already have each value in dynamodb. If not it would call the fetchGovernor function as a lambda to look up and save it to dynamodb before returning the governor value. These tasks can easily be scheduled as a cron job though based on the long amount of time between governor changes, it would probably be best to make a lambda to find out when the next election for governor is approaching and schedule a lambda to update after the inauguration date passes.
2. Bonus How would you parametrize your query for semantic APIs that allow you to pass
   filtering information?
   - I would probably use AWS Neptune to save the results of these queries, either as a separate step function or glue ETL job. You could also capture the output of DynamoDB streams and pass them through a Lambda to insert the data into AWS Neptune. I would then expose a service layer using AWS API Gateway with Lambdas to run queries against neptune or perhaps AWS AppSync if the front end requirements require graphql
