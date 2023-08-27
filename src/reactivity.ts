import * as preact from "@preact/signals-core";

export const signal: <T>(value: T) => {
  (): T;
  set: (value: T) => void;
} = <T>(value: T) => {
  const psignal = preact.signal(value);
  const getter = () => psignal.value;
  return Object.assign(getter, {
    set: (value: T) => {
      psignal.value = value;
    },
  });
};

export const effect = preact.effect;

export const derived = preact.computed;
