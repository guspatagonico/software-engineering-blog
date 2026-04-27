import { D2 } from '@terrastruct/d2';

const d2 = new D2();
const code = 'a -> b';
const compiled = await d2.compile(code);

// Test simple dark theme
const options = {
  ...compiled.renderOptions,
  themeID: 1,
  darkThemeID: 1,
};

const svg = await d2.render(compiled.diagram, options);
const bgMatch = svg.match(/rect[^>]*fill="([^"]+)"/);
console.log('Dark theme test - bg color:', bgMatch ? bgMatch[1] : 'not found');
