/**
 * External dependencies.
 */

import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

/**
 * Internal dependencies.
 */
import { getBookingsAfterDate } from "@/services/apiBookings";

export default function useRecentStays() {
	const [searchParams] = useSearchParams();

	const numDays = !searchParams.get("last")
		? 7
		: Number(searchParams.get("last"));
	const queryDate = subDays(new Date(), numDays).toISOString();

	const { isLoading, data: stays } = useQuery({
		queryFn: () => getBookingsAfterDate(queryDate),
		queryKey: ["stays", `last-${numDays}`],
	});

	const confirmedStays = stays?.filter(
		(stay) => stay.status === "checked-in" || "checked-out",
	);

	return { isLoading, stays, confirmedStays, numDays };
}
