/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */
import { useSignup } from "@/features/authentication/useSignup";
import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import SpinnerMini from "@/ui/SpinnerMini";
import { useForm } from "react-hook-form";

function SignupForm() {
	const { signUp, isSigningUp } = useSignup();
	const { register, formState, getValues, handleSubmit, reset } = useForm();
	const { errors } = formState;

	function onSubmit({ fullName, email, password }) {
		signUp({ fullName, email, password });
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Full name" error={errors?.fullName?.message}>
				<Input
					type="text"
					id="fullName"
					{...register("fullName", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Provide a valid email address",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password?.message}
			>
				<Input
					type="password"
					id="password"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password needs a minimum of 8 characters",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Repeat password"
				error={errors?.passwordConfirm?.message}
			>
				<Input
					type="password"
					id="passwordConfirm"
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) =>
							value === getValues().password ||
							"Passwords need to match",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button variation="secondary" type="reset" onClick={reset}>
					Cancel
				</Button>
				<Button>
					{isSigningUp ? <SpinnerMini /> : "Create new user"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
