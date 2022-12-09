# Contributing to Material React Table

## Suggesting New Features or Bug Fixes

Before making large PRs, you may want to discuss your proposals in either the [Discord Contributing Channel](https://discord.gg/5wqyRx6fnm), the [GitHub Discussions](https://github.com/KevinVandy/material-react-table/discussions) page, or the [GitHub Issues](https://github.com/KevinVandy/material-react-table/issues) page.

## Running the project locally

This project uses PNPM and a TurboRepo with 3 projects.

- The library itself in `/packages/material-react-table`
- The docs site in `/apps/material-react-table-docs`
- The storybook site used for local development in `/apps/material-react-table-storybook`

### 1. Fork and Clone the project

Create your own fork, clone, and then make a feature/bugfix branch off of `main`. Branch name does not really matter.

### 2. Install Dependencies

```bash
pnpm i
```

### 3. Run the project(s)

#### Run the Storybook for Local Development

```bash
pnpm storybook
```

The Storybook site will open on `port 6006` by default.

#### Run the Docs for Local Development

```bash
pnpm docs:dev
```

The Docs site will open on `port 3000` by default.

> Note: If you are contributing a new locale and are trying to test it in the docs site, you will need to run `pnpm lib:build` and then `pnpm docs:dev` before it can be imported.

#### Build the Library

```bash
pnpm lib:build
```