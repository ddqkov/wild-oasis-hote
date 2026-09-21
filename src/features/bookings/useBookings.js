/**
 * External dependencies.
 */
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

/**
 * Internal dependencies.
 */
import { getBookings } from "@/services/apiBookings";

export function useBookings() {
	const [searchParams] = useSearchParams();

	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };

	const sortByParam = searchParams.get("sortBy") || "startDate-desc";
	const [field, direction] = sortByParam.split("-");
	const sortBy = { field, direction };

	const {
		isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy],
		queryFn: () => getBookings({ filter, sortBy }),
	});

	return { isLoading, bookings, error };
}
