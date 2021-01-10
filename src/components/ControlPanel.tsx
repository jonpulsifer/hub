import React from 'react';
import {Card} from '@shopify/polaris';
import {PiControls} from './';

export function ControlPanel() {
  return (
    <Card title="Control Panel">
      <PiControls device="blinkypi0" />
      <PiControls device="radiopi0" />
    </Card>
  );
}
