/**
 * External dependencies.
 */
import { useEffect } from "react";

/**
 * Internal dependencies.
 */

function useCloseModal(ref, close, listenCapturing = true) {
	useEffect(() => {
		function handleClick(e) {
			if (ref.current && !ref.current.contains(e.target)) {
				close();
			}
		}

		document.addEventListener("click", handleClick, listenCapturing);

		return () =>
			document.removeEventListener("click", handleClick, listenCapturing);
	}, [close, ref, listenCapturing]);
}

export { useCloseModal };
