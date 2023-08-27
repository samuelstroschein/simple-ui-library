import { LitElement } from "lit";
import type { html } from "lit-html";

export type Component = (props: object) => ReturnType<typeof html>;

export type CustomElement = (component: Component) => typeof LitElement;
