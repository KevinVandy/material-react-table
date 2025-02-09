import { Fragment, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { alpha, ListItemButton, useMediaQuery, Box } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { type RouteItem } from './routes';
import highlightWords from 'highlight-words';

interface Props {
  depth?: number;
  expandAll?: boolean;
  isSecondary?: boolean;
  routes: RouteItem[];
  setNavOpen: (navOpen: boolean) => void;
  setSearch: (search: string) => void;
  search: string;
}

export const SideBarItems = ({
  depth = 1,
  expandAll,
  isSecondary,
  routes,
  setNavOpen,
  setSearch,
  search,
}: Props) => {
  const { pathname } = useRouter();
  const isMobile = useMediaQuery('(max-width: 900px)');

  const handleCloseMenu = () => {
    setSearch('');
    if (isMobile) setTimeout(() => setNavOpen(false), 200);
  };

  const selectedItemRef = useCallback((node, selected) => {
    if (node && selected) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {routes.map(
        ({
          href,
          items,
          label,
          divider,
          external,
          secondaryItems,
          keywords,
        }) => {
          const secondaryHrefs = secondaryItems?.map((i) => i.href);

          const isSelected = pathname === href;
          const isSelectedParent = secondaryHrefs?.includes(pathname);
          const willBeSecondary =
            !!secondaryItems?.length && (isSelectedParent || expandAll);

          const matchingKeyWords = search
            ? keywords?.filter((word) =>
                word.toLowerCase().includes(search.toLowerCase()),
              )
            : undefined;

          return (
            <Fragment key={label}>
              <Link href={href} target={external ? '_blank' : undefined}>
                <ListItemButton
                  divider={divider}
                  selected={isSelected && !isSelectedParent}
                  ref={useCallback(
                    (node) =>
                      selectedItemRef(node, isSelected && !isSelectedParent),
                    [],
                  )}
                  onClick={handleCloseMenu}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCloseMenu();
                      e.currentTarget.parentElement?.click();
                    }
                  }}
                  sx={(theme) => ({
                    color: isSecondary
                      ? theme.palette.mode === 'dark'
                        ? theme.palette.secondary.light
                        : theme.palette.secondary.dark
                      : !items
                        ? theme.palette.mode === 'dark'
                          ? theme.palette.primary.main
                          : theme.palette.primary.dark
                        : depth === 1
                          ? theme.palette.text.primary
                          : theme.palette.text.secondary,
                    fontSize:
                      !items && !isSelectedParent
                        ? '0.9rem'
                        : depth === 1
                          ? '1.25rem'
                          : '1rem',
                    fontWeight: isSelectedParent ? 'bold' : 'normal',
                    height: matchingKeyWords?.length
                      ? '3.5rem'
                      : items
                        ? '2.5rem'
                        : '2rem',
                    lineHeight: depth === 0 && !items ? '1.25rem' : '0.75rem',
                    padding: '0',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  })}
                >
                  <Box
                    sx={{
                      ml: `${depth}rem`,
                    }}
                  >
                    <HighlightedText label={label} search={search} />
                    <HighlightedKeywords
                      keywords={matchingKeyWords}
                      search={search}
                    />
                    {external && (
                      <LaunchIcon fontSize="small" sx={{ m: '-0.25rem 4px' }} />
                    )}
                  </Box>
                </ListItemButton>
              </Link>
              {(items || willBeSecondary) && (
                <SideBarItems
                  depth={depth + 1}
                  expandAll={expandAll}
                  isSecondary={willBeSecondary}
                  routes={willBeSecondary ? secondaryItems : items!}
                  setNavOpen={setNavOpen}
                  search={search}
                  setSearch={setSearch}
                />
              )}
            </Fragment>
          );
        },
      )}
    </>
  );
};

const HighlightedText = ({
  search,
  label,
}: {
  search: string;
  label: string;
}) => {
  const chunks = highlightWords?.({
    matchExactly: false,
    query: search,
    text: label?.toString() as string,
  });
  if (chunks?.length > 1 || chunks?.[0]?.match) {
    return (
      <span aria-label={label} role="note">
        {chunks?.map(({ key, match, text }) => (
          <Box
            aria-hidden="true"
            component="span"
            key={key}
            sx={
              match
                ? (theme) => ({
                    backgroundColor: theme.palette.warning.light,
                    borderRadius: '2px',
                    color: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.common.black
                        : theme.palette.common.white,
                    padding: '2px 1px',
                  })
                : undefined
            }
          >
            {text}
          </Box>
        ))}
      </span>
    );
  }
  return label;
};

const HighlightedKeywords = ({
  keywords,
  search,
}: {
  keywords: string[] | undefined;
  search: string;
}) => {
  if (!keywords?.length || !search) return null;
  return (
    <Box
      component="div"
      sx={{
        display: 'block',
        mt: '12px',
        color: 'text.secondary',
        fontSize: '0.8rem',
        fontStyle: 'italic',
      }}
    >
      (<HighlightedText label={keywords.join(', ')} search={search} />)
    </Box>
  );
};
