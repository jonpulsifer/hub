import React, { useState, useCallback } from 'react';
import {
  Banner,
  Card,
  Layout,
  Page,
  Tabs,
} from '@shopify/polaris';

import { ControlPanel, UnifiCam } from './';

export function Home() {
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const allMarkup = (
    <Banner>
      <p>
        There's nothing here. Don't worry about it.
      </p>
    </Banner>
  );

  const playgroundMarkup = (
    <>
      <UnifiCam device="blinkypi0" />
      <ControlPanel />
    </>
  );

  const tabs = [
    {
      id: 'default',
      content: 'All',
      children: allMarkup,
    },
    {
      id: 'camera-playground',
      content: 'Camera Playground',
      children: playgroundMarkup,
    },
    {
      id: 'outdoors',
      content: 'Outdoor Camera',
      children: <UnifiCam device="outside" />,
    },
  ];
  return (
    <Page>
      <Layout>
        <Layout.Section fullWidth>
          <Card>
            <Tabs fitted tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <Card.Section>
                {tabs[selected].children}
              </Card.Section>
            </Tabs>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
