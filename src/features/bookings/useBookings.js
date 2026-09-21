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

	const page = !searchParams.get("page")
		? 1
		: Number(searchParams.get("page"));

	const {
		isLoading,
		data: { data: bookings, count } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	return { isLoading, bookings, error, count };
}
