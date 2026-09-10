/**
 * External dependencies.
 */
import { useQuery } from "@tanstack/react-query";

/**
 * Internal dependencies.
 */
import { getCabins } from "@/services/apiCabins";

export function useCabins() {
	const {
		isLoading,
		data: cabins,
		error,
	} = useQuery({
		queryKey: ["cabins"],
		queryFn: getCabins,
	});

	return { isLoading, cabins, error };
}
