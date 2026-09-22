/**
 * External dependencies.
 */
import { format, isToday } from "date-fns";
import {
	HiArrowDownOnSquare,
	HiArrowUpOnSquare,
	HiEye,
	HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import { useDeleteBooking } from "@/features/bookings/useDeleteBooking";
import { useCheckout } from "@/features/check-in-out/useCheckout";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import Table from "@/ui/Table";
import Tag from "@/ui/Tag";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

function BookingRow({
	booking: {
		id: bookingId,
		created_at,
		startDate,
		endDate,
		numNights,
		numGuests,
		totalPrice,
		status,
		guests: { fullName: guestName, email },
		cabins: { name: cabinName },
	},
}) {
	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	const navigate = useNavigate();
	const { checkout } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	return (
		<Table.Row>
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(startDate))
						? "Today"
						: formatDistanceFromNow(startDate)}{" "}
					&rarr; {numNights} night stay
				</span>

				<span>
					{format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
					{format(new Date(endDate), "MMM dd yyyy")}
				</span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

			<Amount>{formatCurrency(totalPrice)}</Amount>

			<Modal>
				<Menus.Menu>
					<Menus.Toggle id={bookingId}></Menus.Toggle>

					<Menus.List id={bookingId}>
						<Modal.Open opens="delete-booking">
							<Menus.Button icon={<HiTrash />}>
								Delete
							</Menus.Button>
						</Modal.Open>

						<Menus.Button
							icon={<HiEye />}
							onClick={() => navigate(`/bookings/${bookingId}`)}
						>
							See Details
						</Menus.Button>

						{status === "unconfirmed" && (
							<Menus.Button
								icon={<HiArrowDownOnSquare />}
								onClick={() =>
									navigate(`/checkin/${bookingId}`)
								}
							>
								Check in
							</Menus.Button>
						)}

						{status === "checked-in" && (
							<Menus.Button
								icon={<HiArrowUpOnSquare />}
								onClick={() => checkout(bookingId)}
							>
								Check out
							</Menus.Button>
						)}
					</Menus.List>

					<Modal.Window name="delete-booking">
						<ConfirmDelete
							resourceName={bookingId}
							disabled={isDeleting}
							onConfirm={() => {
								console.log(bookingId);
								deleteBooking(bookingId);
							}}
						/>
					</Modal.Window>
				</Menus.Menu>
			</Modal>
		</Table.Row>
	);
}

export default BookingRow;
