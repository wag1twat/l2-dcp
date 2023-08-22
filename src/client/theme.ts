import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({}),
  },
  colors: {
    brand: 'hsl(232, 58%, 18%)',
    'brand-a': 'hsla(232, 58%, 18%, .9)',
  },
});
