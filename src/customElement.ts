import { type CustomElement } from "./api.js";
import { signal } from "./reactivity.js";
import {
  LitElement,
  type PropertyDeclaration,
  type PropertyDeclarations,
} from "lit";

export const customElement: CustomElement = (component) => {
  return class Element extends LitElement {
    static properties = getProps(component.toString());

    /**
     * A map of the element's properties as signals.
     *
     * Initialized to undefined when the element is created.
     */
    componentProperties = Object.fromEntries(
      [...Element.elementProperties.keys()].map((key) => [
        key,
        signal(undefined),
      ])
    );

    /**
     * Set the element's sig
     */
    requestUpdate(
      name?: PropertyKey,
      oldValue?: unknown,
      options?: PropertyDeclaration<unknown, unknown>
    ): void {
      if (name && this[name]) {
        this.componentProperties[name as any].set(this[name]);
      }
      super.requestUpdate(name, oldValue, options);
    }

    render() {
      return component(this.componentProperties);
    }
  };
};

/**
 * Get the props object from a function.
 *
 * JavaScript has no reflection, so we have to parse the function text,
 * and derive the props object from the text. Arguably hacky, but it works.
 */
const getProps = (functionText: string): PropertyDeclarations => {
  const regex = /\(props\s*=\s*\{([^}]+)\}\)\s*=>/;
  const matches = regex.exec(functionText);

  if (matches.length === 0) {
    // no props defined
    return {};
  }

  const propsObjectText = `{${matches[1]}}`;
  try {
    // hacky way to get the props object from the function text
    const propsObject = new Function(`return ${propsObjectText}`)();
    // map the props object to a lit property options
    // https://lit.dev/docs/components/properties/#property-options
    const asLitPropertyOptions = Object.fromEntries(
      Object.entries(propsObject).map(([key, value]) => [key, { type: value }])
    );
    return asLitPropertyOptions;
  } catch (error) {
    throw new Error("Error evaluating props object:", error);
  }
};
