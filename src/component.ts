import type { html } from "./html.js";
import type { Component } from "./types.js";

export const component = <T extends Record<string, StringConstructor>>(
  component: (props: T) => ReturnType<typeof html>
): Component => {
  return {} as any;
};
