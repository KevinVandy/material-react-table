import { faker } from '@faker-js/faker';

export type Person = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
};

export const makeData = (numberOfRows: number) =>
  [...Array(numberOfRows).fill(null)].map(() => ({
    firstName: faker.person.firstName(),
    middleName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    zipCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  }));
