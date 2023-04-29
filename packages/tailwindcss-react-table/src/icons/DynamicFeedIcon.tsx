import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const DynamicFeedIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="DynamicFeedIcon" {...props}>
    <path d="M8 8H6v7c0 1.1.9 2 2 2h9v-2H8V8z"></path>
    <path d="M20 3h-8c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 8h-8V7h8v4zM4 12H2v7c0 1.1.9 2 2 2h9v-2H4v-7z"></path>
  </SvgIcon>
);
