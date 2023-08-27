import { property } from "lit/decorators.js";
import { customElement } from "./customElement.js";
import { derived, effect, signal } from "./reactivity.js";
import { html } from "./render.js";
import { LitElement } from "lit";

const MyComponent = (props = { name: String, age: Number }) => {
  const userAge = signal(55);

  effect(() => {
    console.log(`user age is ${userAge()}`);
  });

  return html`
    <p>Hello ${props.name()}, you are ${userAge()} old.</p>
    <button @click=${() => userAge.set(userAge() + 1)}>log my age</button>
  `;
};

customElements.define("element-x", customElement(MyComponent));
