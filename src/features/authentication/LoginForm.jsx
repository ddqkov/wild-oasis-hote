/**
 * External dependencies.
 */
import { useState } from "react";

/**
 * Internal dependencies.
 */
import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRowVertical from "@/ui/FormRowVertical";
import Input from "@/ui/Input";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleSubmit() {}

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
				/>
			</FormRowVertical>
			<FormRowVertical label="Password">
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button size="large">Login</Button>
			</FormRowVertical>
		</Form>
	);
}

export default LoginForm;
