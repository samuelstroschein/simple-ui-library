import { render } from "lit-html";
import type { CustomElementFromComponent } from "./api.js";
import { createEffect, createRoot, createSignal } from "solid-js";

export const customElementFromComponent: CustomElementFromComponent = (
  component
) => {
  class Component extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    attributeGetters = {};
    attributeSetters = {};

    connectedCallback() {
      const attributes = Object.fromEntries(
        Object.values(this.attributes).map((x) => [
          x.name,
          createSignal(x.value),
        ])
      );
      this.attributeGetters = Object.fromEntries(
        Object.entries(attributes).map(([name, [get]]) => [name, get])
      );
      this.attributeSetters = Object.fromEntries(
        Object.entries(attributes).map(([name, [, set]]) => [name, set])
      );
      createRoot(() => {
        createEffect(() => {
          render(component(this.attributeGetters), this.shadowRoot);
        });
      });
    }

    // attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    //   this.attributeSignals[name] = newValue;
    //   render(component(this.attributeSignals), this.shadowRoot);
    // }
  }
  return Component;
};
