import prettier from "https://unpkg.com/prettier@2.4.1/esm/standalone.mjs";
import parserBabel from "https://unpkg.com/prettier@2.4.1/esm/parser-babel.mjs";
import parserHtml from "https://unpkg.com/prettier@2.4.1/esm/parser-html.mjs";
import parserCss from "https://unpkg.com/prettier@2.4.1/esm/parser-postcss.mjs";

const DEFAULT_PRETTIER_CONFIG = Object.freeze({
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'strict',
  jsxSingleQuote: true,
  printWidth: 100,
  proseWrap: 'never',
  quoteProps: 'consistent',
  semi: true,
  singleQuote: false,
  tabWidth: 2,
});

const _languageToParser = (lang: 'javascript' | 'css' | 'html' = 'javascript') => {
  const map: any = {
    javascript: 'babel',
    css: 'postcss',
    html: 'babel',
  }

  return map[lang];
}

export const prettyCode = (code: string, language: 'javascript' | 'css' | 'html' = 'javascript') => {
  const pretty = prettier.format(
    code,
    {
      ...DEFAULT_PRETTIER_CONFIG,
      parser: _languageToParser(language),
      plugins: [parserBabel, parserHtml, parserCss],
    },
  );

  return pretty;
}
