import * as preact from "@preact/signals-core";

const fromPreactSignal = <T>(signal: preact.Signal<T>) => {
  const get = () => signal.value;
  return Object.assign(get, {
    set: (value: T) => (signal.value = value),
  });
};

export const signal: <T>(value: T) => {
  (): T;
  set: (value: T) => void;
} = <T>(value: T) => {
  return fromPreactSignal(preact.signal(value));
};

export const effect = preact.effect;

export const derived = <T>(callback: () => T) =>
  fromPreactSignal(preact.computed(callback));
