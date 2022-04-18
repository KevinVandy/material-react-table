import React from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Styling/Style Table Body Cells',
};

export default meta;

const columns = [
  {
    header: 'First Name',
    id: 'firstName',
  },
  {
    header: 'Last Name',
    id: 'lastName',
  },
  {
    header: 'Age',
    id: 'age',
  },
  {
    header: 'Address',
    id: 'address',
  },
];
const data = [...Array(21)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number(80),
  address: faker.address.streetAddress(),
}));

export const DefaultTableBodyCellStyles: Story<
  MaterialReactTableProps
> = () => <MaterialReactTable columns={columns} data={data} />;

export const StyleAllMuiTableBodyCell: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={columns}
    data={data}
    muiTableBodyCellProps={{
      sx: {
        backgroundColor: 'rgba(52, 210, 235, 0.1)',
        borderRight: '1px solid rgba(224,224,224,1)',
      },
    }}
  />
);

export const StyleMuiTableBodyCellConditionallyIn1Column: Story<
  MaterialReactTableProps
> = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'First Name',
        id: 'firstName',
      },
      {
        header: 'Last Name',
        id: 'lastName',
      },
      {
        header: 'Age',
        id: 'age',
        muiTableBodyCellProps: ({ cell }) => ({
          sx: {
            backgroundColor:
              cell.value > 40 ? 'rgba(22, 184, 44, 0.5)' : undefined,
            fontWeight:
              cell.column.id === 'age' && cell.value > 40 ? '700' : '400',
          },
        }),
      },
      {
        header: 'Address',
        id: 'address',
      },
    ]}
    data={data}
  />
);

export const CustomCellRender: Story<MaterialReactTableProps> = () => (
  <MaterialReactTable
    columns={[
      {
        header: 'First Name',
        id: 'firstName',
        Cell: ({ cell }) => (
          <span style={{ fontStyle: 'italic' }}>{cell.value}</span>
        ),
      },
      {
        header: 'Last Name',
        id: 'lastName',
        Cell: ({ cell }) => <span style={{ color: 'red' }}>{cell.value}</span>,
      },
      {
        header: 'Age',
        id: 'age',
        Cell: ({ cell }) => (
          <span
            style={{
              fontStyle: 'italic',
              padding: '0.5rem',
              backgroundColor:
                cell.column.id === 'age' && cell.value > 40
                  ? 'rgba(22, 184, 44, 0.5)'
                  : undefined,
            }}
          >
            {cell.value}
          </span>
        ),
      },
      {
        header: 'Address',
        id: 'address',
      },
    ]}
    data={data}
  />
);
