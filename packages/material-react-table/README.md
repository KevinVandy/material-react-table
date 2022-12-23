# Material React Table

<a href="https://npmjs.com/package/material-react-table" target="_blank">
  <img alt="" src="https://badgen.net/npm/v/material-react-table?color=blue" />
</a>
<a href="https://npmtrends.com/material-react-table" target="_blank">
  <img alt="" src="https://badgen.net/npm/dt/material-react-table?label=installs&icon=npm&color=blue" />
</a>
<a href="https://bundlephobia.com/result?p=material-react-table" target="_blank">
  <img alt="" src="https://badgen.net/bundlephobia/minzip/material-react-table@latest?color=blue" />
</a>
<a href="https://star-history.com/#kevinvandy/material-react-table&Date" target="_blank">
  <img alt="" src="https://badgen.net/github/stars/KevinVandy/material-react-table?color=blue" />
</a>
<a href="https://github.com/KevinVandy/material-react-table/blob/main/LICENSE" target="_blank">
  <img alt="" src="https://badgen.net/github/license/KevinVandy/material-react-table?color=blue" />
</a>
<a href="http://makeapullrequest.com" target="_blank">
  <img alt="" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
</a>

## About

### __Built with [Material UI <sup>V5</sup>](https://mui.com) and [TanStack Table <sup>V8</sup>](https://tanstack.com/table/v8)__

### _Quickly Create React Data Tables with Material Design_

A good table library should offer you powerful features, with an easy way to customize them, or even opt out and turn them off. It should also offer a bunch of advanced features to take your tables to the next level, but without sacrificing too bundle size bloat. MRT attempts to find that happy balance.

MRT is built on top of [TanStack Table's](https://tanstack.com/table/v8) react hooks to build upon it's high performance and flexibility.

## Learn More

- Join the [Discord](https://discord.gg/5wqyRx6fnm) server to join in on the development discussion or ask questions
- View the [Docs Website](https://www.material-react-table.com/)
- See all [Props, Options, and APIs](https://www.material-react-table.com/docs/api)

### Quick Examples

 - [Basic Table](https://www.material-react-table.com/docs/examples/basic/) (See Default Features)
 - [Minimal Table](https://www.material-react-table.com/docs/examples/minimal/) (Turn off Features like Pagination, Sorting, Filtering, and Toolbars)
 - [Advanced Table](https://www.material-react-table.com/docs/examples/advanced/) (See some of the Advanced Features)
 - [Aggregation/Grouping](https://www.material-react-table.com/docs/examples/aggregation-and-grouping/) (Aggregation features such as Sum, Average, Count, etc.)
 - [Data Export Table](https://www.material-react-table.com/docs/examples/data-export/) (Export to CSV, Excel, etc.)
 - [Editing CRUD Table](https://www.material-react-table.com/docs/examples/editing-crud/) (Create, Edit, and Delete Rows)
 - [Remote Data](https://www.material-react-table.com/docs/examples/remote/) (Server-side Pagination, Sorting, and Filtering)
 - [React Query](https://www.material-react-table.com/docs/examples/react-query/) (Server-side Pagination, Sorting, and Filtering, simplified)
 - [Virtualized Rows](https://www.material-react-table.com/docs/examples/virtualized/) (10,000 rows at once!)
 - [Infinite Scrolling](https://www.material-react-table.com/docs/examples/infinite-scrolling/) (Fetch data as you scroll)
 - [Localization (i18n)](https://www.material-react-table.com/docs/guides/localization#built-in-locale-examples) (Over a dozen languages built-in)

View additional [storybook examples](https://www.material-react-table.dev/)

## Features

_All features can easily be enabled/disabled_

_**Fully Fleshed out [Docs](https://www.material-react-table.com/docs/guides#guides) are available for all features**_

- [x] < 41kb gzipped - [Bundlephobia](https://bundlephobia.com/package/material-react-table)
- [x] Advanced TypeScript Generics Support (TypeScript Optional)
- [x] Aggregation and Grouping (Sum, Average, Count, etc.)
- [x] Click To Copy Cell Values
- [x] Column Action Dropdown Menu
- [x] Column Hiding
- [x] Column Ordering via Drag'n'Drop
- [x] Column Pinning (Freeze Columns)
- [x] Column Resizing
- [x] Customize Icons
- [x] Customize Styling of internal Mui Components
- [x] Data Editing (4 different editing modes)
- [x] Density Toggle
- [x] Detail Panels (Expansion)
- [x] Filtering (supports client-side and server-side)
- [x] Full Screen Mode
- [x] Global Filtering (Search across all columns, rank by best match)
- [x] Header Groups & Footers
- [x] Localization (i18n) support
- [x] Manage your own state or let the table manage it internally for you
- [x] Pagination (supports client-side and server-side)
- [x] Row Actions (Your Custom Action Buttons)
- [x] Row Numbers
- [x] Row Ordering via Drag'n'Drop
- [x] Row Selection (Checkboxes)
- [x] SSR compatible
- [x] Sorting (supports client-side and server-side)
- [x] Theming (Respects your Material UI Theme)
- [x] Toolbars (Add your own action buttons)
- [x] Tree Data / Expanding Sub-rows
- [x] Virtualization (@tanstack/react-virtual)

## Getting Started

### Installation

View the full [Installation Docs](https://www.material-react-table.com/docs/getting-started/install)

1. Ensure that you have React 17 or later installed (MUI V5 requires React 17 or 18)

2. Install Peer Dependencies (Material UI V5)

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

3. Install material-react-table

```bash
npm install material-react-table
```

> _`@tanstack/react-table`, `@tanstack/react-virtual`, and `@tanstack/match-sorter-utils`_ are internal dependencies, so you do NOT need to install them yourself.

### Usage

> Read the full usage docs [here](https://www.material-react-table.com/docs/getting-started/usage/)

```jsx
import React, { useMemo, useRef, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';

const data = [
  {
    name: 'John',
    age: 30,
  },
  {
    name: 'Sara',
    age: 25,
  },
]

export default function App() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
        Cell: ({ cell}) => <span>{cell.getValue()}</span>, //optional custom cell render
      },
      {
        accessorFn: (row) => row.age, //alternate way
        id: 'age', //id required if you use accessorFn instead of accessorKey
        header: 'Age',
        Header: () => <i>Age</i>, //optional custom header render
      },
    ],
    [],
  );

  //optionally, you can manage any/all of the table state yourself
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  //Or, optionally, you can get a reference to the underlying table instance
  const tableInstanceRef = useRef(null);

  const someEventHandler = () => {
    //read the table state during an event from the table instance ref
    console.log(tableInstanceRef.current.getState().sorting);
  }

  return (
    <MaterialReactTable 
      columns={columns} 
      data={data} 
      enableColumnOrdering //enable some features
      enableRowSelection 
      enablePagination={false} //disable a default feature
      onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
      state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
      tableInstanceRef={tableInstanceRef} //get a reference to the underlying table instance (optional)
    />
  );
}
```

_Open in [Code Sandbox](https://codesandbox.io/s/simple-material-react-table-example-t5c3ji)_

## Contributors

<a href="https://github.com/kevinvandy/material-react-table/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kevinvandy/material-react-table" />
</a>

PRs are Welcome, but please discuss in [GitHub Discussions](https://github.com/KevinVandy/material-react-table/discussions) or the [Discord Server](https://discord.gg/5wqyRx6fnm) first if it is a large change!

Read the [Contributing Guide](https://github.com/KevinVandy/material-react-table/blob/main/CONTRIBUTING.md) to learn how to run this project locally.

<!-- Use the FORCE, Luke! -->