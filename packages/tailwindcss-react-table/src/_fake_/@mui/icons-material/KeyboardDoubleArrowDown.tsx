import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const KeyboardDoubleArrowDownIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="KeyboardDoubleArrowDownIcon" {...props}>
    <path d="M18 6.41 16.59 5 12 9.58 7.41 5 6 6.41l6 6z"></path>
    <path d="m18 13-1.41-1.41L12 16.17l-4.59-4.58L6 13l6 6z"></path>
  </SvgIcon>
);
