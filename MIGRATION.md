# Migration Guide: MRT v3 → v4

This document covers the full migration of **material-react-table** from its v3 stack to the v4 stack:

| Dependency | Before | After |
|---|---|---|
| `@mui/material` | v6 | **v9** |
| `@mui/x-date-pickers` | v7 | **v9** |
| `@mui/icons-material` | v6 | **v9** |
| `react` / `react-dom` | ≥18 | **≥19** |
| `@tanstack/react-table` | 8.20.6 | **8.21.3** |
| `@tanstack/react-virtual` | 3.11.2 | **3.13.24** |
| `@tanstack/match-sorter-utils` | 8.19.4 | 8.19.4 (unchanged) |
| Node.js | ≥16 | **≥24** |
| pnpm | 9.3.0 | **11.1.0** |
| TypeScript | 5.7.2 | **6.0.3** |
| Vite | 6.x | **8.x** |
| `@vitejs/plugin-react` | 4.x | **6.x** |
| Storybook | 8.4 | **10.4** |
| Prettier | 3.4 | **3.8** |
| Turbo | 2.3 | **2.9** |

---

## Phase 1 — Package versions

**Files changed:** `package.json` (root), `packages/material-react-table/package.json`

Updated all dependency version ranges to their v9/v19/v11 equivalents. Updated `peerDependencies` to require MUI ≥9 and React ≥19. Updated the root `packageManager` field from `pnpm@9.3.0` to `pnpm@11.1.0` and regenerated the lockfile.

Key `package.json` changes:
```json
// devDependencies (package)
"@mui/material": "^9.0.0",
"@mui/x-date-pickers": "^9.0.0",
"@mui/icons-material": "^9.0.0",
"react": "^19.0.0",
"react-dom": "^19.0.0",

// peerDependencies
"@mui/material": ">=9.0",
"react": ">=19.0",

// dependencies
"@tanstack/react-table": "8.21.3",
"@tanstack/react-virtual": "3.13.24",
```

Root `package.json`:
```json
"packageManager": "pnpm@11.1.0"
```

Bundle size limits were raised by 1 kB each to account for the larger TanStack packages:
```json
{ "path": "dist/index.js",    "limit": "56 KB" },
{ "path": "dist/index.esm.js","limit": "52 KB" }
```

---

## Phase 2 — `resolveSlotProps` utility

**File changed:** `src/utils/utils.ts`

Added a `resolveSlotProps` helper to merge user-supplied slot props (which may be a plain object or a function of `ownerState`) with internal defaults, handling `sx` array merging correctly.

```ts
export const resolveSlotProps = <TOwnerState = unknown>(
  userSlotProps: ((ownerState: TOwnerState) => object) | object | undefined,
  defaultProps: object | null,
  ownerState: TOwnerState,
): Record<string, unknown> => {
  const resolvedUser =
    typeof userSlotProps === 'function'
      ? (userSlotProps(ownerState) as Record<string, unknown>)
      : ((userSlotProps ?? {}) as Record<string, unknown>);
  const defaults = (defaultProps ?? {}) as Record<string, unknown>;
  const mergedSx = [
    ...(defaults['sx'] ? (Array.isArray(defaults['sx']) ? defaults['sx'] : [defaults['sx']]) : []),
    ...(resolvedUser['sx'] ? (Array.isArray(resolvedUser['sx']) ? resolvedUser['sx'] : [resolvedUser['sx']]) : []),
  ];
  return { ...defaults, ...resolvedUser, ...(mergedSx.length > 0 ? { sx: mergedSx } : {}) };
};
```

The parameter type is `object` (not `Record<string, unknown>`) so that MUI v9's complex `SlotProps<ElementType<...>, ...>` types are accepted without invalid casts.

---

## Phase 3 — CSS-variable-safe color utilities

**File changed:** `src/utils/style.utils.ts`

MUI v9 ships a CSS-variables theme by default. The `alpha()`, `lighten()`, and `darken()` functions from `@mui/material/styles` throw at runtime when passed CSS variable strings like `var(--mui-palette-common-black)` because they cannot parse them mathematically.

Replaced all three with safe wrappers that accept an explicit fallback:

```ts
export const mrtAlpha = (color: string, value: number, fallback: string): string => {
  try { return alpha(color, value); } catch { return fallback; }
};
export const mrtLighten = (color: string, value: number, fallback: string): string => {
  try { return lighten(color, value); } catch { return fallback; }
};
export const mrtDarken = (color: string, value: number, fallback: string): string => {
  try { return darken(color, value); } catch { return fallback; }
};
```

All call sites in components were updated to pass a concrete rgba fallback.

---

## Phase 4 — `sx` array pattern

**Files changed:** all component files under `src/components/`

MUI v9 deprecates the `sx={(theme) => ({ ...spread })}` function form when spreading results of other style computations. The correct pattern is the `sx` array:

```tsx
// Before (MUI v6)
sx={(theme) => ({
  color: theme.palette.primary.main,
  ...getCommonMRTCellStyles({ column, header, table, tableCellProps, theme }),
  ...(tableCellProps?.sx as object),
})}

// After (MUI v9)
sx={[
  (theme) => ({ color: theme.palette.primary.main }),
  ...(() => {
    const s = getCommonMRTCellStyles({ column, header, table, tableCellProps, theme });
    return Array.isArray(s) ? s : [s];
  })(),
  ...(Array.isArray(tableCellProps?.sx) ? tableCellProps.sx : [tableCellProps?.sx]),
]}
```

`getCommonMRTCellStyles` already returns `SxProps<Theme>` (an array), so it must be spread via an IIFE to normalise it to an array before spreading into the outer array.

Components updated: `MRT_TableBodyCell`, `MRT_TableBodyRow`, `MRT_TableDetailPanel`, `MRT_ColumnPinningButtons`, `MRT_CopyButton`, `MRT_EditActionButtons`, `MRT_ExpandAllButton`, `MRT_ExpandButton`, `MRT_GrabHandleButton`, `MRT_RowPinButton`, `MRT_TableFooter`, `MRT_TableFooterCell`, `MRT_TableFooterRow`, `MRT_TableHead`, `MRT_TableHeadCell`, `MRT_TableHeadCellColumnActionsButton`, `MRT_TableHeadCellFilterLabel`, `MRT_TableHeadCellResizeHandle`, `MRT_TableHeadCellSortLabel`, `MRT_TableHeadRow`, `MRT_FilterCheckbox`, `MRT_FilterRangeFields`, `MRT_FilterRangeSlider`, `MRT_Table`, `MRT_TableContainer`, `MRT_TablePaper`, `MRT_BottomToolbar`, `MRT_TablePagination`, `MRT_ToolbarAlertBanner`, `MRT_ToolbarDropZone`, `MRT_ToolbarInternalButtons`, `MRT_TopToolbar`, `MRT_ShowHideColumnsMenuItems`.

---

## Phase 5 — TextField: deprecated props → `slotProps`

**Files changed:** `MRT_EditCellTextField.tsx`, `MRT_GlobalFilterTextField.tsx`, `MRT_FilterTextField.tsx`

MUI v9 removed the top-level `inputProps`, `InputProps`, `inputRef`, and `SelectProps` props on `TextField`. All must go through `slotProps`:

| Removed prop | Replacement |
|---|---|
| `inputProps` | `slotProps.htmlInput` |
| `InputProps` | `slotProps.input` |
| `inputRef` | `slotProps.htmlInput.ref` |
| `SelectProps` | `slotProps.select` |

The `resolveSlotProps` utility was used to merge internal defaults with user-supplied slot props in a type-safe way.

**Date/time picker `textField` slot:** `PickersTextFieldProps` (x-date-pickers v9) renders a `<div>` instead of an `<input>`, giving it a different `slotProps` structure and `HTMLDivElement`-typed event handlers. `TextFieldProps` targets `HTMLInputElement | HTMLTextAreaElement`. These types are structurally incompatible.

The fix extracts only the styling and state props that are shared by both types:

```ts
const pickerTextFieldProps = (({ className, color, disabled, error, focused,
  fullWidth, helperText, hiddenLabel, id, label, margin, required,
  size, style, sx, variant }) =>
  ({ className, color, disabled, error, focused, fullWidth, helperText,
     hiddenLabel, id, label, margin, required, size, style, sx, variant })
)(commonTextFieldProps);
```

Event handlers (`onFocus`, `onBlur`, `onChange`) and `slotProps` are intentionally excluded — pickers manage these internally through their own field mechanism.

---

## Phase 6 — `Select.inputProps` → `Select.slotProps.input`

**File changed:** `MRT_TablePagination.tsx`

```tsx
// Before
<Select inputProps={{ 'aria-label': ..., id: ... }}>

// After
<Select slotProps={{ input: { 'aria-label': ..., id: ... } }}>
```

The `onChange` event type was also fixed: removed `Select<number>` generic and used `Number(event.target.value)` instead of a typed generic to avoid `as any`.

---

## Phase 7 — `Checkbox.inputProps` → `slotProps.input`

**File changed:** `MRT_SelectCheckbox.tsx`

```tsx
// Before
<Checkbox inputProps={{ 'aria-label': ... }}>

// After
<Checkbox slotProps={{ input: { 'aria-label': ... } }}>
```

The component was also tightened: `commonProps` typed as `CheckboxProps` (not the intersection with `RadioProps`), and the Radio render uses `as RadioProps` (not `as any`).

---

## Phase 8 — DatePicker generic argument removed

**File changed:** `src/types.ts`

`@mui/x-date-pickers` v9 removed the date-type generic parameter from picker components:

```ts
// Before
muiDatePickerProps?: DatePickerProps<never> | ...
muiDateTimePickerProps?: DateTimePickerProps<never> | ...
muiTimePickerProps?: TimePickerProps<never> | ...

// After
muiDatePickerProps?: DatePickerProps | ...
muiDateTimePickerProps?: DateTimePickerProps | ...
muiTimePickerProps?: TimePickerProps | ...
```

---

## Phase 9 — Box/Stack system props → `sx`

**Files changed:** `MRT_ToolbarAlertBanner.tsx`, `getMRT_RowExpandColumnDef.tsx`, stories

MUI v7 removed shorthand system props (`gap`, `alignItems`, `direction`, `padding`, `fontStyle`, etc.) from `Box`, `Stack`, and `Typography` — they must now go inside `sx`:

```tsx
// Before
<Stack alignItems="center" direction="row" gap="16px">
<Box padding={2}>
<Typography fontStyle="italic">

// After
<Stack sx={{ alignItems: 'center', flexDirection: 'row', gap: '16px' }}>
<Box sx={{ padding: 2 }}>
<Typography sx={{ fontStyle: 'italic' }}>
```

---

## Phase 10 — Menu `MenuListProps` → `slotProps.list`

**Files changed:** `MRT_CellActionMenu.tsx`, `MRT_ColumnActionMenu.tsx`, `MRT_FilterOptionMenu.tsx`, `MRT_RowActionMenu.tsx`, `MRT_ShowHideColumnsMenu.tsx`

MUI v9 `Menu` no longer accepts `MenuListProps`. The equivalent is `slotProps.list`:

```tsx
// Before
<Menu MenuListProps={{ dense: true, sx: { ... } }}>

// After
<Menu slotProps={{ list: { dense: true, sx: { ... } } }}>
```

---

## Phase 11 — `componentsProps` → `slotProps`

**File changed:** `MRT_ShowHideColumnsMenuItems.tsx`

MUI v9 removed `componentsProps` entirely:

```tsx
// Before
<FormControlLabel componentsProps={{ typography: { ... } }}>

// After
<FormControlLabel slotProps={{ typography: { ... } }}>
```

---

## Phase 12 — Rollup `assert` → `with` (Node.js 24)

**File changed:** `packages/material-react-table/rollup.config.mjs`

Node.js 22+ deprecated and Node.js 24 removed the `assert { type: 'json' }` import assertion syntax. Updated to the now-standard `with` keyword:

```js
// Before (fails on Node 24)
import pkg from './package.json' assert { type: 'json' };

// After
import pkg from './package.json' with { type: 'json' };
```

---

## Phase 13 — TanStack packages updated

**File changed:** `packages/material-react-table/package.json`

```json
"@tanstack/react-table":  "8.20.6" → "8.21.3"
"@tanstack/react-virtual": "3.11.2" → "3.13.24"
```

Both are minor/patch bumps with no breaking changes. The bundle size limits were raised by 1 kB each to account for the small size increase.

---

## Phase 14 — TypeScript 6

**Files changed:** `packages/material-react-table/tsconfig.json`, `tsconfig.node.json`

TypeScript 6 deprecated the legacy `moduleResolution: "node"` (internally `node10`) and will remove it in TypeScript 7. The correct setting for a Rollup-bundled library is `"bundler"`:

```json
// Before
"moduleResolution": "node"

// After
"moduleResolution": "bundler"
```

Both `tsconfig.json` (source + stories) and `tsconfig.node.json` (vite config) were updated. No source code changes were needed — TypeScript 6 introduced no other breaking changes for this codebase.

---

## Phase 15 — Vite 8 and `@vitejs/plugin-react` 6

**File changed:** `packages/material-react-table/package.json`

```json
"vite": "^6.0.5"          → "^8.0.13"
"@vitejs/plugin-react": "^4.3.4" → "^6.0.2"
```

The `vite.config.ts` required no changes — the `defineConfig({ plugins: [react()] })` API is stable across Vite major versions.

---

## Phase 16 — Storybook 10

**Files changed:** `packages/material-react-table/package.json`, `.storybook/main.ts`, `.storybook/preview.tsx`

### Package changes

Storybook reorganised its packages between v8 and v10:

| Package | v8 | v10 |
|---|---|---|
| `storybook` | `^8.4.7` | `^10.4.0` |
| `@storybook/react` | `^8.4.7` | `^10.4.0` |
| `@storybook/react-vite` | `^8.4.7` | `^10.4.0` |
| `@storybook/addon-a11y` | `^8.4.7` | `^10.4.0` |
| `@storybook/addon-links` | `^8.4.7` | `^10.4.0` |
| `storybook-dark-mode` | `^4.0.2` | `^5.0.0` |
| `@storybook/addon-essentials` | `^8.4.7` | **removed** — merged into `storybook` core |
| `@storybook/blocks` | `^8.4.7` | **removed** — merged into `storybook` core |
| `@storybook/preview-api` | `^8.4.7` | **removed** — merged into `storybook` core |
| `@storybook/addon-storysource` | `^8.4.7` | **removed** — no v10 release yet |

### `.storybook/main.ts`

Removed addons that were merged into `storybook` core or have no v10 release:

```ts
// Before
addons: [
  getAbsolutePath('@storybook/addon-links'),
  getAbsolutePath('@storybook/addon-essentials'),   // removed — now built-in
  getAbsolutePath('@storybook/addon-a11y'),
  getAbsolutePath('@storybook/addon-storysource'),   // removed — no v10
  getAbsolutePath('storybook-dark-mode'),
],

// After
addons: [
  getAbsolutePath('@storybook/addon-links'),
  getAbsolutePath('@storybook/addon-a11y'),
  getAbsolutePath('storybook-dark-mode'),
],
```

### `.storybook/preview.tsx`

Two changes:

1. `@storybook/preview-api` is now re-exported from the main `storybook` package:
```ts
// Before
import { addons } from '@storybook/preview-api';
// After
import { addons } from 'storybook/preview-api';
```

2. The `actions.argTypesRegex` parameter was deprecated in Storybook 8.3 and removed in v9 (actions are now auto-detected):
```ts
// Before
parameters: {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: { ... },
}
// After
parameters: {
  controls: { ... },
}
```

---

## Phase 17 — Prettier 3.8 and Turbo 2.9

**File changed:** `package.json` (root)

```json
"prettier": "^3.4.2" → "^3.8.3"
"turbo": "2.3.3"     → "2.9.14"
```

Both are minor/patch releases with no breaking changes. No config file changes required.

The root `engines` field was also updated:
```json
"node": ">=16.0.0"  →  "node": ">=24.0.0"
```

---

## Verification

After all phases, the following checks pass:

```bash
# TypeScript — zero errors
pnpm --filter material-react-table exec tsc --noEmit

# Library build — both bundles within size limits
pnpm --filter material-react-table lib:build-lib
# dist/index.js     55.3 kB  (limit 56 kB)
# dist/index.esm.js 51.9 kB  (limit 52 kB)

# Locales build
pnpm --filter material-react-table build-locales
```

> **Note:** The project has no unit or integration test suite. Validation is through TypeScript strict-mode checking and the Rollup bundle size-limit gate.

---

## Phase 18 — Docs app: MUI v6 → v9

**Files changed:** `apps/material-react-table-docs/package.json`, `pages/_app.tsx`, `pages/index.tsx`, and multiple components

The docs app (`apps/material-react-table-docs`) shared the monorepo with the migrated library but still depended on MUI v6, causing a runtime crash in SSR: MUI v9's `styleFunctionSx` received a MUI v6 theme that lacked the expected breakpoints structure (`createEmptyBreakpointObject` reading `undefined`).

**package.json updates:**
```json
"@mui/icons-material": "^9.0.0",   // was ^6.2.1
"@mui/material": "^9.0.0",          // was ^6.2.1
"@mui/x-charts": "^9.2.0",          // was ^7.23.2
"@mui/x-date-pickers": "^9.0.0",    // was ^7.23.3
"@tanstack/react-table-devtools": "^8.21.3"  // was ^8.20.6
```

**System prop removals (MUI v9 removes non-`sx` shorthand props from Typography, Stack, Drawer):**

| File | Before | After |
|---|---|---|
| `BlogAuthor.tsx` | `<Typography fontSize="14pt">` | `<Typography sx={{ fontSize: '14pt' }}>` |
| `SourceCodeSnippet.tsx` (×2) | `<LinkHeading textTransform="capitalize">` | `<LinkHeading sx={{ textTransform: 'capitalize' }}>` |
| `Footer.tsx` | `<Typography textAlign="center">` | `<Typography sx={{ textAlign: 'center' }}>` |
| `MiniNav.tsx` | `<Typography mt="1rem">` | `<Typography sx={{ mt: '1rem' }}>` |
| `Sidebar.tsx` | `<Drawer PaperProps={{ component: 'aside' }}>` | `<Drawer slotProps={{ paper: { component: 'aside' } }}>` |
| `pages/index.tsx` (×2) | `<Typography my="2rem" textAlign="center">` | `<Typography sx={{ my: '2rem', textAlign: 'center' }}>` |
| `pages/index.tsx` | `<LinkHeading mt="4rem" textAlign="center">` | `<LinkHeading sx={{ mt: '4rem', textAlign: 'center' }}>` |
| 5 sandbox examples | `<Stack direction=... gap=... alignItems=...>` | `<Stack sx={{ flexDirection: ..., gap: ..., alignItems: ... }}>` |

**Library fix triggered by docs upgrade** (`MRT_FilterTextField.tsx`): After upgrading `@mui/x-date-pickers` to v9, the `value` prop on `DatePicker`/`TimePicker`/`DateTimePicker` changed from accepting `any` to requiring `PickerValue = PickerValidDate | null`. The local `filterValue` state is typed `string | string[]` (correct for text/select filters) but holds a `PickerValidDate` at runtime for date filters (set by the picker's own `onChange`). Fix: import `PickerValidDate` from `@mui/x-date-pickers/models` and use a narrowing assertion on the value passed to the pickers.

**Content updates:** `pages/index.tsx` and `pages/_app.tsx` updated from V3/V6 references to V4/V9.

---

## Breaking changes for library consumers

If you use `material-react-table` v4 in your own project, you will also need to migrate:

1. **React 19** — update `react` and `react-dom` to `^19.0.0`
2. **MUI v9** — follow the [MUI v9 migration guide](https://mui.com/material-ui/migration/migration-v8/)
3. **`muiFilterTextFieldProps`** — `inputProps`/`InputProps`/`inputRef`/`SelectProps` are no longer forwarded; use `slotProps.htmlInput` / `slotProps.input` / `slotProps.select` instead
4. **`muiSearchTextFieldProps`** — same slot prop changes as above; replace `InputLabelProps` with `slotProps.inputLabel`
5. **Date picker columns** — `muiDatePickerProps`, `muiDateTimePickerProps`, `muiTimePickerProps` no longer accept `onFocus`/`onBlur` forwarding to the picker text field (pickers manage focus internally)
