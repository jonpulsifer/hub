import React, { useState, useCallback } from 'react';
import {
  Card,
  Layout,
  MediaCard,
  Page,
  Button,
  ButtonGroup,
} from '@shopify/polaris';

import {UnifiCam} from './';
import {HTTP, CloudEvent} from 'cloudevents';
import axios from 'axios';

interface Props {
  data: string,
}

export function Home({data}: Props) {
  const learnMoreUrl = "https://github.com/jonpulsifer/cloudlab/tree/main/rpi/blinkypi0";
  const [blinkyData, setBlinkyData] = useState(data);

  const handleBlink = useCallback(() => {
    const type = "dev.pulsifer.blinky.request";
    const source = "https://github.com/jonpulsifer/cloudlab/rpi/blinkypi0";
    const data = { action: "blink" }

    const ce = new CloudEvent({ type, source, data });
    const message = HTTP.binary(ce); // Or HTTP.structured(ce)
    axios({
      method: "post",
      url: '/cloudevent',
      data: message.body,
      headers: message.headers,
    }).then((resp) => {
      if(resp.status == 204) {
        setBlinkyData(`blinking requested at ${new Date().toLocaleString()}`)
      }
    });
  }, []);

  const handleRainbow = useCallback(() => {
    const type = "dev.pulsifer.blinky.request";
    const source = "https://github.com/jonpulsifer/cloudlab/rpi/blinkypi0";
    const data = { action: "rainbow" }

    const ce = new CloudEvent({ type, source, data });
    const message = HTTP.binary(ce); // Or HTTP.structured(ce)
    axios({
      method: "post",
      url: '/cloudevent',
      data: message.body,
      headers: message.headers,
    }).then((resp) => {
      if(resp.status == 204) {
        setBlinkyData(`rainbowing requested at: ${new Date().toLocaleString()}`)
      }
    });
  }, []);


  return (
    <Page>
      <Layout>
        <Layout.Section oneThird>
          <MediaCard
            title={`blinkypi0: ${blinkyData}`}
            description='This is a stream from a webcam pointed at the blinkypi0. Interact with it using the control panel on the right.'
            primaryAction={{
              content: 'Learn more about blinkypi0',
              onAction: () => { window.location.href = learnMoreUrl; },
            }}
          >
            <UnifiCam />
          </MediaCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <Card title="blinkypi0 controls">
            <Card.Section title="Actions">
              <ButtonGroup>
                <Button primary size='large' onClick={handleRainbow}>Rainbow</Button>
                <Button size='large' onClick={handleBlink}>Blink</Button>
              </ButtonGroup>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
