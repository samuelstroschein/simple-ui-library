import { html, derived, define } from "../dist/bundle/index.js";

define("simple-component", (props = { name: String, age: Number }) => {
  const twentyYearsOlder = derived(() => props.age() + 20);

  return html`
    <p>Hello ${props.name}, you are ${props.age} old.</p>
    <p>In 20 years you will be ${twentyYearsOlder}.</p>
  `;
});
