/**
 * External dependencies.
 */
import { useState } from "react";

/**
 * Internal dependencies.
 */
import CabinTable from "@/features/cabins/CabinTable";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import Button from "@/ui/Button";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

function Cabins() {
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
			</Row>

			<Row type="vertical">
				<CabinTable />

				<Button onClick={() => setShowForm((prev) => !prev)}>
					Add new cabin
				</Button>

				{showForm && <CreateCabinForm setShowForm={setShowForm} />}
			</Row>
		</>
	);
}

export default Cabins;
