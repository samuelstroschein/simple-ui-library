import { LitElement, type html } from "lit";

/**
 * A component is a function that receives properties and returns a template.
 *
 * - The `props` typed using JavaScript constructors (e.g. `String`, `Number`, etc.)
 * are converted to signals under the hood.
 *
 * - A component can be turned into a custom element using the
 * `customElement` function.
 */
export type Component = (
  props: Record<string, SupportedPropertyTypes>
) => ReturnType<typeof html>;

/**
 * A custom element is a web component that can be rendered to the DOM.
 */
export type CustomElement = (component: Component) => typeof LitElement;

/**
 * Supported property types of a component.
 *
 * - The supported properties come from lit's built-in attribute
 * converters (https://lit.dev/docs/components/properties/#conversion-type).
 *
 * - The supported properties rely on JavsScript's "type constructors" and are
 * limited to `String`, `Number`, `Boolean`, `Object`, and `Array`.
 *
 */
export type SupportedPropertyTypes =
  | String
  | Number
  | Boolean
  | Object
  | Array<unknown>;
