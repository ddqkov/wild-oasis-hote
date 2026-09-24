/**
 * External dependencies.
 */
import { useNavigate } from "react-router-dom";

/**
 * Internal dependencies.
 */

export function useMoveBack() {
	const navigate = useNavigate();
	return () => navigate(-1);
}
