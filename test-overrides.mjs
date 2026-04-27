import { D2 } from '@terrastruct/d2';

const d2 = new D2();
const code = 'a -> b';
const compiled = await d2.compile(code);

// Probar con darkThemeOverrides
const options = {
  ...compiled.renderOptions,
  themeID: 0,
  darkThemeOverrides: {
    primaryColor: '#00d4aa',
    neutralColor: '#c8d8f0',
  }
};

try {
  const svg = await d2.render(compiled.diagram, options);
  const hasTeal = svg.includes('00d4aa');
  console.log('darkThemeOverrides test:');
  console.log('- Has teal color (#00d4aa):', hasTeal);
  console.log('- SVG length:', svg.length);
} catch(e) {
  console.log('Error:', e.message.split('\n')[0]);
}
