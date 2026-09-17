/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import Button from "@/ui/Button";
import Modal from "@/ui/Modal";

export default function AddCabin() {
	return (
		<div>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button>Add new cabin</Button>
				</Modal.Open>

				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}
