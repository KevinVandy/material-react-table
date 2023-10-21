import { faker } from '@faker-js/faker';

export type Person = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  petName: string;
  age: number;
  salary: string;
  dateOfBirth: string;
  dateOfJoining: string;
  isActive: string;
};

export const makeData = (numberOfRows: number) =>
  [...Array(numberOfRows).fill(null)].map(() => ({
    firstName: faker.person.firstName(),
    middleName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    zipCode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    petName: faker.animal.cat(),
    age: faker.number.float({ min: 0, max: 100 }),
    salary: faker.number
      .float({ min: 0, max: 1000000 })
      .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    dateOfBirth: faker.date.past({ years: 50 }).toDateString(),
    dateOfJoining: faker.date.past({ years: 20 }).toDateString(),
    isActive: faker.datatype.boolean() ? 'Active' : 'Inactive',
  }));
