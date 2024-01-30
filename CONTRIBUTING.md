# Contributing to Material React Table

<a href="http://makeapullrequest.com" target="_blank">
  <img alt="" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
</a>

## Suggesting New Features or Bug Fixes

Before making large PRs, you may want to discuss your proposals in either the [Discord Contributing Channel](https://discord.gg/5wqyRx6fnm), the [GitHub Discussions](https://github.com/KevinVandy/material-react-table/discussions) page, or the [GitHub Issues](https://github.com/KevinVandy/material-react-table/issues) page.

## Running the project locally

This project uses PNPM and a TurboRepo with 2 projects.

- The library itself in `/packages/material-react-table` which also contains a storybook site for local development
- The docs site in `/apps/material-react-table-docs`

### 1. Fork and Clone the project

Create your own fork, clone, and then make a feature/bugfix branch off of `v2`. Branch name does not really matter.

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

> Note: If you are contributing a new locale and are trying to test it in the docs site, you will need to run `pnpm lib:build-locales` and then `pnpm docs:dev` before it can be imported.

#### Fully Build the Library

```bash
pnpm lib:build
```

> Note: After building the library, if you are running the docs site locally, it will use the compiled output of the dist folder. This can be annoying if you are trying to test changes to the library in the docs site itself. Just delete the `/dist` folder and restart the docs app to test lib changes in the docs site.