import { useState, useEffect } from "react";

function getWindowDimensions() {
	const {
		innerWidth: width,
		innerHeight: height,
		devicePixelRatio: pixelRatio,
	} = window;
	const ratio = width / height;
	return {
		width,
		height,
		ratio,
		pixelRatio,
	};
}

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}
