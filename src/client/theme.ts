import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({}),
  },
  colors: {
    'blue-brand-0': 'hsl(232, 58%, 18%);',
    'blue-brand-90': 'hsla(232, 58%, 18%, 90%);',
    'light-blue-brand-0': 'hsl(213, 100%, 63%);',

    'grey-brand-0': 'hsl(244, 13%, 21%);',
  },
});
