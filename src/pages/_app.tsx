import './_app.css';
import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, localStorageManager } from '@chakra-ui/react';
import NextApp, { AppProps } from 'next/app';
import { theme } from '../client/theme';
import { AppDataContext } from 'src/client/ssr/appData';
import { AppData } from 'src/shared/types/app-data';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
});
export default class App extends NextApp<AppProps> {
  appData: AppData;

  constructor(props: AppProps) {
    super(props);

    this.appData = props.pageProps.appData || {};
  }
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppDataContext.Provider value={this.appData}>
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
      </AppDataContext.Provider>
    );
  }
}
