import { D2 } from '@terrastruct/d2';

const simpleD2Code = `
A -> B -> C
`;

const d2 = new D2();

async function testRender() {
	try {
		const compiled = await d2.compile(simpleD2Code);
		console.log('✓ Compiled successfully');
		console.log('Compiled keys:', Object.keys(compiled));
		
		// Test light theme (0)
		console.log('\n--- Light Theme (0) ---');
		const lightOptions = {
			...compiled.renderOptions,
			themeID: 0,
		};
		console.log('Light render options:', lightOptions);
		const lightRendered = await d2.render(compiled.diagram, lightOptions);
		console.log('Light render result type:', typeof lightRendered);
		console.log('Light render result instanceof Uint8Array:', lightRendered instanceof Uint8Array);
		console.log('Light render result keys:', lightRendered && typeof lightRendered === 'object' ? Object.keys(lightRendered) : 'N/A');
		console.log('Light render result (first 200 chars):', String(lightRendered).substring(0, 200));
		
		// Test dark theme (1)
		console.log('\n--- Dark Theme (1) ---');
		const darkOptions = {
			...compiled.renderOptions,
			themeID: 1,
		};
		const darkRendered = await d2.render(compiled.diagram, darkOptions);
		console.log('Dark render result type:', typeof darkRendered);
		console.log('Dark render result instanceof Uint8Array:', darkRendered instanceof Uint8Array);
		console.log('Dark render result keys:', darkRendered && typeof darkRendered === 'object' ? Object.keys(darkRendered) : 'N/A');
		console.log('Dark render result (first 200 chars):', String(darkRendered).substring(0, 200));
		
	} catch (error) {
		console.error('Error:', error);
	}
}

testRender();
