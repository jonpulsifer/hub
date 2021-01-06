import React from 'react';
import {Home} from './components';
import {
  Frame,
} from '@shopify/polaris';

interface Props {
  data: string,
}

export function App({data}: Props) {
  return (
    <Frame>
      <Home data={data} />
    </Frame>
  );
}
