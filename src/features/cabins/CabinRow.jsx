/**
 * External dependencies.
 */
import { useState } from "react";
import { HiMiniDocumentDuplicate, HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { useCreateCabin } from "@/features/cabins/useCreateCabin";
import { useDeleteCabin } from "@/features/cabins/useDeleteCabin";
import { formatCurrency } from "@/utils/helpers";

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
	const [showForm, setShowForm] = useState(false);
	const {
		id: cabinID,
		name,
		maxCapacity,
		regularPrice,
		discount,
		image,
		description,
	} = cabin;
	const { isDeleting, deleteCabin } = useDeleteCabin();
	const { isCreating, createCabin } = useCreateCabin();

	function handleDuplicateCabin() {
		createCabin({
			name: `Copy of ${name}`,
			maxCapacity,
			regularPrice,
			discount,
			image,
			description,
		});
	}

	return (
		<>
			<TableRow row="row">
				<Img src={image} />

				<Cabin>{name}</Cabin>

				<div>Fits up to {maxCapacity} guests</div>

				<Price>{formatCurrency(regularPrice)}</Price>

				<Discount>{formatCurrency(discount)}</Discount>

				<div>
					<button onClick={handleDuplicateCabin}>
						<HiMiniDocumentDuplicate />
					</button>

					<button
						onClick={() => setShowForm((show) => !show)}
						disabled={isDeleting}
					>
						<HiPencil />
					</button>

					<button
						onClick={() => deleteCabin(cabinID)}
						disabled={isDeleting}
					>
						<HiTrash />
					</button>
				</div>
			</TableRow>

			{showForm && (
				<CreateCabinForm
					editedCabin={cabin}
					setShowForm={setShowForm}
				/>
			)}
		</>
	);
}
