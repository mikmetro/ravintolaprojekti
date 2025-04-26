import {useState} from 'react';

export default function useSpinner(initial, min, max) {
  const [value, setValue] = useState(initial);

  const incrementValue = () => setValue(Math.min(max, value + 1));
  const decrementValue = () => setValue(Math.max(min, value - 1));
  const resetValue = () => setValue(initial);

  return [value, incrementValue, decrementValue, resetValue];
}
