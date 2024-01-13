import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import FilterVariantsExample from '../examples/customize-filter-variants';
import FacetedValuesExample from '../examples/enable-filter-facet-values';
import FilterModesExample from '../examples/customize-filter-modes';
import PopoverFiltersExample from '../examples/alternate-column-filtering';
import CustomFilterUIExample from '../examples/custom-column-filtering-ui';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';

const FilteringExamples = ({ isPage = false }) => {
  const { pathname, push } = useRouter();
  const [activeTab, setActiveTab] = useState(
    isPage ? pathname.split('/').pop() : 'export-csv',
  );

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          scrollButtons="auto"
          variant="scrollable"
          textColor="secondary"
          indicatorColor="secondary"
          value={isPage ? pathname.split('/').pop() : activeTab}
          onChange={(_e, newPath) =>
            isPage && newPath !== 'more'
              ? push(newPath as string)
              : setActiveTab(newPath as string)
          }
        >
          <Tab label="Filter Variants" value="filter-variants" />
          <Tab label="Faceted Values" value="faceted-values" />
          <Tab label="Filter Switching" value="filter-switching" />
          <Tab label="Popover Filters" value="popover-filters" />
          <Tab label="Custom Filter UI" value="custom-filter-ui" />
          <Tab
            label={
              <Box>
                Server-Side Filtering
                <LaunchIcon sx={{ fontSize: '1rem' }} />
              </Box>
            }
            value="react-query"
          />
          <Link href="/docs/examples" passHref legacyBehavior>
            <Tab
              label={
                <Box>
                  More Examples
                  <LaunchIcon sx={{ fontSize: '1rem' }} />
                </Box>
              }
              value="more"
            />
          </Link>
        </Tabs>
      </Box>
      <Box>
        {activeTab === 'filter-variants' && <FilterVariantsExample />}
        {activeTab === 'faceted-values' && <FacetedValuesExample />}
        {activeTab === 'filter-switching' && <FilterModesExample />}
        {activeTab === 'popover-filters' && <PopoverFiltersExample />}
        {activeTab === 'custom-filter-ui' && <CustomFilterUIExample />}
      </Box>
    </>
  );
};

export default FilteringExamples;
