/**
 * External dependencies.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/**
 * Internal dependencies.
 */
import { deleteBooking as deleteBookingApiFunction } from "@/services/apiBookings";

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: (bookingId) => deleteBookingApiFunction(bookingId),
		onSuccess: () => {
			(toast.success("Booking has been deleted"),
				queryClient.invalidateQueries({
					queryKey: ["bookings"],
				}));
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteBooking };
}
