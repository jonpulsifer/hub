import React from 'react';
import {
  ThemeProvider,
} from '@shopify/polaris';
import {Home} from './components';
import { ThemeConfig } from '@shopify/polaris/dist/types/latest/src/utilities/theme';

interface Props {
  data?: string,
}

export function App({data}: Props) {
  const theme: ThemeConfig = {
    colorScheme: 'dark',
  };

  return (
    <ThemeProvider theme={theme}>
      <Home data={data} />
    </ThemeProvider>
  );
}
