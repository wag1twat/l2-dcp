import './_app.css';
import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { theme } from '../client/theme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 3 } } }),
  );
  return (
    <ChakraProvider
      resetCSS
      theme={theme}
      colorModeManager={localStorageManager}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
