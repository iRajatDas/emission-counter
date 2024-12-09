import { faker } from "@faker-js/faker";

export const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 10_000; i++) {
    data.push({
      id: faker.string.uuid(),
      description: faker.company.catchPhrase(),
      scope: faker.helpers.arrayElement(["Scope 1", "Scope 2", "Scope 3"]),
      emission: parseFloat(
        faker.finance.amount({
          min: 10,
          max: 1000,
        })
      ), // random kg CO2-e
      date: faker.date.past({ years: 2 })
    });
  }
  return data;
};
