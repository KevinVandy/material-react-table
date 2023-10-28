import { Box, Card, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { AnchorLink } from './AnchorLink';

export const HomeCards = () => {
  return (
    <Box
      sx={{
        marginTop: '3rem',
        gap: '1rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        h3: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          marginBottom: '1rem',
          gap: '0.75rem',
        },
        '@media (max-width: 1024px)': {
          gridTemplateColumns: '1fr',
        },
      }}
    >
      <Stack sx={{ display: 'grid', gap: '1rem' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          <Card sx={{ p: '1rem' }}>
            <Typography variant="h3">The Best of Both Worlds</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem auto',
              }}
            >
              <Image
                alt="Mui + React Table"
                src={`/banner.png`}
                height={60}
                width={256}
              />
            </Box>
            <Typography>
              Combine TanStack Table&apos;s Extensive API With Material
              UI&apos;s Awesome Pre-Built Components!
            </Typography>
          </Card>
          <Card sx={{ p: '1rem' }}>
            <Typography variant="h3">
              <Image
                alt="Efficiency Icon"
                height={24}
                width={24}
                src={'/efficient.svg'}
              />{' '}
              Efficient Bundle Size
            </Typography>
            <Typography>37-53 KB depending on components imported.</Typography>
            <Typography>
              Import the recommended <code>MaterialReactTable</code> component,
              or optionally import lighter weight MRT sub-components that only
              include the UI you need.
            </Typography>
          </Card>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr',
            },
          }}
        >
          <Card sx={{ p: '1rem' }}>
            <Typography variant="h3">
              <Image
                alt="Quality Icon"
                height={24}
                width={24}
                src={'/customizable.svg'}
              />{' '}
              Pre-Built or 100% Custom
            </Typography>
            <Typography>
              Use the pre-built single component data grid with the{' '}
              <code>&lt;MaterialReactTable /&gt;</code> component.
            </Typography>
            <Typography>
              Or build your own markup from scratch using the{' '}
              <code>useMaterialReactTable</code> hook.
            </Typography>
            <Typography>
              All internal MRT components are exported for you to use as
              &quot;lego blocks&quot; to build your own custom tables.
            </Typography>
          </Card>
          <Card sx={{ p: '1rem' }}>
            <Typography variant="h3">
              <Image
                alt="Customizable Icon"
                height={24}
                width={24}
                src={`/source-code.svg`}
              />{' '}
              Easy Customization
            </Typography>
            <Typography>
              Just about everything is customizable or overridable in Material
              React Table. Pass in custom props or styles to all internal
              components. Use simple <code>enable*</code> props to easily enable
              or disable features.
            </Typography>
          </Card>
        </Box>
      </Stack>
      <Stack sx={{ display: 'grid', gap: '1rem' }}>
        <Card sx={{ p: '1rem' }}>
          <Typography variant="h3">
            <Image
              alt="Quality Icon"
              height={24}
              width={24}
              src={`/quality.svg`}
            />{' '}
            Powerful Features
          </Typography>
          <Typography>
            Material React Table has most of the features you would expect from
            a modern table library including{' '}
            <AnchorLink href="/docs/guides/pagination">Pagination</AnchorLink>,{' '}
            <AnchorLink href="/docs/guides/sorting">Sorting</AnchorLink>,{' '}
            <AnchorLink href="/docs/guides/column-filtering">
              Filtering
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/row-selection">
              Row Selection
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/expanding-sub-rows">
              Row Expansion
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/column-resizing">
              Column Resizing
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/column-ordering-dnd">
              Column Reordering
            </AnchorLink>
            , etc.
          </Typography>
          <Typography>
            However, Material React Table also has advanced features that you
            may not find in other table libraries such as{' '}
            <AnchorLink href="/docs/guides/virtualization">
              Virtualization
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/aggregation-and-grouping">
              Aggregation and Grouping
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/examples/advanced">
              Advanced Filter UIs
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/global-filtering">
              Fuzzy Search
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/editing">
              Full Editing (CRUD)
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/column-pinning">
              Column Pinning
            </AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/row-pinning">Row Pinning</AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/row-numbers">Row Numbers</AnchorLink>
            ,{' '}
            <AnchorLink href="/docs/guides/click-to-copy">
              Click to Copy
            </AnchorLink>
            , and more.
          </Typography>
        </Card>
        <Card sx={{ p: '1rem' }}>
          <Typography variant="h3">30+ i18n Locales</Typography>
          <Typography>
            The MRT Community has contributed{' '}
            <AnchorLink href="/docs/guides/localization">
              over&nbsp;30&nbsp;Locales
            </AnchorLink>{' '}
            for everyone to import and use.
          </Typography>
        </Card>
      </Stack>
    </Box>
  );
};
