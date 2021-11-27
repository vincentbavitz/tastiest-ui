import React, { FC } from 'react';
import RSuiteRangeSlider, { RangeSliderProps } from 'rsuite/RangeSlider';

export const RangeSlider: FC<RangeSliderProps> = props => {
  return <RSuiteRangeSlider {...props} />;
};
