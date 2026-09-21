/**
 * External dependencies.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/**
 * Internal dependencies.
 */
import { updateBooking } from "@/services/apiBookings";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
		mutationFn: (bookigId) =>
			updateBooking(bookigId, {
				status: "checked-in",
				isPaid: true,
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);
			queryClient.invalidateQueries(["bookings"]);
			navigate("/");
		},
		onError: (data) => {
			toast.error(`There was an error while checking in`);
		},
	});

	return { checkin, isCheckingIn };
}
