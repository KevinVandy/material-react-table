# Contributing to Material React Table

## Suggesting New Features or Bug Fixes

Before making large PRs, you may want to discuss your proposals in either the [Discord Contributing Channel](https://discord.gg/5wqyRx6fnm), the [GitHub Discussions](https://github.com/KevinVandy/material-react-table/discussions) page, or the [GitHub Issues](https://github.com/KevinVandy/material-react-table/issues) page. 

## Running the project locally

This project uses PNPM and a TurboRepo with 3 projects.

- The library itself in `/packages/material-react-table`
- The docs site in `/apps/docs`
- The storybook site used for local development in `/apps/storybook`

### 1. Fork and Clone the project

Create your own fork, clone, and then make a feature/bugfix branch off of `main`. Branch name does not really matter.

### 2. Install Dependencies

```bash
pnpm i
```

### 3. Run the project(s)

#### Build the Library

```bash
pnpm lib:build
```

#### Run the Storybook for Local Development

```bash
pnpm storybook:dev
```

#### Run the Docs Site for Local Development

```bash
pnpm docs:dev
```
