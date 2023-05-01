import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const DensitySmallIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="DensitySmallIcon" {...props}>
    <path d="M3 2h18v2H3zm0 18h18v2H3zm0-6h18v2H3zm0-6h18v2H3z"></path>
  </SvgIcon>
);
