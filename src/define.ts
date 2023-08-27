import { toCustomElement } from "./toCustomElement.js";
import type { Component } from "./types.js";

/**
 * Creates and defines a custom element from a component.
 *
 * @example
 *   defineCustomElement("my-element", (props) => html`<div>Hello, ${props.name}!</div>`);
 */
export const define = (tag: `${string}-${string}`, component: Component) =>
  customElements.define(tag, toCustomElement(component));
