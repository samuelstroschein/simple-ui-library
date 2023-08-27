import { html, derived, define, signal } from "../dist/bundle/index.js";

const x = signal("Samuel");

define("simple-component", (props = { name: String, age: Number }) => {
  const twentyYearsOlder = derived(() => props.age() + 20);

  return html`
    <p>Hello ${x}, you are ${props.age} old.</p>
    <p>In 20 years you will be ${twentyYearsOlder}.</p>
    <button
      @click=${() => x.set((Math.random() + 1).toString(36).substring(7))}
    >
      Change name to Peter
    </button>
    ${Nested({ city: props.age })}
  `;
});

const Nested = (props) => {
  return html`<p>This is nested!!! ${x}</p>`;
};
