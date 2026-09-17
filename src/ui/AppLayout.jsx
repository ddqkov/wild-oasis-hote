/**
 * External dependencies.
 */

import { Outlet } from "react-router-dom";

/**
 * Internal dependencies.
 */
import Header from "@/ui/Header";
import Sidebar from "@/ui/Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
	min-height: 100svh;
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	max-width: calc(100% - 26rem);
	width: 100%;
	padding-top: 4.9rem;
	margin-left: auto;
	min-height: 100svh;
	height: 100%;
`;

const Container = styled.main`
	max-width: 120rem;
	margin: 0 auto;
	padding-top: 4.9rem;
`;

export default function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />

			<Sidebar />

			<Main>
				<Container>
					<Outlet />
				</Container>
			</Main>
		</StyledAppLayout>
	);
}
