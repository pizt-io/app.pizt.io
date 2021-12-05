import prettier from "https://unpkg.com/prettier@2.4.1/esm/standalone.mjs";
import parserBabel from "https://unpkg.com/prettier@2.4.1/esm/parser-babel.mjs";
import parserHtml from "https://unpkg.com/prettier@2.4.1/esm/parser-html.mjs";
import parserCss from "https://unpkg.com/prettier@2.4.1/esm/parser-postcss.mjs";

const DEFAULT_PRETTIER_CONFIG = Object.freeze({
  arrowParens: "always",
  bracketSpacing: true,
  endOfLine: "lf",
  printWidth: 100,
  proseWrap: "never",
  quoteProps: "consistent",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
});

export const prettyCodeHtml = (code: string) => {
  const pretty = prettier.format(code, {
    ...DEFAULT_PRETTIER_CONFIG,
    parser: "html",
    plugins: [parserHtml],
  });

  return pretty;
};

export const prettyCodeCss = (code: string) => {
  const pretty = prettier.format(code, {
    ...DEFAULT_PRETTIER_CONFIG,
    parser: "css",
    plugins: [parserCss],
  });

  return pretty;
};

export const prettyCodeJs = (code: string) => {
  const pretty = prettier.format(code, {
    ...DEFAULT_PRETTIER_CONFIG,
    parser: "babel",
    plugins: [parserBabel],
  });

  return pretty;
};
