/**
 * External dependencies.
 */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import { useUser } from "@/features/authentication/useUser";
import Spinner from "@/ui/Spinner";

const FullPage = styled.div`
	position: fixed;
	inset: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function ProtectedRoute({ children }) {
	const { user, isLoading, isAuthenticated } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated && !isLoading) navigate("/login");
	}, [isAuthenticated, navigate, isLoading]);

	if (isLoading) {
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);
	}

	if (isAuthenticated) return children;
}
