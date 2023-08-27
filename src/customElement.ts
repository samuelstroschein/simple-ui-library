import { type CustomElement, type PropertyTypes } from "./api.js";
import { effect, signal } from "./reactivity.js";
import { LitElement, type PropertyDeclarations } from "lit";

export const customElement: CustomElement = (component) => {
  return class Element extends LitElement {
    private _disposeEffect?: () => void;

    static properties = getProps(component.toString());

    performUpdate() {
      if (!this.isUpdatePending) {
        return;
      }
      this._disposeEffect?.();
      this._disposeEffect = effect(() => {
        this.isUpdatePending = true;
        super.performUpdate();
      });
    }

    render() {
      console.log("rendering");
      const props = [...Element.elementProperties.keys()];
      const propertiesAsSignals = Object.fromEntries(
        props.map((key) => [key, signal(this[key as keyof typeof props])])
      );
      return component(propertiesAsSignals);
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
      Object.entries(propsObject).map(([key, value]) => [
        key,
        { type: value as PropertyTypes[number] },
      ])
    );
    return asLitPropertyOptions;
  } catch (error) {
    throw new Error("Error evaluating props object:", error);
  }
};
