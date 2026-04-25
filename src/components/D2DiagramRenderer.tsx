import React, { useEffect, useRef, useState } from 'react';
import { D2 } from '@terrastruct/d2';
import '../styles/d2-diagram.css';

interface D2DiagramRendererProps {
	code: string;
}

interface ViewportMetrics {
	baseWidth: number;
	baseHeight: number;
	viewportWidth: number;
	viewportHeight: number;
}

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 3.0;
const ZOOM_STEP = 0.1;

const calculateFitToViewScale = (metrics: ViewportMetrics): number => {
	if (metrics.baseWidth <= 0 || metrics.baseHeight <= 0) {
		return 1;
	}

	const scaleX = metrics.viewportWidth / metrics.baseWidth;
	const scaleY = metrics.viewportHeight / metrics.baseHeight;
	const fitScale = Math.min(scaleX, scaleY);

	return Math.max(ZOOM_MIN, Math.min(fitScale, ZOOM_MAX));
};

export const D2DiagramRenderer: React.FC<D2DiagramRendererProps> = ({ code }) => {
	const [svg, setSvg] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLDivElement>(null);
	const viewportRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [panX, setPanX] = useState(0);
	const [panY, setPanY] = useState(0);
	const [initialScale, setInitialScale] = useState(1);
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const d2InstanceRef = useRef<InstanceType<typeof D2> | null>(null);

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

				// Render to SVG
				const renderedSvg = await d2.render(compiled.diagram, compiled.renderOptions);

				setSvg(renderedSvg);
				setLoading(false);

				// Calculate fit-to-view scale after SVG is rendered
				setTimeout(() => {
					calculateAndSetInitialScale();
				}, 0);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to render D2 diagram');
				setLoading(false);
			}
		};

		renderDiagram();
	}, [code]);

	const calculateAndSetInitialScale = () => {
		if (!canvasRef.current || !viewportRef.current) return;

		// Get SVG dimensions
		const svg = canvasRef.current.querySelector('svg');
		if (!svg) return;

		const viewBox = svg.getAttribute('viewBox');
		if (!viewBox) return;

		const [, , baseWidth, baseHeight] = viewBox.split(' ').map(Number);
		if (baseWidth <= 0 || baseHeight <= 0) return;

		// Get viewport dimensions
		const viewportRect = viewportRef.current.getBoundingClientRect();
		const viewportWidth = viewportRect.width - 16; // Subtract padding
		const viewportHeight = viewportRect.height - 16;

		const metrics: ViewportMetrics = {
			baseWidth,
			baseHeight,
			viewportWidth,
			viewportHeight,
		};

		const fitScale = calculateFitToViewScale(metrics);
		setInitialScale(fitScale);
		setScale(fitScale);
		setPanX(0);
		setPanY(0);
	};

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
		if (e.button !== 0) return; // Only left mouse button
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
		<div ref={containerRef} className="d2-diagram d2-diagram--interactive">
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
