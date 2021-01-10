import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  Button,
  ButtonGroup,
  RangeSlider,
} from '@shopify/polaris';
import {
  HintMajor,
  SoundMajor
} from '@shopify/polaris-icons';

import {HTTP, CloudEvent} from 'cloudevents';
import axios from 'axios';

interface DeviceCapabilities {
  audio: Boolean,
  lights: Boolean,
}

function getDeviceCapabilities(device: string): DeviceCapabilities {
  switch (device) {
    case "blinkypi0": return { audio: false, lights: true }
    case "radiopi0" : return { audio: true, lights: true }
    default: return { audio: false, lights: false }
  }
}

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
    if (response.status == 200) return response.data;
    return `${device}: something went awry ${response.status}`;
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

interface Props {
  device: string,
}

export function PiControls({device}: Props) {
  const { audio, lights } = getDeviceCapabilities(device);
  const [deviceTitleMarkup, setDeviceTitleMarkup] = useState(device);
  const [brightness, setBrightness] = useState(0.2);

  const handleAction = async (action: string) => {
    const {alive, brightness} = await requestAction(device, action);
    setBrightness(brightness);
    setDeviceTitleMarkup(`${device}: ${action} is ${alive ? 'running' : 'not running'}`);
  };

  const handleBrightnessChange = useCallback(
    (value) => setBrightness(value),
    [],
  );

  useEffect(() => {
    handleAction('status')
  }, []);
  
  const lightControlMarkup = lights ? (
    <>
      <Card.Subsection>
        <ButtonGroup fullWidth segmented>
          <Button onClick={() => handleAction("rainbow")} icon={HintMajor} >Rainbow</Button>
          <Button onClick={() => handleAction("blink")} icon={HintMajor} >Blink</Button>
        </ButtonGroup>
        <br />
        <RangeSlider
          output
          label="Brightness"
          min={0.1}
          max={1}
          step={0.1}
          value={brightness}
          onChange={handleBrightnessChange}
        />
        <br />
        <ButtonGroup fullWidth segmented>
          <Button onClick={() => handleAction("brighten")} icon={HintMajor}>Brighten</Button>
          <Button onClick={() => handleAction("darken")} icon={HintMajor}>Darken</Button>
        </ButtonGroup>
      </Card.Subsection>
    </>
  ) : null;

  const audioControlMarkup = audio ? (
    <Card.Subsection>
      <ButtonGroup>
        <Button onClick={() => handleAction("wow")} icon={SoundMajor}>Wow</Button>
      </ButtonGroup>
    </Card.Subsection>
  ) : null;

  
  return (
    <Card.Section title={deviceTitleMarkup}>
      <p>{status}</p>
      {lightControlMarkup}
      {audioControlMarkup}
    </Card.Section>
  );
}
