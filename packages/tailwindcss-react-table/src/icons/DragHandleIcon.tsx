import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const DragHandleIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="DragHandleIcon" {...props}>
    <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path>
  </SvgIcon>
);
