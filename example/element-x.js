import {
  html,
  derived,
  effect,
  createCustomElement,
} from "../dist/bundle/index.js";

customElements.define(
  "element-x",
  createCustomElement((props = { name: String, age: Number }) => {
    const twentyYearsOlder = derived(() => props.age() + 20);

    console.log("rendering");

    effect(() => {
      console.log(`user age is ${props.age()}`);
    });

    return html`
      <p>Hello ${props.name}, you are ${props.age} old.</p>
      <p>In 20 years you will be ${twentyYearsOlder}.</p>
    `;
  })
);
