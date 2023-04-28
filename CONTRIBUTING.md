# Contributing to Material React Table

<a href="http://makeapullrequest.com" target="_blank">
  <img alt="" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
</a>

## Suggesting New Features or Bug Fixes

Before making large PRs, you may want to discuss your proposals in either the [Discord Contributing Channel](https://discord.gg/5wqyRx6fnm), the [GitHub Discussions](https://github.com/KevinVandy/tailwindcss-react-table/discussions) page, or the [GitHub Issues](https://github.com/KevinVandy/tailwindcss-react-table/issues) page.

## Running the project locally

This project uses PNPM and a TurboRepo with 3 projects.

- The library itself in `/packages/tailwindcss-react-table`
- The docs site in `/apps/tailwindcss-react-table-docs`
- The storybook site used for local development in `/apps/tailwindcss-react-table-storybook`

### 1. Fork and Clone the project

Create your own fork, clone, and then make a feature/bugfix branch off of `main`. Branch name does not really matter.

### 2. Install Dependencies

```bash
pnpm i
```

### 3. Run the project(s)

#### Run the Library for Local Development

```bash
pnpm lib:dev
```

#### Run the Storybook for Local Development

```bash
pnpm storybook:dev
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