import React from 'react';
import { Meta } from '@storybook/react';
import TailwindCSSReactTable, {
  type TRT_ColumnDef,
} from 'tailwindcss-react-table';
import { faker } from '@faker-js/faker';

const meta: Meta = {
  title: 'Prop Playground',
  component: TailwindCSSReactTable,
};

export default meta;

const Template = (args: TailwindCSSReactTableProps<Person>) => (
  <TailwindCSSReactTable {...args} />
);

export const Default = Template.bind({});

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  address: string;
}

Default.args = {
  columns: [
    {
      header: 'First Name',
      accessorKey: 'firstName',
    },
    {
      header: 'Last Name',
      accessorKey: 'lastName',
    },
    {
      header: 'Age',
      accessorKey: 'age',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
  ] as TRT_ColumnDef<Person>[],
  data: [...Array(6)].map(() => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(80),
    address: faker.address.streetAddress(),
  })),
} as TailwindCSSReactTableProps<Person>;
