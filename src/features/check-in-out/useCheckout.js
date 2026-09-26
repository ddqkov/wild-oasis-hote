/**
 * External dependencies.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
/**
 * Internal dependencies.
 */
import { updateBooking } from "@/services/apiBookings";

export function useCheckout() {
	const queryClient = useQueryClient();
	const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
		mutationFn: (bookingId) =>
			updateBooking(bookingId, {
				status: "checked-out",
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked out`);
			queryClient.invalidateQueries(["bookings"]);
			queryClient.invalidateQueries(["today-activity"]);
		},
		onError: (data) => {
			toast.error(`There was an error while checking out`);
		},
	});

	return { checkout, isCheckingOut };
}
