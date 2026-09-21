/**
 * External dependencies.
 */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

/**
 * Internal dependencies.
 */
import { getBooking } from "@/services/apiBookings";

export function useBooking() {
	const { bookingId } = useParams();
	const {
		isLoading,
		data: booking,
		error,
	} = useQuery({
		queryKey: ["bookings", bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false,
	});

	return { isLoading, booking, error };
}

useQuery;
