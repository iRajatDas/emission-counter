### Project Intro:

The project is an emission counter. It allows users to add emission entries for any business operations and they should be able to see the results in table form and a chart.

### Requirements:

- Users should be able to add emission entries, it should accept these values:
  - Description
  - Scope (select→ Scope 1, Scope 2, Scope 3)
  - Emission (number, kg CO2-e)
  - Date
- Users should be able to view results through:
  - A table list view of all data entries
    - Bonus 1:
      - Allow editing of each data entry
  - A bar chart for total emissions for each month of the year
    - Bonus 2: Add a toggle switch to make each bar on the chart stacked based on Scope
    - Bonus 3: Add a dropdown that filters by Scope
- Bonus 4:
  - Treat your CRUD operations as if they were real API endpoints. No need to create an actual backend. Data persistence does not matter, can be in local storage or just in memory. Our only aim here is to see how you handle API integration.

Note:

- These two features can be on the same page or different page.
- There’s no need for a backend. Firebase or mock data or anything else can be used, it is your decision. You will not be evaluated for backend work as long as the requirements are met.
- No need to include automated testing or any other bonus features not specified in the spec. We value more on feature completeness and how you actually code.
- UI and graph library can be any of your choice.
- This project needs to be done in React.

Please submit this along with instructions to run the project if any needed. Please also add 10,000 rows of mock data for us to test.

<!-- checklist -->

### Completed Tasks:

- [x] Add emission entries
- [x] View results in table form
- [x] View results in chart form
- [x] Allow editing of each data entry
- [x] Add a toggle switch to make each bar on the chart stacked based on Scope
- [x] Add a dropdown that filters by Scope
