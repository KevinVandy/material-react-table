import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const ExpandMoreIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="ExpandMoreIcon" {...props}>
    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
  </SvgIcon>
);
