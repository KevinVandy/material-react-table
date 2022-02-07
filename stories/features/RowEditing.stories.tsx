import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';
import { MenuItem as MuiMenuItem, styled } from '@mui/material';

const MenuItem = styled(MuiMenuItem)({
  display: 'flex',
  gap: '0.75rem',
});

const meta: Meta = {
  title: 'Features/Row Editing Examples',
  parameters: {
    status: {
      type: 'alpha',
    },
  },
};

export default meta;

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName' as const,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName' as const,
  },
  {
    Header: 'Address',
    accessor: 'address' as const,
  },
  {
    Header: 'State',
    accessor: 'state' as const,
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber' as const,
  },
];

const data = [...Array(10)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const RowEditingEnabled: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(() => data);

  const handleSaveRow = async (row: any) => {
    tableData[+row.index] = row.values;
    setTableData([...tableData]);
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      enableRowActions
      enableRowEditing
      onRowEditSubmit={handleSaveRow}
    />
  );
};

export const RowEditingEnabledAsync: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(() => data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRow = async (row) => {
    setIsSaving(true);
    console.log(row);
    //simulate backend api call
    await setTimeout(() => {
      tableData[+row.index] = row.values;
      setTableData([...tableData]);
      setIsSaving(false);
    }, 1500);
  };

  return (
    <MaterialReactTable
      columns={columns}
      data={tableData}
      enableRowActions
      enableRowEditing
      isFetching={isSaving}
      onRowEditSubmit={handleSaveRow}
    />
  );
};
