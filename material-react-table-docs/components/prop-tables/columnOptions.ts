import { MRT_ColumnDef } from 'material-react-table';

export type ColumnOption = {
  columnOption: keyof MRT_ColumnDef;
  defaultValue?: string;
  description?: string;
  link?: string;
  linkText?: string;
  required?: boolean;
  source?: 'MRT' | 'TanStack Table' | 'MUI' | '';
  type?: string;
};

export const columnOptions: ColumnOption[] = [
  {
    columnOption: 'Cell',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    required: false,
    type: 'ReactNode | (({ cell, tableInstance }) => ReactNode)',
  },
  {
    columnOption: 'Edit',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    required: false,
    type: 'ReactNode | (({ cell, tableInstance }) => ReactNode)',
  },
  {
    columnOption: 'Filter',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    required: false,
    type: 'ReactNode | (({ header, tableInstance }) => ReactNode)',
  },
  {
    columnOption: 'Footer',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    required: false,
    type: 'ReactNode | (({ footer, tableInstance }) => ReactNode)',
  },
  {
    columnOption: 'Header',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    source: 'MRT',
    required: false,
    type: 'ReactNode | (({ header, tableInstance }) => ReactNode)',
  },
  {
    columnOption: 'accessorFn',
    defaultValue: '',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/core/column-def#accessorfn',
    linkText: 'TanStack Table ColumnDef Docs',
    source: 'TanStack Table',
    required: false,
    type: '(row: D) => any',
  },
  {
    columnOption: 'accessorKey',
    defaultValue: '',
    description:
      'If provided, the accessorKey will be used to point to which key in the data object should be used to access the data in this column.',
    link: 'https://tanstack.com/table/v8/docs/api/core/column-def#accessorfn',
    linkText: 'TanStack Table ColumnDef Docs',
    source: 'TanStack Table',
    required: false,
    type: 'string & keyof D',
  },
  {
    columnOption: 'aggregatedCell',
    defaultValue: '',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/grouping#aggregatedcell',
    linkText: 'TanStack Table ColumnDef Docs',
    source: 'TanStack Table',
    required: false,
    type: '',
  },
  {
    columnOption: 'aggregationFn',
    defaultValue: '',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/features/grouping#aggregationfn-1',
    linkText: 'TanStack Table ColumnDef Docs',
    source: 'TanStack Table',
    required: false,
    type: '',
  },
  {
    columnOption: 'cell',
    defaultValue: '',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/core/column-def#cell',
    linkText: 'TanStack Table ColumnDef Docs',
    source: 'TanStack Table',
    required: false,
    type: '',
  },
  {
    columnOption: 'header',
    defaultValue: '',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/core/column-def#header',
    linkText: 'TanStack Table ColumnDef Docs',
    source: 'TanStack Table',
    required: true,
    type: 'string',
  },
  {
    columnOption: 'id',
    defaultValue: '',
    description: '',
    link: 'https://tanstack.com/table/v8/docs/api/core/column-def#id',
    linkText: 'TanStack Table ColumnDef Docs',
    source: 'TanStack Table',
    required: true,
    type: 'string',
  },
];
