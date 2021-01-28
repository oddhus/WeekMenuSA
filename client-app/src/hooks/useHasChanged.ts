import { useEffect, useRef, useState } from "react";
import _ from "lodash";

export const useHasChanged = (val: number, val2: (string | null)[]) => {
  const [hasChanged, setHasChanged] = useState(false);
  const prevVal = usePrevious(val);
  const prevVal2 = usePrevious(val2);

  const reset = () => {
    setHasChanged(false);
  };

  useEffect(() => {
    if (prevVal !== val) {
      setHasChanged(true);
    }
  }, [val, prevVal, hasChanged]);

  useEffect(() => {
    if (!_.isEqual(prevVal2, val2)) {
      setHasChanged(true);
    }
  }, [val2, prevVal2, hasChanged]);

  useEffect(() => {
    setHasChanged(false);
  }, []);

  return {
    hasChanged,
    reset,
  };
};

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
