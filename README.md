# Material React Table

<a href="https://bundlephobia.com/result?p=material-react-table" target="\_parent">
  <img alt="" src="https://badgen.net/bundlephobia/minzip/material-react-table" />
</a>

<a href="https://npmjs.com/package/material-react-table" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/material-react-table.svg" />
</a>

> This Project is based on `@tanstack/react-table` v8, which itself is still in beta, so therefore this package is also still in alpha/beta

- A fully featured Material UI V5 implementation of Tanstack React Table v8 (beta)
- Inspired by material-table and the MUI X DataGrid
- Written from the ground up in TypeScript, Material UI, and React Table
- All internal Material UI components are easily customizable

## This project is in alpha, but will go into beta _soon<sup>TM</sup>_, so feel free to install and explore

View the [docs (alpha) site](https://www.material-react-table.com/)

View a basic [example](https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/main/material-react-table-docs/examples/basic/sandbox?file=/src/TS.tsx)

View additional [storybook examples](https://www.material-react-table.dev/)

View the [github source code](https://github.com/KevinVandy/material-react-table) and [github open issues](https://github.com/KevinVandy/material-react-table/issues)

Join the [discord](https://discord.gg/5wqyRx6fnm) server to join in on the development discussion or ask questions

### Features (All Features work and are MVP, but are still being polished)

_All features can easily be enabled/disabled_

- [x] Click To Copy Cell Values
- [x] Column Actions
- [x] Column Grouping (Group By and Aggregates)
- [x] Column Hiding
- [x] Column Ordering via Drag'n'Drop (react-dnd)
- [x] Column Pinning
- [x] Column Resizing (work in progress)
- [x] Customize Icons
- [x] Customize Styling of internal Mui Components
- [x] Data Editing (3 different editing modes)
- [x] Density Toggle
- [x] Detail Panels
- [x] Filtering and multiple built-in filter modes
- [x] Full Screen mode
- [x] Global Filtering (Search across all columns, rank by best match)
- [x] HeaderGroups & Footers
- [x] Localization (i18n) support
- [x] Manage your own state
- [x] Pagination (supports client-side and server-side)
- [x] Persistent State
- [x] Row Actions
- [x] Row Numbers
- [x] Row Selection (checkboxes)
- [x] SSR compatible
- [x] Sorting
- [x] Theming (Respects your Material UI Theme)
- [x] Toolbars (Add your own action buttons)
- [x] Tree Data / Expanding Subrows
- [x] Virtualization (react-virtual)

### Installation

1. Install Peer Dependencies (Material UI v5)

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

2. Install material-react-table

```bash
npm install material-react-table
```

_`@tanstack/react-table`, `react-virtual` and `react-dnd`_ are internal dependencies, so you don't need to install them yourself.