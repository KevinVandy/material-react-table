import { type Meta } from '@storybook/react';
import { MaterialReactTable } from '../../src';

const meta: Meta = {
  title: 'Fixed Bugs/sticky-footer',
};

export default meta;

const mockData: any = [
  {
    no: 23,
    name: 'Michael Jeffrey Jordan',
    firstName: 'Michael',
    middleName: 'Jeffrey',
    lastName: 'Jordan',
    salary: 1030000,
    total: 86760000,
  },
  {
    no: 24,
    name: 'Kobe Bean Bryant',
    firstName: 'Kobe',
    middleName: 'Bean',
    lastName: 'Bryant',
    salary: 25000000,
    total: 328237108,
  },
  {
    no: 6,
    name: 'LeBron Raymone James',
    firstName: 'LeBron',
    middleName: 'Raymone',
    lastName: 'James',
    salary: 44474988,
    total: 431859107,
  },
  {
    no: 23,
    name: 'Michael Jeffrey Jordan',
    firstName: 'Michael',
    middleName: 'Jeffrey',
    lastName: 'Jordan',
    salary: 1030000,
    total: 86760000,
  },
  {
    no: 24,
    name: 'Kobe Bean Bryant',
    firstName: 'Kobe',
    middleName: 'Bean',
    lastName: 'Bryant',
    salary: 25000000,
    total: 328237108,
  },
  {
    no: 6,
    name: 'LeBron Raymone James',
    firstName: 'LeBron',
    middleName: 'Raymone',
    lastName: 'James',
    salary: 44474988,
    total: 431859107,
  },
  {
    no: 23,
    name: 'Michael Jeffrey Jordan',
    firstName: 'Michael',
    middleName: 'Jeffrey',
    lastName: 'Jordan',
    salary: 1030000,
    total: 86760000,
  },
  {
    no: 24,
    name: 'Kobe Bean Bryant',
    firstName: 'Kobe',
    middleName: 'Bean',
    lastName: 'Bryant',
    salary: 25000000,
    total: 328237108,
  },
  {
    no: 6,
    name: 'LeBron Raymone James',
    firstName: 'LeBron',
    middleName: 'Raymone',
    lastName: 'James',
    salary: 44474988,
    total: 431859107,
  },
];

const mockColumns: any = [
  {
    accessorKey: 'no',
    header: 'No. ',
    filterVariant: 'multi-select',
    size: 80,
    footer: 'SUM',
  },
  {
    accessorKey: 'name',
    header: 'NAME',
    size: 190,
  },
  {
    accessorKey: 'firstName',
    header: 'FIRST NAME',
  },
  {
    accessorKey: 'middleName',
    header: 'MIDDLE NAME',
    size: 150,
  },
  {
    accessorKey: 'lastName',
    header: 'LAST NAME',
  },
  {
    accessorKey: 'salary',
    header: 'SALARY',
    footer: '211514964',
  },
  {
    accessorKey: 'total',
    header: 'TOTAL',
    footer: '2540568645',
  },
];

export const PinnedColumnsWithStickyFooter = () => {
  return (
    <MaterialReactTable
      columns={mockColumns}
      data={mockData}
      enableColumnPinning
      enableStickyHeader
      enableStickyFooter
      muiTableContainerProps={{
        sx: { maxHeight: 300 },
      }}
      muiTableHeadCellProps={{
        align: 'center',
        sx: { borderLeft: '1px solid black' },
      }}
      muiTableBodyCellProps={{
        align: 'center',
        sx: { borderLeft: '1px solid black' },
      }}
      initialState={{ columnPinning: { left: ['no', 'name', 'firstName'] } }}
    />
  );
};
