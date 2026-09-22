/**
 * External dependencies.
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import BookingDataBox from "@/features/bookings/BookingDataBox";
import Button from "@/ui/Button";
import ButtonGroup from "@/ui/ButtonGroup";
import ButtonText from "@/ui/ButtonText";
import Checkbox from "@/ui/Checkbox";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import Spinner from "@/ui/Spinner";

import { useBooking } from "@/features/bookings/useBooking";
import { useSettings } from "@/features/settings/useSettings";
import { useMoveBack } from "@/hooks/useMoveBack";
import { formatCurrency } from "@/utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
	margin-bottom: 1.5rem;
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);
	const { bookingId: currentBookingId } = useParams();
	const { booking, isLoading } = useBooking(currentBookingId);
	const { settingsData, isLoading: isLoadingSettings } = useSettings();

	useEffect(() => {
		setConfirmPaid(booking?.isPaid || false);
	}, [booking]);

	const moveBack = useMoveBack();
	const { checkin, isCheckingIn } = useCheckin();

	if (isLoading || isLoadingSettings) return <Spinner />;

	const {
		id: bookingId,
		guests,
		totalPrice,
		numGuests,
		hasBreakfast,
		numNights,
	} = booking;

	const breakfastPrice = settingsData?.breakfastPrice * numNights * numGuests;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			console.log({
				hasBreakfast: true,
				extrasPrice: breakfastPrice,
				totalPrice: totalPrice + breakfastPrice,
			});

			checkin({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: breakfastPrice,
					totalPrice: totalPrice + breakfastPrice,
				},
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	}

	return (
		<>
			<Row type="horizontal" space="space-between">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((add) => !add);
							setConfirmPaid(false);
						}}
						id="addbreakfast"
						disabled={addBreakfast || isCheckingIn}
					>
						I confirm that {guests.fullName} would like to have
						breakfast for ${breakfastPrice}
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={() => setConfirmPaid((confrim) => !confrim)}
					id="confirm"
					disabled={confirmPaid || isCheckingIn}
				>
					I confirm that {guests.fullName} has paid the total amount
					of{" "}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: `${formatCurrency(totalPrice + breakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(breakfastPrice)})`}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmPaid || isCheckingIn}
				>
					Check in booking #{bookingId}
				</Button>

				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
