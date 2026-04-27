import { D2 } from '@terrastruct/d2';

const d2 = new D2();
const code = 'a -> b';
const compiled = await d2.compile(code);

console.log('D2 Theme IDs:\n');
for (let i = 0; i <= 5; i++) {
  try {
    const options = { ...compiled.renderOptions, themeID: i };
    const svg = await d2.render(compiled.diagram, options);
    const bgMatch = svg.match(/rect[^>]*fill="([^"]+)"/);
    const bg = bgMatch ? bgMatch[1] : 'transparent';
    console.log(`ID ${i}: bg="${bg}"`);
  } catch(e) {
    console.log(`ID ${i}: ERROR`);
  }
}
