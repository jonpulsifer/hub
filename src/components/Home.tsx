import React from 'react';
import {
  Layout,
  MediaCard,
  Page,
} from '@shopify/polaris';

import {ControlPanel, UnifiCam} from './';

export function Home() {
  const learnMoreUrl = "https://github.com/jonpulsifer/cloudlab/tree/main/rpi/blinkypi0";

  return (
    <Page>
      <Layout>
        <Layout.Section oneHalf>
          <MediaCard
            portrait
            title={`Pro Gamer LEDs`}
            description='This is a stream from a UniFi camera pointed at two Raspberry Pis. Interact with them using the control panel.'
            primaryAction={{
              content: 'Learn more about blinkypi0',
              onAction: () => { window.location.href = learnMoreUrl; },
            }}
          >
            <UnifiCam />
          </MediaCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <ControlPanel />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
