import { customElement } from "./customElement.js";
import { derived, effect, signal } from "./reactivity.js";
import { html } from "./render.js";

const MyComponent = (props?: { name: () => string; age: () => number }) => {
  const derivedAge = derived(() => props.age() + 4);

  const handleClick = () => {
    // @ts-ignore
    props.age.set(props.age() + 1);
    console.log({ myAge: derivedAge.value });
  };

  return html`
    <p>Hello dear viewers</p>
    <div>
      You are ${props.age()} years old. The derived age is ${derivedAge}
    </div>
    <button @click=${handleClick}>Increase age</button>
  `;
};

customElements.define("element-x", customElement(MyComponent));
