import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const ClearAllIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="ClearAllIcon" {...props}>
    <path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"></path>
  </SvgIcon>
);
