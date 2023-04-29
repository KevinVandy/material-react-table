import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const FilterListIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="FilterListIcon" {...props}>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
  </SvgIcon>
);
