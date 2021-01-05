import React, { useState, useCallback, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  FooterHelp,
  Layout,
  Page,
} from '@shopify/polaris';

import {Link, NestCam, UnifiCam} from './';
import {HTTP, CloudEvent} from 'cloudevents';
import axios from 'axios';

interface Props {
  data?: string,
}

export function Home({data}: Props) {
  const [blinkyData, setBlinkyData] = useState(data);
  const [date, setDate] = useState(new Date());
  const tick = () => setDate(new Date());
  useEffect(() => {
    var timerID = setInterval( () => tick(), 1000 );
    return function cleanup() {
        clearInterval(timerID);
      };
   });

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
        setBlinkyData('is blinking soon')
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
        setBlinkyData('is rainbowing soon')
      }
    });
  }, []);

  const officeCam = "//video.nest.com/embedded/live/UXUpGmSzPe?autoplay=1";
  // const unifiCam = "rtsp://192.168.1.1:7447/eng3ayaC9FtBx9oZ"
  const unifiCam = "/video/video.m3u8"
  const unifi = true;
  const cam = unifi ? UnifiCam : NestCam;
  const url = unifi ? unifiCam : officeCam;

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card title={`Watch the blinkypi0! ${blinkyData}`}>
            <Card.Section title={date.toLocaleTimeString()}>
              {cam(url)}
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
        <Link url="https://github.com/jonpulsifer/hub">
          GitHub
        </Link>.
      </FooterHelp>
    </Page>
  );
}
