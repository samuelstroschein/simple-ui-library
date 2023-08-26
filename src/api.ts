import type { html } from "lit-html";

export type Component = (props: object) => ReturnType<typeof html>;

export type CustomElementFromComponent = (
  component: Component
) => CustomElementConstructor;
