# Material React Table

<a href="https://npmjs.com/package/material-react-table" target="_blank">
  <img alt="" src="https://badgen.net/npm/v/material-react-table?color=blue" />
</a>
<a href="https://npmjs.com/package/material-react-table" target="_blank">
  <img alt="" src="https://img.shields.io/npm/dm/material-react-table.svg?color=blue" />
</a>
<a href="https://bundlephobia.com/result?p=material-react-table" target="_blank">
  <img alt="" src="https://badgen.net/bundlephobia/minzip/material-react-table@latest?color=blue" />
</a>
<a href="https://github.com/KevinVandy/material-react-table" target="_blank">
  <img alt="" src="https://img.shields.io/github/stars/KevinVandy/material-react-table.svg?style=social&label=Star" />
</a>
<a href="http://makeapullrequest.com" target="_blank">
  <img alt="" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
</a>

---

## About

> This project is still in alpha, but is expected to enter beta by August 2022, and a stable 1.0 release shortly thereafter.

- A fully featured Material UI V5 implementation of Tanstack React Table V8
- Inspired by material-table and the MUI X DataGrid
- Written from the ground up in TypeScript
- All internal Material UI components are easily customizable

Join the [Discord](https://discord.gg/5wqyRx6fnm) server to join in on the development discussion or ask questions

View the [Docs Site](https://www.material-react-table.com/)

See all [Props and Options](https://www.material-react-table.com/docs/api)

---

## Quick Examples

 - [Basic Table](https://www.material-react-table.com/docs/examples/basic/) (See Default Features)
 - [Minimal Table](https://www.material-react-table.com/docs/examples/minimal/) (Turn off Features)
 - [Advanced Table](https://www.material-react-table.com/docs/examples/advanced/) (See some of the Advanced Features)
 - [Data Export Table](https://www.material-react-table.com/docs/examples/data-export/) (Export to CSV, Excel, etc.)
 - [Editing CRUD Table](https://www.material-react-table.com/docs/examples/editing-crud/) (Create, Edit, and Delete Rows)
 - [Remote Data](https://www.material-react-table.com/docs/examples/remote/) (Server-side Pagination, Sorting, and Filtering)
 - [React Query](https://www.material-react-table.com/docs/examples/react-query/) (Server-side Pagination, Sorting, and Filtering)
 - [Virtualized Rows](https://www.material-react-table.com/docs/examples/virtualized/) (10,000 rows at once!)
 - [Infinite Scrolling](https://www.material-react-table.com/docs/examples/infinite-scrolling/) (Fetch data as you scroll)

View additional [storybook examples](https://www.material-react-table.dev/)

---

## Features (All Features work and are MVP, but are still being polished)

_All features can easily be enabled/disabled_

- [x] < 37kb gzipped - [Bundlephobia](https://bundlephobia.com/package/material-react-table)
- [x] Advanced TypeScript Generics Support (TypeScript Optional)
- [x] Click To Copy Cell Values
- [x] Column Action Dropdown Menu
- [x] Column/Row Grouping (Group By and Aggregates)
- [x] Column Hiding
- [x] Column Ordering via Drag'n'Drop
- [x] Column Pinning (Freeze Columns)
- [x] Column Resizing
- [x] Customize Icons
- [x] Customize Styling of internal Mui Components
- [x] Data Editing (3 different editing modes)
- [x] Density Toggle
- [x] Detail Panels (Expansion)
- [x] Filtering (supports client-side and server-side)
- [x] Full Screen Mode
- [x] Global Filtering (Search across all columns, rank by best match)
- [x] Header Groups & Footers
- [x] Localization (i18n) support
- [x] Manage your own state
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
- [x] Virtualization (react-virtual)

---

## Getting Started

### Installation

View the full [Installation Docs](https://www.material-react-table.com/docs/getting-started/install)

1. Install Peer Dependencies (Material UI V5)

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

2. Install material-react-table

```bash
npm install material-react-table
```

> _`@tanstack/react-table`, `@tanstack/react-virtual`, and `@tanstack/match-sorter-utils`_ are internal dependencies, so you don't need to install them yourself.

---

### Usage

> Read the full usage docs [here](https://www.material-react-table.com/docs/getting-started/usage/)

```tsx
import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';

export default function App() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        accessorFn: (row) => row.age, //alternate way
        id: 'age', //id required if you use accessorFn instead of accessorKey
        header: 'Age',
        Header: <i style={{ color: 'red' }}>Age</i>, //optional custom markup
      },
    ],
    [],
  );

  const data = useMemo(
    () => [
      {
        name: 'John',
        age: 30,
      },
      {
        name: 'Sara',
        age: 25,
      },
    ],
    [],
  );

  //optionally, you can manage any/all of the table state yourself
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  return (
    <MaterialReactTable 
      columns={columns} 
      data={data} 
      enableColumnOrdering //enable some features
      enableRowSelection 
      enableStickyHeader
      onRowSelectionChange={setRowSelection} //hoist internal state to your own state (optional)
      state={{ rowSelection }} //manage your own state, pass it back to the table (optional)
   />
   );
}
```

_Open in [Code Sandbox](https://codesandbox.io/s/simple-material-react-table-example-t5c3ji)_

---

## Contributors

<a href="https://github.com/kevinvandy/material-react-table/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kevinvandy/material-react-table" />
</a>

PRs are Welcome, but please discuss in [GitHub Discussions](https://github.com/KevinVandy/material-react-table/discussions) or the [Discord Server](https://discord.gg/5wqyRx6fnm) first!
