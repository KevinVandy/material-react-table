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
    address: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
  }));
