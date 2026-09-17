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
import ConfirmDelete from "@/ui/ConfirmDelete";
import Menus from "@/ui/Menus";
import Modal from "@/ui/Modal";
import Table from "@/ui/Table";
import { formatCurrency } from "@/utils/helpers";

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
			<Table.Row row="row">
				<Img src={image} />

				<Cabin>{name}</Cabin>

				<div>Fits up to {maxCapacity} guests</div>

				<Price>{formatCurrency(regularPrice)}</Price>

				<Discount>{formatCurrency(discount)}</Discount>

				<div>
					<Modal>
						<Menus.Menu>
							<Menus.Toggle id={cabinID} />

							<Menus.List id={cabinID}>
								<Menus.Button
									icon={<HiMiniDocumentDuplicate />}
									onClick={handleDuplicateCabin}
								>
									Duplicate
								</Menus.Button>

								<Modal.Open opens="edit">
									<Menus.Button icon={<HiPencil />}>
										Edit
									</Menus.Button>
								</Modal.Open>

								<Modal.Open opens="delete">
									<Menus.Button icon={<HiTrash />}>
										Delete
									</Menus.Button>
								</Modal.Open>
							</Menus.List>

							<Modal.Window name="edit">
								<CreateCabinForm editedCabin={cabin} />
							</Modal.Window>

							<Modal.Window name="delete">
								<ConfirmDelete
									resourceName={cabin.name}
									disabled={isDeleting}
									onConfirm={() => deleteCabin(cabinID)}
								/>
							</Modal.Window>
						</Menus.Menu>
					</Modal>
				</div>
			</Table.Row>
		</>
	);
}
