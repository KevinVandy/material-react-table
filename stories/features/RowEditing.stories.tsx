import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';

const meta: Meta = {
  title: 'Features/Row Editing Examples',
  parameters: {
    status: {
      type: 'alpha',
    },
  },
};

export default meta;

const data = [...Array(10)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const RowEditingEnabled: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow = async (row: any) => {
    tableData[+row.index] = row.values;
    setTableData([...tableData]);
  };

  return (
    <MaterialReactTable
      columns={[
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
          editable: true,
          editValidator: (value) => {
            if (value.length === 0) return 'First name is required';
            return true;
          },
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
          editable: true,
          editValidator: (value) => {
            if (value.length === 0) return 'Last name is required';
            return true;
          },
        },
        {
          Header: 'Address',
          accessor: 'address' as const,
          editable: true,
        },
        {
          Header: 'State',
          accessor: 'state' as const,
          editable: true,
          editValidator: (value) => {
            //test if state is valid
            if (value.length === 0) return 'State is required';
            const validStates = ['Nebraska', 'Virginia', 'Indiana'];
            if (!validStates.includes(value)) return 'That is not a cool state';
            return true;
          },
        },
        {
          Header: 'Phone Number',
          accessor: 'phoneNumber' as const,
          editable: true,
          editValidator: (value) => {
            if (value.length === 0) return 'Phone number is required';
            if (!value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)) return 'Invalid phone number';
            return true;
          },
        },
      ]}
      data={tableData}
      onSaveRow={handleSaveRow}
      enableRowActions
      enableRowEditing
      onRowEditSubmit={handleSaveRow}
    />
  );
};

export const RowEditingEnabledAsync: Story<MaterialReactTableProps> = () => {
  const [tableData, setTableData] = useState(data);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRow = async (row) => {
    setIsSaving(true);
    await setTimeout(() => {
      tableData[+row.index] = row.values;
      setTableData([...tableData]);
      setIsSaving(false);
    }, 1500);
  };

  return (
    <MaterialReactTable
      columns={[
        {
          Header: 'First Name',
          accessor: 'firstName' as const,
          editable: true,
          editValidator: (value) => {
            if (value.length === 0) return 'First name is required';
            return true;
          },
        },
        {
          Header: 'Last Name',
          accessor: 'lastName' as const,
          editable: true,
          editValidator: (value) => {
            if (value.length === 0) return 'Last name is required';
            return true;
          },
        },
        {
          Header: 'Address',
          accessor: 'address' as const,
          editable: true,
        },
        {
          Header: 'State',
          accessor: 'state' as const,
          editable: true,
          editValidator: (value) => {
            //test if state is valid
            if (value.length === 0) return 'State is required';
            const validStates = ['Nebraska', 'Virginia', 'Indiana'];
            if (!validStates.includes(value)) return 'That is not a cool state';
            return true;
          },
        },
        {
          Header: 'Phone Number',
          accessor: 'phoneNumber' as const,
          editable: true,
          editValidator: (value) => {
            if (value.length === 0) return 'Phone number is required';
            if (!value.match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)) return 'Invalid phone number';
            return true;
          },
        },
      ]}
      data={tableData}
      enableRowActions
      enableRowEditing
      isFetching={isSaving}
      onRowEditSubmit={handleSaveRow}
    />
  );
};
