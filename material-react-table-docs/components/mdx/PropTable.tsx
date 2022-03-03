import { Link } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import React, { useMemo } from 'react';

const PropTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Prop',
        accessor: 'prop' as const,
      },
      {
        Header: 'Type',
        accessor: 'type' as const,
      },
      {
        Header: 'Default',
        accessor: 'default' as const,
      },
      {
        Header: 'Description',
        accessor: 'description' as const,
      },
      {
        Header: 'Link to more info',
        accessor: 'link' as const,
        Cell: (cell: any) => (
          <Link href={cell.value} target="_blank">
            {cell.row.original.linkText}
          </Link>
        ),
      },
    ],
    [],
  );

  const data = useMemo(
    () => [
      {
        prop: 'columns',
        type: 'Array<Column>',
        default: null,
        description: 'react-table columns definition',
        link: 'https://react-table.tanstack.com/docs/api/useTable#column-options',
        linkText: 'react-table column api docs',
      },
      {
        prop: 'data',
        type: 'Array<any>',
        default: null,
        description: 'An array of your data objects',
        link: '/docs/usage',
        linkText: 'MRT usage docs',
      },
      {
        prop: 'disableColumnActions',
        type: 'boolean',
        default: null,
        description: 'Hide column action buttons in table head cells',
      },
      {
        prop: 'disableColumnHiding',
        type: 'boolean',
        default: null,
        description:
          'Hide the toggle show/hide columns button in toolbar and column actions menu',
      },
      {
        prop: 'disableDensePaddingToggle',
        type: 'boolean',
        default: null,
        description: 'Hide the toggle dense padding button in toolbar',
      },
      {
        prop: 'disableExpandAll',
        type: 'boolean',
        default: null,
        description: 'Hide the expand all rows button in head row',
      },
      {
        prop: 'disableFullScreenToggle',
        type: 'boolean',
        default: null,
        description: 'Hide the toggle full screen button in toolbar',
      },
      {
        prop: 'disableSelectAll',
        type: 'boolean',
        default: null,
        description: 'Hide the toggle select all checkbox in header row',
      },
      {
        prop: 'disableSubRowTree',
        type: 'boolean',
        default: null,
        description: 'Hide the expand/collapse sub rows button in every row',
      },
      {
        prop: 'enableRowNumbers',
        type: 'boolean',
        default: null,
        description: 'Show row numbers in the first column',
        link: '/docs/guides/row-numbers',
        linkText: 'MRT row numbers docs',
      },
      {
        prop: 'enableColumnGrouping',
        type: 'boolean',
        default: null,
        description: 'Enable the column grouping feature',
        link: '/docs/guides/column-grouping',
        linkText: 'MRT column grouping docs',
      },
      {
        prop: 'enableColumnResizing',
        type: 'boolean',
        default: null,
        description: 'Enable the column resizing feature',
        link: '/docs/guides/column-resizing',
        linkText: 'MRT column resizing docs',
      },
      {
        prop: 'enableRowActions',
        type: 'boolean',
        default: null,
        description: 'Enable row actions menu button in each row',
        link: '/docs/guides/row-actions',
        linkText: 'MRT row actions docs',
      },
      {
        prop: 'enableRowEditing',
        type: 'boolean',
        default: null,
        description: 'Enable row edit button in each row',
        link: '/docs/guides/row-editing',
        linkText: 'MRT row editing docs',
      },
      {
        prop: 'enableRowSelection',
        type: 'boolean',
        default: null,
        description: 'Enable row selection checkboxes in each row',
        link: '/docs/guides/row-selection',
        linkText: 'MRT row selection docs',
      },
      {
        prop: 'hideTabbleFooter',
        type: 'boolean',
        default: null,
        description: 'Hide the table footer rows (not toolbar with pagination)',
      },
      {
        prop: 'hideTableHead',
        type: 'boolean',
        default: null,
        description: 'Hide the table head rows',
      },
      {
        prop: 'hideToolbarBottom',
        type: 'boolean',
        default: null,
        description:
          'Hide the toolbar at the below the table (also hides bottom pagination)',
      },
      {
        prop: 'hideToolbarInternalActions',
        type: 'boolean',
        default: null,
        description:
          'Hide all 5 of the default action icon buttons in top toolbar',
      },
      {
        prop: 'hideToolbarTop',
        type: 'boolean',
        default: null,
        description:
          'Hide the toolbar at the above the table (also hides action buttons in toolbar)',
      },
      {
        prop: 'icons',
        type: 'MRT_Icons',
        default: null,
        description: 'Override the default Mui icons',
        link: '/docs/guides/customize-icons',
        linkText: 'MRT customize icons docs',
      },
    ],
    [],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      manualPagination
      hideToolbarBottom
      initialState={{
        sortBy: [{ id: 'prop', desc: false }],
        hiddenColumns: ['default'],
        showSearch: true,
        densePadding: true,
      }}
    />
  );
};

export default PropTable;
