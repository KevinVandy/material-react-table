import { useState } from 'react';
import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {
  type MRT_TableOptions,
  MaterialReactTable,
  createRow,
} from '../../src';
import { faker } from '@faker-js/faker';
import { type Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Features/Creating Examples',
};

export default meta;

type Person = {
  address: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  state: string;
};

const data: Person[] = [...Array(100)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  state: faker.location.state(),
}));

const expandingData = [...Array(5)].map(() => ({
  address: faker.location.streetAddress(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phoneNumber: faker.phone.number(),
  subRows: [...Array(faker.number.int(4))].map(() => ({
    address: faker.location.streetAddress(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number(),
    subRows: [...Array(3)].map(() => ({
      address: faker.location.streetAddress(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phoneNumber: faker.phone.number(),
      subRows: [...Array(2)].map(() => ({
        address: faker.location.streetAddress(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.phone.number(),
      })),
    })),
  })),
}));

export const CreateRowIndexTop = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MaterialReactTable
      columns={[
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
        {
          accessorKey: 'address',
          header: 'Address',
        },
        {
          accessorKey: 'state',
          header: 'State',
        },
        {
          accessorKey: 'phoneNumber',
          enableEditing: false,
          header: 'Phone Number',
        },
      ]}
      createDisplayMode="row"
      data={tableData}
      editDisplayMode="row"
      enableEditing
      onCreatingRowSave={() => {}}
      onEditingRowSave={handleSaveRow}
      positionCreatingRow="top"
      renderTopToolbarCustomActions={({ table }) => (
        <Button onClick={() => table.setCreatingRow(true)}>Add</Button>
      )}
    />
  );
};

export const CreateRowIndexBottom = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MaterialReactTable
      columns={[
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
        {
          accessorKey: 'address',
          header: 'Address',
        },
        {
          accessorKey: 'state',
          header: 'State',
        },
        {
          accessorKey: 'phoneNumber',
          enableEditing: false,
          header: 'Phone Number',
        },
      ]}
      createDisplayMode="row"
      data={tableData}
      editDisplayMode="row"
      enableEditing
      onCreatingRowSave={() => {}}
      onEditingRowSave={handleSaveRow}
      positionCreatingRow="bottom"
      renderTopToolbarCustomActions={({ table }) => (
        <Button onClick={() => table.setCreatingRow(true)}>Add</Button>
      )}
    />
  );
};

export const CreateRowIndexIndex = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MaterialReactTable
      columns={[
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
        {
          accessorKey: 'address',
          header: 'Address',
        },
        {
          accessorKey: 'state',
          header: 'State',
        },
        {
          accessorKey: 'phoneNumber',
          enableEditing: false,
          header: 'Phone Number',
        },
      ]}
      createDisplayMode="row"
      data={tableData}
      editDisplayMode="row"
      enableEditing
      onCreatingRowSave={() => {}}
      onEditingRowSave={handleSaveRow}
      positionCreatingRow={5}
      renderTopToolbarCustomActions={({ table }) => (
        <Button onClick={() => table.setCreatingRow(true)}>Add</Button>
      )}
    />
  );
};

export const CreateRowIndexIndexVirtualized = () => {
  const [tableData, setTableData] = useState(data);

  const handleSaveRow: MRT_TableOptions<Person>['onEditingRowSave'] = ({
    exitEditingMode,
    row,
    values,
  }) => {
    tableData[row.index] = values;
    setTableData([...tableData]);
    exitEditingMode();
  };

  return (
    <MaterialReactTable
      columns={[
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
        {
          accessorKey: 'address',
          header: 'Address',
        },
        {
          accessorKey: 'state',
          header: 'State',
        },
        {
          accessorKey: 'phoneNumber',
          enableEditing: false,
          header: 'Phone Number',
        },
      ]}
      createDisplayMode="row"
      data={tableData}
      editDisplayMode="row"
      enableEditing
      enableRowVirtualization
      onCreatingRowSave={() => {}}
      onEditingRowSave={handleSaveRow}
      positionCreatingRow={5}
      renderTopToolbarCustomActions={({ table }) => (
        <Button onClick={() => table.setCreatingRow(true)}>Add</Button>
      )}
    />
  );
};

export const CreateRowIndexIndexExpanding = () => {
  const [creatingRowIndex, setCreatingRowIndex] = useState<
    number | undefined
  >();

  return (
    <MaterialReactTable
      columns={[
        {
          accessorKey: 'firstName',
          header: 'First Name',
        },
        {
          accessorKey: 'lastName',
          header: 'Last Name',
        },
        {
          accessorKey: 'address',
          header: 'Address',
        },
        {
          accessorKey: 'phoneNumber',
          enableEditing: false,
          header: 'Phone Number',
        },
      ]}
      createDisplayMode="row"
      data={expandingData}
      editDisplayMode="row"
      enableEditing
      enableExpanding
      initialState={{ expanded: true }}
      onCreatingRowSave={() => {}}
      positionCreatingRow={creatingRowIndex}
      renderRowActions={({ row, staticRowIndex, table }) => {
        return (
          <IconButton
            onClick={() => {
              setCreatingRowIndex((staticRowIndex || 0) + 1);
              table.setCreatingRow(
                createRow(
                  table,
                  {
                    address: '',
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    subRows: [],
                  },
                  -1,
                  row.depth + 1,
                ),
              );
            }}
          >
            <Add />
          </IconButton>
        );
      }}
      renderTopToolbarCustomActions={({ table }) => (
        <Button
          onClick={() => {
            setCreatingRowIndex(0);
            table.setCreatingRow(true);
          }}
        >
          Add
        </Button>
      )}
    />
  );
};
