import React, { Fragment, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import MaterialReactTable, { MaterialReactTableProps } from '../../src';
import faker from '@faker-js/faker';
import { Button, MenuItem as MuiMenuItem, styled } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent'

const MenuItem = styled(MuiMenuItem)({
  display: 'flex',
  gap: '0.75rem',
});

const meta: Meta = {
  title: 'Features/Row Cell Click',
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
    header: 'Address',
    id: 'address',
  },
  {
    header: 'State',
    id: 'state',
  },
  {
    header: 'Phone Number',
    id: 'phoneNumber',
  },
];

const data = [...Array(10)].map((_) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.streetAddress(),
  state: faker.address.state(),
  phoneNumber: faker.phone.phoneNumber(),
}));

export const BasicRowClick: Story<MaterialReactTableProps> = () => {
  const [selected, setSelected] = useState(null)

  return (
    <Fragment>
      <MaterialReactTable
        columns={columns}
        data={data}
        onRowClick={({ event, row: { original }}) => {
          setSelected(original)
        }}
      />
      <Dialog
        open={selected}
        onClose={() => setSelected(null)}
      >
        <DialogContent>
          You clicked
          <pre>{JSON.stringify(selected)}</pre>
        </DialogContent>
      </Dialog>
    </Fragment>
)
};

export const BasicCellClick: Story<MaterialReactTableProps> = () => {
  const [selected, setSelected] = useState(null)

  return (
    <Fragment>
      <MaterialReactTable
        columns={columns}
        data={data}
        onCellClick={({ event, cell }) => {
          setSelected(cell)
        }}
      />
      <Dialog
        open={selected}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <DialogContent>
            You clicked cell {selected.getValue()}.
            <br/>
            In row:
            <pre>{JSON.stringify(selected.row)}</pre>
          </DialogContent>
        )}
      </Dialog>
    </Fragment>
)
};
