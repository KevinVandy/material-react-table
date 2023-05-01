import React from 'react';
import { SvgIcon, SvgIconProps } from './SvgIcon';

export const ArrowRightIcon = (props: SvgIconProps) => (
  <SvgIcon data-testid="ArrowRightIcon" {...props}>
    <path d="m10 17 5-5-5-5v10z"></path>
  </SvgIcon>
);
