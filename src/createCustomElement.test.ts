import { LitElement } from "lit";
import { createCustomElement } from "./createCustomElement.js";
import { signal } from "./reactivity.js";
import { html } from "./render.js";
import { describe, expect, it } from "vitest";

const MockComponent = (props?: { name: () => string; age: () => number }) => {
  const myAge = signal(55);

  return html`<div>You are ${myAge()} years old.</div> `;
};

describe("customElement", () => {
  it("should return a custom element that can be used to define a custom element", () => {
    const CustomElement = createCustomElement(MockComponent);
    expect(customElements.get("mock-element")).toBeUndefined();
    customElements.define("mock-element", CustomElement);
    expect(customElements.get("mock-element")).toBeDefined();
  });

  it("should set the properties of the custom element", () => {
    const CustomElement = createCustomElement(MockComponent);
    expect(CustomElement.properties!).toEqual({ name: {}, age: {} });
  });
});
