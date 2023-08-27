import { html as litHtml } from "lit-html";

export const html = (...args: Parameters<typeof litHtml>) => {
  return litHtml(...args);
};
