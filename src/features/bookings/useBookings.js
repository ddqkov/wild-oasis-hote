/**
 * External dependencies.
 */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

/**
 * Internal dependencies.
 */
import { getBookings } from "@/services/apiBookings";
import { PAGE_SIZE } from "@/utils/constants";
import { useEffect } from "react";

export function useBookings() {
	const queryClient = useQueryClient();
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

	useEffect(() => {
		const pageCount = Math.ceil(count / PAGE_SIZE);

		if (page < pageCount)
			queryClient.prefetchQuery({
				queryKey: ["bookings", filter, sortBy, page + 1],
				queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
			});

		if (page > 1)
			queryClient.prefetchQuery({
				queryKey: ["bookings", filter, sortBy, page - 1],
				queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
			});
	}, [filter, sortBy, page, queryClient, count]);

	return { isLoading, bookings, error, count };
}
