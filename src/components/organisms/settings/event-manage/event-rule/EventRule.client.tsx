'use client';

import {EventType} from '@/components/molecules/EventTypeSelect.client';
import {FC} from 'react';
import CatchEventRule from './CatchEventRule.client';
import DrawEventRule from './DrawEventRule.client';
import FindEventRule from './FindEventRule.client';
import RouletteEventRule from './RouletteEventRule.client';

interface Props {
  eventType: EventType | (string & {}) | null;
  name?: string;
}

const EventRule: FC<Props> = ({eventType, name}) => {
  if (eventType === 'CATCH') {
    return <CatchEventRule defaultName={name} />;
  } else if (eventType === 'DRAW') {
    return <DrawEventRule defaultName={name} />;
  } else if (eventType === 'FIND') {
    return <FindEventRule defaultName={name} />;
  } else if (eventType === 'ROULETTE') {
    return <RouletteEventRule defaultName={name} />;
  }

  return null;
};

export default EventRule;
