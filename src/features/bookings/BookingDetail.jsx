/**
 * External dependencies.
 */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import CheckoutButton from "@/features/check-in-out/CheckoutButton";
import Button from "@/ui/Button";
import ButtonGroup from "@/ui/ButtonGroup";
import ButtonText from "@/ui/ButtonText";
import Empty from "@/ui/Empty";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import Spinner from "@/ui/Spinner";
import Tag from "@/ui/Tag";

import BookingDataBox from "@/features/bookings/BookingDataBox";
import { useBooking } from "@/features/bookings/useBooking";
import { useMoveBack } from "@/hooks/useMoveBack";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { booking, isLoading } = useBooking();
	const navigate = useNavigate();

	const moveBack = useMoveBack();

	if (isLoading) return <Spinner />;
	if (!booking) return <Empty resource="booking" />;

	const { status, id: bookingId } = booking;

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal" space="space-between">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>

					<Tag type={statusToTagName[status]}>
						{status.replace("-", " ")}
					</Tag>
				</HeadingGroup>

				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === "unconfirmed" && (
					<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
						Check in
					</Button>
				)}

				{status === "checked-in" && (
					<CheckoutButton bookingId={bookingId}>
						Check out booking #{bookingId}
					</CheckoutButton>
				)}

				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
