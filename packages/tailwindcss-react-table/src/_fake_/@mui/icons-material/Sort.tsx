import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const SortIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="SortIcon" {...props}>
    <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path>
  </SvgIcon>
);
