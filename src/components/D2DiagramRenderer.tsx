import React, { useEffect, useRef, useState } from 'react';
import { D2 } from '@terrastruct/d2';
import '../styles/d2-diagram.css';

interface D2DiagramRendererProps {
	code: string;
}

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3.0;
const ZOOM_STEP = 0.1;

const LIGHT_THEME = 0;
const DARK_THEME = 1;

const getCurrentTheme = (): 'light' | 'dark' => {
	if (typeof document === 'undefined') return 'dark';
	const theme = document.documentElement.getAttribute('data-theme');
	return theme === 'light' ? 'light' : 'dark';
};

const getD2ThemeId = (theme: 'light' | 'dark'): number => {
	return theme === 'light' ? LIGHT_THEME : DARK_THEME;
};

export const D2DiagramRenderer: React.FC<D2DiagramRendererProps> = ({ code }) => {
	const [svg, setSvg] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [theme, setTheme] = useState<'light' | 'dark'>('dark');
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [panX, setPanX] = useState(0);
	const [panY, setPanY] = useState(0);
	const [initialScale, setInitialScale] = useState(1);
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
	const d2InstanceRef = useRef<InstanceType<typeof D2> | null>(null);

	// Detect theme changes
	useEffect(() => {
		setTheme(getCurrentTheme());

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === 'data-theme') {
					setIsThemeTransitioning(true);
					setTheme(getCurrentTheme());
					// Clear transition flag after animation completes
					setTimeout(() => setIsThemeTransitioning(false), 200);
				}
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});

		return () => observer.disconnect();
	}, []);

	// Initialize D2 and render diagram
	useEffect(() => {
		const renderDiagram = async () => {
			try {
				setLoading(true);
				setError(null);

				// Initialize D2 if not already done
				if (!d2InstanceRef.current) {
					d2InstanceRef.current = new D2();
				}

				const d2 = d2InstanceRef.current;

				// Compile D2 code
				const compiled = await d2.compile(code);

				// Get render options with current theme
				const renderOptions = {
					...compiled.renderOptions,
					themeID: getD2ThemeId(theme),
				};

				// Render to SVG with theme
				let rendered: unknown = await d2.render(compiled.diagram, renderOptions);

				// Check if render failed and returned compiled object instead of SVG
				// This can happen in certain edge cases with WASM initialization
				if (rendered && typeof rendered === 'object') {
					const obj = rendered as Record<string, any>;
					if ('diagram' in obj && 'graph' in obj && 'fs' in obj) {
						// Render returned the compiled object instead of SVG
						// Reset D2 instance and retry
						d2InstanceRef.current = null;
						const newD2 = new D2();
						d2InstanceRef.current = newD2;

						const recompiled = await newD2.compile(code);
						const newRenderOptions = {
							...recompiled.renderOptions,
							themeID: getD2ThemeId(theme),
						};
						rendered = await newD2.render(recompiled.diagram, newRenderOptions);
					}
				}

				// Ensure we have a string SVG (handle both string and Uint8Array responses)
				let svgString: string;

				if (typeof rendered === 'string') {
					// Direct string response
					svgString = rendered;
				} else if (rendered && typeof rendered === 'object') {
					// Object response - could be Blob, or have text/svg properties
					const obj = rendered as Record<string, any>;

					if (obj instanceof Blob) {
						// Blob type
						svgString = await obj.text();
					} else if (typeof obj.text === 'function') {
						// Has text() method like Response or similar
						svgString = await obj.text();
					} else if (obj.svg && typeof obj.svg === 'string') {
						// Has svg property
						svgString = obj.svg;
					} else if (ArrayBuffer.isView(obj)) {
						// Typed array
						svgString = new TextDecoder().decode(obj as BufferSource);
					} else {
						throw new Error('d2.render() returned unexpected object type: ' + obj.constructor.name);
					}
				} else if (ArrayBuffer.isView(rendered)) {
					// Typed array at top level
					svgString = new TextDecoder().decode(rendered as BufferSource);
				} else {
					throw new Error('Unexpected render output: ' + typeof rendered);
				}

				// Make the background rect transparent: remove fill-N7 class
				// (which would re-apply a fill via SVG internal stylesheet) and set fill
				svgString = svgString.replace(
					/<rect([^>]*?)fill="[^"]*"([^>]*?)>/,
					(_match, before, after) => {
						const clean = before.replace(/\s*class\s*=\s*"[^"]*"\s*/g, ' ');
						return `<rect${clean}fill="transparent"${after}>`;
					}
				);

				setSvg(svgString);
				setLoading(false);
				setPanX(0);
				setPanY(0);
				setScale(1);
				setInitialScale(1);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to render D2 diagram');
				setLoading(false);
			}
		};

		renderDiagram();
	}, [code, theme]);


	const handleZoomIn = () => {
		setScale((prev) => Math.min(prev + ZOOM_STEP, ZOOM_MAX));
	};

	const handleZoomOut = () => {
		setScale((prev) => Math.max(prev - ZOOM_STEP, ZOOM_MIN));
	};

	const handleReset = () => {
		setScale(initialScale);
		setPanX(0);
		setPanY(0);
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.button !== 0) return;
		setIsDragging(true);
		setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return;
		setPanX(e.clientX - dragStart.x);
		setPanY(e.clientY - dragStart.y);
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const transformStyle = {
		transform: `translate(${panX}px, ${panY}px) scale(${scale})`,
		transformOrigin: '0 0',
		transition: isDragging ? 'none' : 'transform 0.2s ease-out',
	};

	return (
		<div ref={containerRef} className={`d2-diagram d2-diagram--interactive d2-diagram--${theme} ${isThemeTransitioning ? 'd2-diagram--transitioning' : ''}`}>
			{loading && (
				<div className="d2-diagram__loading">
					<div className="d2-diagram__loading-spinner" />
					<span>Rendering diagram...</span>
				</div>
			)}

			{error && (
				<div className="d2-diagram__error">
					<strong>Failed to render diagram:</strong>
					<pre>{error}</pre>
				</div>
			)}

			{svg && !loading && (
				<>
					<div
						ref={viewportRef}
						className="d2-viewport"
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseUp}
						style={{
							cursor: isDragging ? 'grabbing' : 'grab',
						}}
					>
						<div ref={canvasRef} className="d2-canvas" style={transformStyle}>
							<div dangerouslySetInnerHTML={{ __html: svg }} />
						</div>
					</div>

					<div className="d2-controls">
						<button
							className="d2-control-btn"
							onClick={handleZoomOut}
							title="Zoom out (−)"
							aria-label="Zoom out"
						>
							−
						</button>
						<span className="d2-controls__scale">
							{(scale * 100).toFixed(0)}%
						</span>
						<button
							className="d2-control-btn"
							onClick={handleZoomIn}
							title="Zoom in (+)"
							aria-label="Zoom in"
						>
							+
						</button>
						<button
							className="d2-control-btn"
							onClick={handleReset}
							title="Reset view"
							aria-label="Reset view"
						>
							↺
						</button>
					</div>
				</>
			)}
		</div>
	);
};
