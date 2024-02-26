# Material React Table V2

View [Documentation](https://www.material-react-table.com/)

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
<a href="https://github.com/KevinVandy/material-react-table/blob/v2/LICENSE" target="_blank">
  <img alt="" src="https://badgen.net/github/license/KevinVandy/material-react-table?color=blue" />
</a>
 <a
  href="https://github.com/sponsors/kevinvandy"
  target="_blank"
  rel="noopener"
>
  <img alt="" src="https://img.shields.io/badge/sponsor-violet" />
</a>
<a
  href="https://discord.gg/5wqyRx6fnm"
  target="_blank"
  rel="noopener"
>
  <img alt="" src="https://dcbadge.vercel.app/api/server/5wqyRx6fnm?style=flat">
</a>

## About

### _Quickly Create React Data Tables with Material Design_

### **Built with [Material UI <sup>V5</sup>](https://mui.com) and [TanStack Table <sup>V8</sup>](https://tanstack.com/table/v8)**

<img src="https://material-react-table.com/banner.png" alt="MRT" height="50" />

> Want to use Mantine instead of Material UI? Check out [Mantine React Table](https://www.mantine-react-table.com)

## Learn More

- Join the [Discord](https://discord.gg/5wqyRx6fnm) server to join in on the development discussion or ask questions
- View the [Docs Website](https://www.material-react-table.com/)
- See all [Props, Options, APIs, Components, and Hooks](https://www.material-react-table.com/docs/api)

### Quick Examples

- [Basic Table](https://www.material-react-table.com/docs/examples/basic/) (See Default Features)
- [Minimal Table](https://www.material-react-table.com/docs/examples/minimal/) (Turn off Features like Pagination, Sorting, Filtering, and Toolbars)
- [Advanced Table](https://www.material-react-table.com/docs/examples/advanced/) (See some of the Advanced Features)
- [Custom Headless Table](https://www.material-react-table.com/docs/examples/custom-headless/) (Build your own table markup)
- [Dragging / Ordering Examples](https://www.material-react-table.com/docs/examples/column-ordering/) (Drag and Drop)
- [Editing (CRUD) Examples](https://www.material-react-table.com/docs/examples/editing-crud/) (Create, Edit, and Delete Rows)
- [Expanding / Grouping Examples](https://www.material-react-table.com/docs/examples/aggregation-and-grouping/) (Sum, Average, Count, etc.)
- [Filtering Examples](https://www.material-react-table.com/docs/examples/filter-variants/) (Faceted Values, Switching Filters, etc.)
- [Sticky Pinning Examples](https://www.material-react-table.com/docs/examples/sticky-header/) (Sticky Headers, Sticky Columns, Sticky Rows, etc.)
- [Remote Data Fetching Examples](https://www.material-react-table.com/docs/examples/react-query/) (Server-side Pagination, Sorting, and Filtering)
- [Virtualized Examples](https://www.material-react-table.com/docs/examples/virtualized/) (10,000 rows at once!)
- [Infinite Scrolling](https://www.material-react-table.com/docs/examples/infinite-scrolling/) (Fetch data as you scroll)
- [Localization (i18n)](https://www.material-react-table.com/docs/guides/localization#built-in-locale-examples) (Over a dozen languages built-in)

View additional [storybook examples](https://www.material-react-table.dev/)

## Features

_All features can easily be enabled/disabled_

_**Fully Fleshed out [Docs](https://www.material-react-table.com/docs/guides#guides) are available for all features**_

- [x] 30-56kb gzipped - [Bundlephobia](https://bundlephobia.com/package/material-react-table)
- [x] Advanced TypeScript Generics Support (TypeScript Optional)
- [x] Aggregation and Grouping (Sum, Average, Count, etc.)
- [x] Cell Actions (Right-click Context Menu)
- [x] Click To Copy Cell Values
- [x] Column Action Dropdown Menu
- [x] Column Hiding
- [x] Column Ordering via Drag'n'Drop
- [x] Column Pinning (Freeze Columns)
- [x] Column Resizing
- [x] Customize Icons
- [x] Customize Styling of internal Mui Components
- [x] Data Editing and Creating (5 different editing modes)
- [x] Density Toggle
- [x] Detail Panels (Expansion)
- [x] Faceted Value Generation for Filter Options
- [x] Filtering (supports client-side and server-side)
- [x] Filter Match Highlighting
- [x] Full Screen Mode
- [x] Global Filtering (Search across all columns, rank by best match)
- [x] Header Groups & Footers
- [x] Localization (i18n) support
- [x] Manage your own state or let the table manage it internally for you
- [x] Pagination (supports client-side and server-side)
- [x] Row Actions (Your Custom Action Buttons)
- [x] Row Numbers
- [x] Row Ordering via Drag'n'Drop
- [x] Row Pinning
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

1. Ensure that you have React 18 or later installed

2. Install Peer Dependencies (Material UI V5)

```bash
npm install @mui/material @mui/x-date-pickers @mui/icons-material @emotion/react @emotion/styled
```

3. Install material-react-table

```bash
npm install material-react-table
```

> _`@tanstack/react-table`, `@tanstack/react-virtual`, and `@tanstack/match-sorter-utils`_ are internal dependencies, so you do NOT need to install them yourself.

### Usage

> Read the full usage docs [here](https://www.material-react-table.com/docs/getting-started/usage/)

```jsx
import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

//data must be stable reference (useState, useMemo, useQuery, defined outside of component, etc.)
const data = [
  {
    name: 'John',
    age: 30,
  },
  {
    name: 'Sara',
    age: 25,
  },
];

export default function App() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //optional custom props
        Cell: ({ cell }) => <span>{cell.getValue()}</span>, //optional custom cell render
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

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnOrdering: true, //enable some features
    enableRowSelection: true,
    enablePagination: false, //disable a default feature
    onRowSelectionChange: setRowSelection, //hoist internal state to your own state (optional)
    state: { rowSelection }, //manage your own state, pass it back to the table (optional)
  });

  const someEventHandler = () => {
    //read the table state during an event from the table instance
    console.log(table.getState().sorting);
  };

  return (
    <MaterialReactTable table={table} /> //other more lightweight MRT sub components also available
  );
}
```

_Open in [Code Sandbox](https://codesandbox.io/s/simple-material-react-table-example-t5c3ji)_

## Contributors

<a href="https://github.com/kevinvandy/material-react-table/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kevinvandy/material-react-table" />
</a>

PRs are Welcome, but please discuss in [GitHub Discussions](https://github.com/KevinVandy/material-react-table/discussions) or the [Discord Server](https://discord.gg/5wqyRx6fnm) first if it is a large change!

Read the [Contributing Guide](https://github.com/KevinVandy/material-react-table/blob/v2/CONTRIBUTING.md) to learn how to run this project locally.

<!-- Use the FORCE, Luke! -->
