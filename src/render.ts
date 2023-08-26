import { html as litHtml } from "lit-html";
import { createEffect } from "solid-js";

export const html = (...args: Parameters<typeof litHtml>) => {
  createEffect(() => {
    console.log("render");
  });
  return litHtml(...args);
};
