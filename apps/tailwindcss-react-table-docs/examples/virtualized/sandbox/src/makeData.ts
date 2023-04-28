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
    firstName: faker.name.firstName(),
    middleName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    address: faker.address.streetAddress(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    petName: faker.animal.cat(),
    age: faker.datatype.float({ min: 0, max: 100 }),
    salary: faker.datatype
      .float({ min: 0, max: 1000000 })
      .toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    dateOfBirth: faker.date.past().toDateString(),
    dateOfJoining: faker.date.past().toDateString(),
    isActive: faker.datatype.boolean() ? 'Active' : 'Inactive',
  }));
