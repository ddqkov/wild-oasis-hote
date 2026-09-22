/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

import { useCheckout } from "@/features/check-in-out/useCheckout";
import Button from "@/ui/Button";

function CheckoutButton({ bookingId }) {
	const { checkout, isCheckingOut } = useCheckout();

	return (
		<Button
			variation="primary"
			size="small"
			onClick={() => checkout(bookingId)}
		>
			Check out
		</Button>
	);
}

export default CheckoutButton;
