import { type Component, html } from "./index.js";
import { expectType } from "tsd";

// ---------------------- COMPONENT ------------------------------------

// -- partial typesafety --

// testing a hacky way to define a component props in plain JS
// for reflection purposes while still getting partial type safety
const MockComponent = (
  props = {
    name: String,
    age: Number,
    photos: Array<string>,
    user: Object as () => {
      name: string;
      identifier: number;
      photos: string[];
    },
  }
) => {
  // expecting a function getter for each property
  expectType<() => string>(props.name);
  expectType<() => number>(props.age);

  // expecting a value after calling the getter
  expectType<string>(props.name());
  expectType<number>(props.age());

  // achieving type safety for arrays
  expectType<string[]>(props.photos());
  expectType<string>(props.photos()[0]);
  // @ts-expect-error - expecting a string, not a number
  expectType<number[]>(props.photos());

  // achieving typesafety for objects
  expectType<{ name: string; identifier: number; photos: string[] }>(
    props.user()
  );

  return html`<div>Hello, ${props.name}!</div>`;
};

MockComponent({
  name: () => "John",
  age: () => 42,
  photos: () => ["a", "b"],
  user: () => ({
    name: "John",
    identifier: 42,
    photos: ["a", "b"],
  }),
});
