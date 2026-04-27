import React, { useEffect, useState } from 'react';
import { D2DiagramRenderer } from './D2DiagramRenderer';
import { createRoot } from 'react-dom/client';

export const D2DiagramsTransformer: React.FC = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Only run on client after hydration
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

		// Find all D2 diagram containers created by the rehype plugin
		const d2Containers = document.querySelectorAll('[data-d2-diagram="true"]');

		d2Containers.forEach((container, index) => {
			const htmlContainer = container as HTMLElement;

			// Skip if already processed
			if (htmlContainer.dataset.d2Processed === 'true') return;

			const code = htmlContainer.dataset.d2Code;
			if (!code || !code.trim()) return;

			// Mark diagram position for per-diagram CSS
			htmlContainer.setAttribute('data-diagram-index', String(index));

			// Create a wrapper for the React component
			const wrapper = document.createElement('div');
			wrapper.className = 'd2-diagram-wrapper';

			// Clear the container and add the wrapper
			htmlContainer.innerHTML = '';
			htmlContainer.appendChild(wrapper);

			// Render the D2DiagramRenderer component
			const root = createRoot(wrapper);
			root.render(<D2DiagramRenderer code={code} />);

			// Mark as processed
			htmlContainer.dataset.d2Processed = 'true';
		});
	}, [mounted]);

	return null;
};

export default D2DiagramsTransformer;
