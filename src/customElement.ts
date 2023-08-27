import { render } from "lit-html";
import type { CustomElement } from "./api.js";
import { effect, signal } from "./reactivity.js";
import { LitElement, type PropertyDeclarations } from "lit";

export const customElement: CustomElement = (component) => {
  return class extends LitElement {
    private _disposeEffect?: () => void;

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

    constructor() {
      super();
    }

    properties = {
      name: "Samuel",
      age: 55,
    };

    propertiesAsSignals = Object.fromEntries(
      Object.entries(this.properties).map(([key, value]) => [
        key,
        signal(value),
      ])
    );

    render() {
      return component(this.propertiesAsSignals);
    }
  };
};
