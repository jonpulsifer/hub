import React, { useState, useCallback } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  FooterHelp,
  Layout,
  Page,
} from '@shopify/polaris';

import {NestCam, Link} from './';
import {HTTP, CloudEvent} from 'cloudevents';
import axios from 'axios';

interface Props {
  data?: string,
}

export function Home({data}: Props) {
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
        setBlinkyData(resp.statusText)
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
    });
  }, []);

  const officeCam = "//video.nest.com/embedded/live/UXUpGmSzPe?autoplay=1";

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card title={`Watch the blinkypi0! ${blinkyData}`}>
            <Card.Section>
              {NestCam(officeCam)}
            </Card.Section>
            <Card.Section>
              <ButtonGroup segmented>
                <Button onClick={handleBlink}>Blink</Button>
                <Button onClick={handleRainbow}>Rainbow</Button>
              </ButtonGroup>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
      <FooterHelp>
        Built with{' '}
        <Link url="https://polaris.shopify.com/">
          Polaris
        </Link>
        .{' '}Hosted on{' '}
        <Link url="https://github.com/homelab-ng/pulsifer.ca">
          GitHub
        </Link>.
      </FooterHelp>
    </Page>
  );
}
