import React, {useCallback, useState} from 'react';
import {Card,Tabs} from '@shopify/polaris';
import {PiControls} from './';

export function ControlPanel() {
  const [selected, setSelected] = useState(0);
  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );
  const tabs = [
    {
      id: 'blinkypi0',
      content: 'blinkypi0',
      children: <PiControls device="blinkypi0" />,
    },
    {
      id: 'radiopi0',
      content: 'radiopi0',
      children: <PiControls device="radiopi0" />,
    },
  ];
  return (
    <Card.Section title="Control Panel">
      <Tabs fitted tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Card.Section>
          {tabs[selected].children}
        </Card.Section>
      </Tabs>
    </Card.Section>
  );
}
