import React, { useState, useCallback } from 'react';
import {
  Card,
  Button,
  ButtonGroup,
} from '@shopify/polaris';

import {HTTP, CloudEvent} from 'cloudevents';
import axios from 'axios';

function buildCloudEvent(device: string, action: string) {
  switch (device) {
    case "blinkypi0":
      return new CloudEvent({
        type: "dev.pulsifer.blinky.request",
        source: "https://github.com/jonpulsifer/cloudlab/rpi/blinkypi0",
        data: { action: action }
      });
    case "radiopi0":
      return new CloudEvent({
        type: "dev.pulsifer.radio.request",
        source: "https://github.com/jonpulsifer/cloudlab/rpi/radiopi0",
        data: { action: action }
      });
    default:
      return new CloudEvent({
        type: "unknown",
        source: "unknown",
      });
  };
}

async function requestAction(device: string, action: string) {
  const ce = buildCloudEvent(device, action);
  const message = HTTP.binary(ce); // Or HTTP.structured(ce)
  try {
    const response = await axios({
      method: 'post',
      url: '/cloudevent',
      data: message.body,
      headers: message.headers,
    });
    if (response.status == 204) return `${device}:${action} requested at ${new Date().toLocaleString()}`;
    return `${device}: something went awry ${response.status} - ${response.data}`;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    return error;
  }
}

export function ControlPanel() {
  const [blinkyData, setBlinkyData] = useState('');
  const [radioData, setRadioData] = useState('');

  const handleBlink = async () => {
    const data = await requestAction("blinkypi0", "blink");
    setBlinkyData(data);
  };

  const handleRainbow = useCallback(async () => {
    const data = await requestAction("blinkypi0", "rainbow");
    setBlinkyData(data)
  }, []);

  const handleRadioBlink = useCallback(async () => {
    const data = await requestAction("radiopi0", "blink");
    setRadioData(data);
  }, []);
  
  const handleRadioRainbow = useCallback(async () => {
    const data = await  requestAction("radiopi0", "rainbow");
    setRadioData(data);
  }, []);

  return (
    <Card title="Control Panel">
      <Card.Section title="blinkypi0">
        <p>{blinkyData}</p>
        <ButtonGroup>
          <Button primary onClick={handleRainbow}>Rainbow</Button>
          <Button onClick={handleBlink}>Blink</Button>
        </ButtonGroup>
      </Card.Section>
      <Card.Section title="radiopi0">
        <p>{radioData}</p>
        <ButtonGroup>
          <Button primary onClick={handleRadioRainbow}>Rainbow</Button>
          <Button onClick={handleRadioBlink}>Blink</Button>
        </ButtonGroup>
      </Card.Section>
    </Card>
  );
}
