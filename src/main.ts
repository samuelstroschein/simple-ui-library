import { html } from "lit-html";
import { customElementFromComponent } from "./customElementFromComponent.js";

const MyComponent = (props: { name: string; age: number }) => {
  let subAge = 21;

  const handleClick = () => {
    subAge++;
    console.log(subAge);
  };

  return html`
    <div>Hello ${props.name}! You are ${props.age} years old.</div>
    <button @click=${handleClick}>Increase age</button>
    <my-second-component name="Samuel" age=${subAge}></my-second-component>
  `;
};

const MySecondComponent = (props: { name: string; age: number }) => {
  return html`
    <div>Hello ${props.name}! You are ${props.age} years old.</div>
  `;
};

customElements.define("element-x", customElementFromComponent(MyComponent));
customElements.define(
  "my-second-component",
  customElementFromComponent(MySecondComponent)
);
