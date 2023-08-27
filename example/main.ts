import { customElement } from "../src/customElement.js";
import { derived, effect, signal } from "../src/reactivity.js";
import { html } from "../src/render.js";

const MyComponent = (props = { name: String, age: Number }) => {
  const twentyYearsOlder = derived(() => props.age() + 20);

  console.log("rendering");

  effect(() => {
    console.log(`user age is ${props.age()}`);
  });

  return html`
    <p>Hello ${props.name}, you are ${props.age} old.</p>
    <p>In 20 years you will be ${twentyYearsOlder}.</p>
  `;
};

customElements.define("element-x", customElement(MyComponent));
