import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Link } from '@mui/material';

const RootPropTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Prop',
        accessor: 'prop' as const,
        Cell: (cell: any) =>
          cell.row.original.required ? (
            <strong>{cell.value}*</strong>
          ) : (
            cell.value
          ),
      },
      { Header: 'Type', accessor: 'type' as const, disableFilters: true },
      { Header: 'Default', accessor: 'default' as const, disableFilters: true },
      {
        Header: 'Link to more info',
        accessor: 'link' as const,
        disableFilters: true,
        Cell: (cell: any) => (
          <Link href={cell.value} target="_blank">
            {' '}
            {cell.row.original.linkText}{' '}
          </Link>
        ),
      },
      { Header: 'Description', accessor: 'description' as const },
    ],
    [],
  );

  const data = useMemo(
    () => [
      {
        prop: 'columns',
        type: 'Array<MRT_Column>',
        description: 'react-table column definitions',
        link: 'https://react-table.tanstack.com/docs/api/useTable#column-options',
        linkText: 'react-table column api docs',
        required: true,
        // subRows: [
        //   {
        //     prop: 'Header',
        //     type: 'string',
        //     description: 'String that is used as the header for this column',
        //   },
        // ],
      },
      {
        prop: 'data',
        type: 'Array<any>',
        description: 'An array of your data objects',
        link: '/docs/usage',
        linkText: 'MRT usage docs',
        required: true,
      },
      {
        prop: 'disableColumnActions',
        type: 'boolean',
        description: 'Hide column action buttons in table head cells',
      },
      {
        prop: 'disableColumnHiding',
        type: 'boolean',
        description:
          'Hide the toggle show/hide columns button in toolbar and column actions menu',
      },
      {
        prop: 'disableDensePaddingToggle',
        type: 'boolean',
        description: 'Hide the toggle dense padding button in toolbar',
      },
      {
        prop: 'disableExpandAll',
        type: 'boolean',
        description: 'Hide the expand all rows button in head row',
      },
      {
        prop: 'disableFullScreenToggle',
        type: 'boolean',
        description: 'Hide the toggle full screen button in toolbar',
      },
      {
        prop: 'disableSelectAll',
        type: 'boolean',
        description: 'Hide the toggle select all checkbox in header row',
      },
      {
        prop: 'disableSubRowTree',
        type: 'boolean',
        description: 'Hide the expand/collapse sub rows button in every row',
      },
      {
        prop: 'enableRowNumbers',
        type: 'boolean',
        description: 'Show row numbers in the first column',
        link: '/docs/guides/row-numbers',
        linkText: 'MRT row numbers docs',
      },
      {
        prop: 'enableColumnGrouping',
        type: 'boolean',
        description: 'Enable the column grouping feature',
        link: '/docs/guides/column-grouping',
        linkText: 'MRT column grouping docs',
      },
      {
        prop: 'enableColumnResizing',
        type: 'boolean',
        description: 'Enable the column resizing feature',
        link: '/docs/guides/column-resizing',
        linkText: 'MRT column resizing docs',
      },
      {
        prop: 'enableRowActions',
        type: 'boolean',
        description: 'Enable row actions menu button in each row',
        link: '/docs/guides/row-actions',
        linkText: 'MRT row actions docs',
      },
      {
        prop: 'enableRowEditing',
        type: 'boolean',
        description: 'Enable row edit button in each row',
        link: '/docs/guides/row-editing',
        linkText: 'MRT row editing docs',
      },
      {
        prop: 'enableRowSelection',
        type: 'boolean',
        description: 'Enable row selection checkboxes in each row',
        link: '/docs/guides/row-selection',
        linkText: 'MRT row selection docs',
      },
      {
        prop: 'hideTabbleFooter',
        type: 'boolean',
        description: 'Hide the table footer rows (not toolbar with pagination)',
      },
      {
        prop: 'hideTableHead',
        type: 'boolean',
        description: 'Hide the table head rows',
      },
      {
        prop: 'hideToolbarBottom',
        type: 'boolean',
        description:
          'Hide the toolbar at the below the table (also hides bottom pagination)',
      },
      {
        prop: 'hideToolbarInternalActions',
        type: 'boolean',
        description:
          'Hide all 5 of the default action icon buttons in top toolbar',
      },
      {
        prop: 'hideToolbarTop',
        type: 'boolean',
        description:
          'Hide the toolbar at the above the table (also hides action buttons in toolbar)',
      },
      {
        prop: 'icons',
        type: 'MRT_Icons',
        description: 'Override the default Mui icons',
        link: '/docs/guides/customize-icons',
        linkText: 'MRT customize icons docs',
      },
      {
        prop: 'idPrefix',
        type: 'string',
        description:
          'Manually set a prefix for all html ids in the table. (Otherwise randomly generated)',
      },
      {
        prop: 'initialState',
        type: 'MRT_InitialState',
        default: '{}',
        description:
          'Give the table a custom initial state. Useful for persisting state',
      },
      {
        prop: 'isFetching',
        type: 'boolean',
        description:
          'Shows a linear progress bar while data is loading or refreshing',
      },
      {
        prop: 'isLoading',
        type: 'boolean',
        description:
          'Shows skeleton loaders in table while data is loading for the first time',
      },
      {
        prop: 'localization',
        type: 'MRT_Localization',
        description:
          'Override any of the default english strings to whatever you want',
      },
      {
        prop: 'muiSearchTextFieldProps',
        type: 'MUI TextFieldProps',
        description:
          'Pass in custom props to the Mui TextField for the search input',
        link: 'https://mui.com/api/text-field',
        linkText: 'Mui TextField API docs',
      },
      {
        prop: 'muiTableBodyCellEditTextFieldProps',
        type: 'MUI TextFieldProps',
        description:
          'Pass in custom props to the Mui TextField for editable cells',
        link: 'https://mui.com/api/text-field',
        linkText: 'Mui TextField API docs',
      },
      {
        prop: 'muiTableBodyCellProps',
        type: '(cell) => MUI TableCellProps',
        description:
          'Pass in custom props to every Mui TableBodyCell. Also available within the columns definition',
        link: 'https://mui.com/api/table-cell',
        linkText: 'Mui TableCell API docs',
      },
      {
        prop: 'muiTableBodyProps',
        type: '(tableInstance) => MUI TableBodyProps',
        description: 'Pass in custom props to the Mui TableBody',
        link: 'https://mui.com/api/table-body',
        linkText: 'Mui TableBody API docs',
      },
      {
        prop: 'muiTableBodyRowProps',
        type: '(row) => MUI TableRowProps',
        description: 'Pass in custom props to every Mui TableBodyRow',
        link: 'https://mui.com/api/table-row',
        linkText: 'Mui TableRow API docs',
      },
      {
        prop: 'muiTableContainerProps',
        type: '(tableInstance) => MUI TableContainerProps',
        description: 'Pass in custom props to the Mui TableContainer',
        link: 'https://mui.com/api/table-container',
        linkText: 'Mui TableContainer API docs',
      },
      {
        prop: 'muiTableDetailPanelProps',
        type: '(row) => MUI TableCellProps',
        description:
          'Pass in custom props to container element created for renderDetailPanel',
        link: 'https://mui.com/api/table-cell',
        linkText: 'Mui TableCell API docs',
      },
      {
        prop: 'muiTableFooterCellProps',
        type: '(column) => MUI TableCellProps',
        description:
          'Pass in custom props to every Mui TableFooterCell. Also available within the columns definition',
        link: 'https://mui.com/api/table-cell',
        linkText: 'Mui TableCell API docs',
      },
      {
        prop: 'muiTableFooterProps',
        type: '(tableInstance) => MUI TableFooterProps',
        description: 'Pass in custom props to the Mui TableFooter',
        link: 'https://mui.com/api/table-footer',
        linkText: 'Mui TableFooter API docs',
      },
      {
        prop: 'muiTableFooterRowProps',
        type: '(footerGroup) => MUI TableRowProps',
        description: 'Pass in custom props to every Mui TableFooterRow',
        link: 'https://mui.com/api/table-row',
        linkText: 'Mui TableRow API docs',
      },
      {
        prop: 'muiTableHeadCellFilterTextFieldProps',
        type: '(column) => MUI TextFieldProps',
        description:
          'Pass in custom props to the Mui TextField for the filter input in every column header. Also available within the columns definition',
        link: 'https://mui.com/api/text-field',
        linkText: 'Mui TextField API docs',
      },
      {
        prop: 'muiTableHeadCellProps',
        type: '(column) => MUI TableCellProps',
        description:
          'Pass in custom props to every Mui TableHeadCell. Also available within the columns definition.',
        link: 'https://mui.com/api/table-cell',
        linkText: 'Mui TableCell API docs',
      },
      {
        prop: 'muiTableHeadProps',
        type: '(tableInstance) => MUI TableHeadProps',
        description: 'Pass in custom props to the Mui TableHead',
        link: 'https://mui.com/api/table-head',
        linkText: 'Mui TableHead API docs',
      },
      {
        prop: 'muiTableHeadRowProps',
        type: '(row) => MUI TableRowProps',
        description: 'Pass in custom props to every Mui TableHeadRow',
        link: 'https://mui.com/api/table-row',
        linkText: 'Mui TableRow API docs',
      },
      {
        prop: 'muiTablePaginationProps',
        type: '(tableInstance) => MUI TablePaginationProps',
        description: 'Pass in custom props to the Mui TablePagination',
        link: 'https://mui.com/api/table-pagination',
        linkText: 'Mui TablePagination API docs',
      },
      {
        prop: 'muiTableProps',
        type: '(tableInstance) => MUI TableProps',
        description: 'Pass in custom props to the Mui Table',
        link: 'https://mui.com/api/table',
        linkText: 'Mui Table API docs',
      },
      {
        prop: 'muiTableToolbarAlertBannerProps',
        type: '(tableInstance) => MUI AlertProps',
        description:
          'Pass in custom props to the Mui Alert that appears in the toolbar',
        link: 'https://mui.com/api/alert',
        linkText: 'Mui Alert API docs',
      },
      {
        prop: 'muiTableToolbarBottomProps',
        type: '(tableInstance) => MUI ToolbarProps',
        description:
          'Pass in custom props to the Mui TableToolbar at the bottom of the table',
        link: 'https://mui.com/api/toolbar',
        linkText: 'Mui Toolbar API docs',
      },
      {
        prop: 'muiTableToolbarTopProps',
        type: '(tableInstance) => MUI ToolbarProps',
        description:
          'Pass in custom props to the Mui TableToolbar at the top of the table',
        link: 'https://mui.com/api/toolbar',
        linkText: 'Mui Toolbar API docs',
      },
      {
        prop: 'onCellClick',
        type: '(event, cell) => void',
        description: 'Callback for when a cell is clicked',
      },
      {
        prop: 'onColumnHide',
        type: '(column, visibleColumns) => void',
        description: 'Callback for when a column is hidden',
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
        densePadding: true,
        hiddenColumns: ['default'],
        showFilters: true,
        showSearch: true,
        sortBy: [{ id: 'prop', desc: false }],
      }}
    />
  );
};

export default RootPropTable;
