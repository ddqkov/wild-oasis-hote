/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */
import { useSettings } from "@/features/settings/useSettings";
import { useUpdateSetting } from "@/features/settings/useUpdateSettings";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Spinner from "@/ui/Spinner";

function UpdateSettingsForm() {
	const {
		isLoading,
		settingsData: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useSettings();
	const { isUpdating, updateSetting } = useUpdateSetting();

	if (isLoading) return <Spinner />;

	function handleUpdate(e, field) {
		const { value } = e.target;

		if (!value) return;

		updateSetting({
			[field]: value,
		});
	}

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
				/>
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					onBlur={(e) => handleUpdate(e, "maxBookingLength")}
					defaultValue={maxBookingLength}
				/>
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
					defaultValue={maxGuestsPerBooking}
				/>
			</FormRow>

			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					onBlur={(e) => handleUpdate(e, "breakfastPrice")}
					defaultValue={breakfastPrice}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
