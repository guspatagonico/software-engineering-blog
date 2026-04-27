import { D2DiagramRenderer } from './D2DiagramRenderer';
import { createRoot } from 'react-dom/client';

export const transformD2Diagrams = (): void => {
	const d2Containers = document.querySelectorAll('[data-d2-diagram="true"]');

	d2Containers.forEach((container, index) => {
		const htmlContainer = container as HTMLElement;

		if (htmlContainer.dataset.d2Processed === 'true') return;

		const code = htmlContainer.dataset.d2Code;
		if (!code || !code.trim()) return;

		htmlContainer.setAttribute('data-diagram-index', String(index));

		const wrapper = document.createElement('div');
		wrapper.className = 'd2-diagram-wrapper';

		htmlContainer.innerHTML = '';
		htmlContainer.appendChild(wrapper);

		const root = createRoot(wrapper);
		root.render(<D2DiagramRenderer code={code} />);

		htmlContainer.dataset.d2Processed = 'true';
	});
};
