import { useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

interface WaveBackgroundProps {
	className?: string;
}

export const WaveBackground = ({ className }: WaveBackgroundProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationFrameRef = useRef<number>();

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let width: number,
			height: number,
			imageData: ImageData,
			data: Uint8ClampedArray;
		const SCALE = 2;

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			width = Math.floor(canvas.width / SCALE);
			height = Math.floor(canvas.height / SCALE);
			imageData = ctx.createImageData(width, height);
			data = imageData.data;
		};

		const handleResize = () => {
			resizeCanvas();
		};

		window.addEventListener("resize", handleResize);
		resizeCanvas();

		const startTime = Date.now();

		const SIN_TABLE = new Float32Array(1024);
		const COS_TABLE = new Float32Array(1024);
		for (let i = 0; i < 1024; i++) {
			const angle = (i / 1024) * Math.PI * 2;
			SIN_TABLE[i] = Math.sin(angle);
			COS_TABLE[i] = Math.cos(angle);
		}

		const fastSin = (x: number) => {
			const index =
				Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023;
			return SIN_TABLE[index];
		};

		const fastCos = (x: number) => {
			const index =
				Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * 1024) & 1023;
			return COS_TABLE[index];
		};

		const render = () => {
			const time = (Date.now() - startTime) * 0.001;

			for (let y = 0; y < height; y++) {
				for (let x = 0; x < width; x++) {
					const centerX = width / 2;
					const centerY = height / 2;

					const dx = x - centerX;
					const dy = y - centerY;

					const aspectRatio = width / height;
					const normalizedDx = aspectRatio > 1 ? dx / aspectRatio : dx;
					const normalizedDy = aspectRatio < 1 ? dy * aspectRatio : dy;
					const distance = Math.sqrt(
						normalizedDx * normalizedDx + normalizedDy * normalizedDy
					);

					// Create multiple concentric ripples with different frequencies and speeds
					const ripple1 = fastSin(distance * 0.15 - time * 3.0);
					const ripple2 = fastSin(distance * 0.1 - time * 2.2) * 0.8;
					const ripple3 = fastSin(distance * 0.06 - time * 1.5) * 0.6;
					const ripple4 = fastSin(distance * 0.04 - time * 1.0) * 0.4;
					const ripple5 = fastSin(distance * 0.02 - time * 0.7) * 0.3;

					// Add some subtle radial variations
					const angle = Math.atan2(normalizedDy, normalizedDx);
					const radialVariation = fastSin(angle * 4 + time * 0.5) * 0.2;

					// Combine all ripples for a pure ripple effect
					const wave =
						ripple1 + ripple2 + ripple3 + ripple4 + ripple5 + radialVariation;
					const intensity = 0.4 + 0.6 * wave;
					const baseVal = 0.12 + 0.18 * fastCos(distance * 0.01 + time * 0.3);
					const purpleAccent = 0.45 * fastSin(distance * 0.08 + time * 0.2);
					const redAccent = 0.35 * fastCos(distance * 0.07 + time * 0.15);
					const blueAccent = 0.4 * fastSin(distance * 0.06 + time * 0.12);

					const r =
						Math.max(
							0,
							Math.min(1, baseVal + purpleAccent * 0.8 + redAccent * 1.2)
						) * intensity;
					const g =
						Math.max(
							0,
							Math.min(1, baseVal + purpleAccent * 0.4 + blueAccent * 0.3)
						) * intensity;
					const b =
						Math.max(
							0,
							Math.min(1, baseVal + blueAccent * 1.4 + purpleAccent * 1.0)
						) * intensity;

					const index = (y * width + x) * 4;
					data[index] = r * 255;
					data[index + 1] = g * 255;
					data[index + 2] = b * 255;
					data[index + 3] = 255;
				}
			}

			ctx.putImageData(imageData, 0, 0);
			if (SCALE > 1) {
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(
					canvas,
					0,
					0,
					width,
					height,
					0,
					0,
					canvas.width,
					canvas.height
				);
			}

			animationFrameRef.current = requestAnimationFrame(render);
		};

		render();

		return () => {
			window.removeEventListener("resize", handleResize);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={cn("absolute inset-0 w-full h-full", className)}
		/>
	);
};
