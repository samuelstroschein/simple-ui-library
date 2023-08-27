import { noChange, html as litHtml } from "lit";
import { directive, AsyncDirective } from "lit/async-directive.js";
import { effect, type signal as Signal } from "./reactivity.js";

export const html = (...args: Parameters<typeof litHtml>) => {
  const template = litHtml(...args);

  for (const [i, value] of template.values.entries()) {
    // @ts-expect-error - the value is unknown
    if (value?.name === "get") {
      // @ts-expect-error - the value is unknown
      template.values[i] = subscribeToSignal(value);
    }
  }
  return template;
};

// from https://github.com/lit/lit/discussions/3725#discussioncomment-5431545
class SubscribeToSignalDirective extends AsyncDirective {
  #cleanup?: () => void;
  #signal?: ReturnType<typeof Signal<unknown>>;

  render(signal: ReturnType<typeof Signal<unknown>>) {
    this.#signal = signal;

    if (this.isConnected) {
      this.#cleanup?.();
      this.#cleanup = effect(() => this.setValue(signal()));
    }

    return noChange;
  }

  disconnected() {
    this.#cleanup?.();
    this.#cleanup = undefined;
  }

  reconnected() {
    const signal = this.#signal;
    if (signal) {
      this.#cleanup = effect(() => this.setValue(signal()));
    }
  }
}

const subscribeToSignal = directive(SubscribeToSignalDirective);
