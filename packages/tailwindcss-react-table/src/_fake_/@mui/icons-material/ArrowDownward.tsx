import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const ArrowDownwardIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="ArrowDownwardIcon" {...props}>
    <path d="m20 12-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
  </SvgIcon>
);
