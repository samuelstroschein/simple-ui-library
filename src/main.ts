import { createSignal } from "solid-js";
import { customElementFromComponent } from "./customElementFromComponent.js";
import { html } from "./render.js";

const MyComponent = (props: { name: () => string; age: () => number }) => {
  const [subAge, setSubAge] = createSignal(55);

  const handleClick = () => {
    setSubAge(subAge() + 1);
    console.log(subAge);
  };

  return html`
    <div>Hello ${props.name()}! You are ${subAge()} years old.</div>
    <button @click=${handleClick}>Increase age</button>
    <my-second-component name="Samuel" age=${subAge()}></my-second-component>
  `;
};

const MySecondComponent = (props: { name: string; age: number }) => {
  return html`
    <div>Hello ${props.name}! You are ${props.age} years old.</div>
  `;
};

console.log("Hello world!");

customElements.define("element-x", customElementFromComponent(MyComponent));
customElements.define(
  "my-second-component",
  customElementFromComponent(MySecondComponent)
);
