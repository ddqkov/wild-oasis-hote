/**
 * External dependencies.
 */
import { useState } from "react";

/**
 * Internal dependencies.
 */
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import Button from "@/ui/Button";
import Modal from "@/ui/Modal";

export default function AddCabin() {
	const [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpenModal((prev) => !prev)}>
				Add new cabin
			</Button>

			{isOpenModal && (
				<Modal onClose={() => setIsOpenModal(false)}>
					<CreateCabinForm
						onCloseModal={() => setIsOpenModal(false)}
					/>
				</Modal>
			)}
		</>
	);
}
