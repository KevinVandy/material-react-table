import {
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MaterialReactTable,
} from '../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  component: MaterialReactTable,
  title: 'Prop Playground',
};

export default meta;

const Template = (args: MRT_TableOptions<Person>) => (
  <MaterialReactTable {...args} />
);

export const Default = Template.bind({});

interface Person {
  address: string;
  age: number;
  firstName: string;
  lastName: string;
}

// @ts-ignore
Default.args = {
  columns: [
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'age',
      header: 'Age',
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
  ] as MRT_ColumnDef<Person>[],
  data: [...Array(6)].map(() => ({
    address: faker.location.streetAddress(),
    age: faker.datatype.number(80),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  })),
} as MRT_TableOptions<Person>;
