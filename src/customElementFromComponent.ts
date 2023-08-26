import { render } from "lit-html";
import type { CustomElementFromComponent } from "./api.js";

export const customElementFromComponent: CustomElementFromComponent = (
  component
) => {
  class Component extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    mappedAttributes = {};

    connectedCallback() {
      this.mappedAttributes = Object.fromEntries(
        Object.values(this.attributes).map((x) => [x.name, x.value])
      );
      render(component(this.mappedAttributes), this.shadowRoot);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      this.mappedAttributes[name] = newValue;
      render(component(this.mappedAttributes), this.shadowRoot);
    }
  }
  return Component;
};
