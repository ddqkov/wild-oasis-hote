/**
 * External dependencies.
 */
import { useState } from "react";

/**
 * Internal dependencies.
 */
import { useLogin } from "@/features/authentication/useLogin";
import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRowVertical from "@/ui/FormRowVertical";
import Input from "@/ui/Input";
import SpinnerMini from "@/ui/SpinnerMini";

function LoginForm() {
	const [email, setEmail] = useState("dqkovdimitar1@gmail.com");
	const [password, setPassword] = useState("Mitko-970801");
	const { login, isLogingIn } = useLogin();

	function handleSubmit(e) {
		e.preventDefault();

		if (!email && !password) return;

		login(
			{ email, password },
			{
				onSettled: () => {
					setEmail("");
					setPassword("");
				},
			},
		);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label="Email address">
				<Input
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="username"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isLogingIn}
				/>
			</FormRowVertical>
			<FormRowVertical label="Password">
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					disabled={isLogingIn}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button size="large" disabled={isLogingIn}>
					{!isLogingIn ? "Login" : <SpinnerMini />}
				</Button>
			</FormRowVertical>
		</Form>
	);
}

export default LoginForm;
