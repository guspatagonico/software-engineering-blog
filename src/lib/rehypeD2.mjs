/**
 * Rehype plugin for transforming D2 code blocks into D2DiagramRenderer components.
 * This runs during MDX compilation and replaces D2 code blocks with divs containing
 * the D2 code as a data attribute for client-side rendering.
 */

import { visit } from 'unist-util-visit';

export function rehypeD2() {
	return (tree, file) => {
		visit(tree, 'element', (node, index, parent) => {
			// Look for pre > code elements (Shiki output)
			if (node.tagName !== 'pre') return;

			const codeChild = node.children?.[0];
			if (!codeChild || codeChild.tagName !== 'code') return;

			// Extract language indicators from different possible locations
			const preDataLang = node.properties?.dataLanguage;
			const codeClassName = codeChild.properties?.className || [];
			const nodeDataMeta = node.data?.meta;
			const codeDataLang = codeChild.properties?.dataLanguage;

			// Extract text content to check for D2 patterns
			const code = extractTextFromAst(codeChild);

			// Check if this is a D2 code block by:
			// 1. Checking explicit language markers
			// 2. Checking if content looks like D2 (contains D2-specific patterns)
			const isD2 =
				preDataLang === 'd2' ||
				codeDataLang === 'd2' ||
				nodeDataMeta === 'd2' ||
				(Array.isArray(codeClassName) && codeClassName.some((cls) => cls === 'language-d2')) ||
				(code && isD2Content(code));

			if (!isD2 || !code.trim()) return;

			// Replace the pre/code with a div containing the D2 code as a data attribute
			// This allows the client-side transformer to find and render it
			parent.children[index] = {
				type: 'element',
				tagName: 'div',
				properties: {
					className: ['d2-diagram-container'],
					dataD2Code: code,
					dataD2Diagram: 'true',
				},
				children: [],
			};
		});
	};
}

/**
 * Check if content appears to be D2 syntax by looking for D2-specific patterns.
 * This handles the case where Shiki doesn't recognize 'd2' as a language.
 */
function isD2Content(code) {
	if (!code || typeof code !== 'string') return false;

	// D2 patterns that strongly indicate D2 syntax
	const d2Patterns = [
		/^\s*direction\s*:/m,
		/^\s*shape\s*:\s*sequence_diagram/m,
		/^\s*seq\s*:\s*\{[\s\S]*shape\s*:\s*sequence_diagram/m,
		/->/,
		/<-/,
		/\*-/,
		/-\*/,
	];

	// Check how many patterns match
	const matches = d2Patterns.filter((pattern) => pattern.test(code)).length;

	// If we have multiple D2 patterns, it's likely D2
	return matches >= 1;
}

/**
 * Extract text content from an AST node recursively
 */
function extractTextFromAst(node) {
	if (!node) return '';

	if (node.type === 'text') {
		return node.value;
	}

	if (node.type === 'element' && node.children && Array.isArray(node.children)) {
		return node.children.map(extractTextFromAst).join('');
	}

	return '';
}

export default rehypeD2;


