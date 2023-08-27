import { Box } from '@chakra-ui/react';
import React from 'react';

export const RangePickerCss = (props: React.PropsWithChildren) => {
  return (
    <Box
      __css={{
        '.ant-picker.ant-picker-range': {
          background: 'grey-brand-0',
          '.ant-picker-input': {
            input: {
              color: 'whiteAlpha.900',
              '::placeholder': { color: 'whiteAlpha.700' },
            },
          },
          '.ant-picker-input.ant-picker-input-active': {
            input: {
              color: 'whiteAlpha.900',
              '::placeholder': { color: 'whiteAlpha.700' },
            },
          },
          '.ant-picker-range-separator': { span: { color: 'whiteAlpha.700' } },
          '.ant-picker-suffix': {
            color: 'whiteAlpha.700',
            background: 'grey-brand-0',
          },
          '.ant-picker-clear': {
            color: 'whiteAlpha.700',
            background: 'grey-brand-0',
          },
        },
      }}
      {...props}
    />
  );
};
