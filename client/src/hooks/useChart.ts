import {
  Attribute,
  defaultAttribute,
  RecordCategory,
} from '../constants/attributes';
import { Interval, defaultInterval } from '../constants/intervals';
import { defaultState, State } from '../constants/states';
import { useEffect, useState } from 'react';
import { useRecordQuery } from './useRecordQuery';

export const useChart = (category: RecordCategory) => {
  const defaultAttr = defaultAttribute[category];
  if (
    typeof defaultAttr === 'undefined' ||
    typeof defaultInterval === 'undefined' ||
    typeof defaultState === 'undefined'
  )
    throw new Error('useChart have undefined default value');

  const [attribute, setAttribute] = useState<Attribute>(defaultAttr);
  const [interval, setInterval] = useState<Interval>(defaultInterval);
  const [state, setState] = useState<State[]>(defaultState);
  const [url, setUrl] = useState(
    `Record/${attribute.category}/${interval.pathName}/${attribute.pathName}`
  );
  const results = useRecordQuery(url, state);

  useEffect(() => {
    setUrl(
      `Record/${attribute.category}/${interval.pathName}/${attribute.pathName}`
    );
  }, [attribute, interval]);

  return {
    attribute,
    setAttribute,
    interval,
    setInterval,
    state,
    setState,
    results,
  };
};
