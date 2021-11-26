import React, { FC } from 'react';
import { RangeSlider as RSuiteRangeSlider, RangeSliderProps } from 'rsuite';
// import 'rsuite/Slider/styles/index.less';
import './test.less';

export const RangeSlider: FC<RangeSliderProps> = (props) => {
  return <RSuiteRangeSlider {...props} />;
};
