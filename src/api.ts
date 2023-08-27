import { LitElement } from "lit";
import type { html } from "lit-html";

/**
 * A component is a function that returns an html template.
 *
 * A component can be turned into a custom element using the
 * `customElement` function.
 */
export type Component = (props: object) => ReturnType<typeof html>;

/**
 * A custom element is a web component that can be rendered to the DOM.
 */
export type CustomElement = (component: Component) => typeof LitElement;

/**
 * Supported property types of a component.
 *
 * The supported properties come from lit's built-in attribute
 * converters (https://lit.dev/docs/components/properties/#conversion-type).
 */
export type PropertyTypes = typeof PropertyTypes;
export const PropertyTypes = [String, Number, Boolean, Object, Array] as const;
